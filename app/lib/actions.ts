"use server";
import { signIn } from '@/auth';
import { sql } from '@vercel/postgres';
import { AuthError } from 'next-auth';
import {z} from "zod";
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';

export async function authenticate(
    prevState: string | undefined,
    formData: FormData,
) {
    try {
        await signIn('credentials', formData);
    } catch (error) {
        if (error instanceof AuthError) {
            switch (error.type) {
                case 'CredentialsSignin':
                    return 'Invalid credentials.';
                default:
                    return 'Something went wrong.';
            }
        }
        throw error;
    }
}

const FuturesOrderSchema = z.object({
    id: z.string(),
    user_id: z.string(),
    symbol: z.string(),
    side: z.enum(['LONG', 'SHORT']),
    type: z.enum(['MARKET', 'LIMIT']),
    price: z.coerce.number(),
    usdcSize: z.coerce.number(),
    leverage: z.coerce.number(),
    takeProfit: z.coerce.number(),
    stopLoss: z.coerce.number(),
})

const CreateFuturesOrder = FuturesOrderSchema.omit({id: true});

export async function createFuturesOrder(formData: FormData) {
    
    const {user_id, symbol, side, type, price, usdcSize, leverage, takeProfit, stopLoss} = CreateFuturesOrder.parse({
        user_id: formData.get('user-id'),
        symbol: formData.get('symbol'),
        side: formData.get('side'),
        type: formData.get('type'),
        price: formData.get('price'),
        usdcSize: formData.get('usdcSize'),
        leverage:formData.get('leverage'),
        takeProfit: formData.get('takeProfit'),
        stopLoss: formData.get('stopLoss')
    });


    const priceInCents = price * 100;
    const usdcSizeInCents = usdcSize * 100;
    const takeProfitInCents =  takeProfit !== 0 ? takeProfit * 100 : null;
    const stopLossInCents =  stopLoss !== 0 ? stopLoss * 100 : null;
    const time = new Date().toISOString().split('T')[0];
    const maintainMargin = 0.906;
    let liquidation_price:number=0;
    let status:string="";
    if (side==='LONG') {
        liquidation_price = price * (1 - maintainMargin / leverage);
    } else  if (side==='SHORT') {
        liquidation_price = price * (1 + maintainMargin / leverage) ;
    }
    const liquidation_priceInCents = liquidation_price * 100;

    if (type==='MARKET') {
        status='OPEN';
    } else if (type==='LIMIT') {
        status='PENDING';
    }

    await sql`
        INSERT INTO futures_orders (user_id, symbol, type, status, side, price, leverage, liquidation_price, usdc_size, take_profit, stop_loss, time)
        VALUES (${user_id}, ${symbol}, ${type}, ${status}, ${side}, ${priceInCents}, ${leverage}, ${liquidation_priceInCents}, ${usdcSizeInCents}, ${takeProfitInCents}, ${stopLossInCents}, ${time})
        `;

        revalidatePath(`/home/trade/futures/${symbol}`);
        redirect(`/home/trade/futures/${symbol}`);
}


