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
    usd_size: z.coerce.number(),
    leverage: z.coerce.number(),
    take_profit: z.coerce.number(),
    stop_loss: z.coerce.number(),
})

const CreateFuturesOrder = FuturesOrderSchema.omit({id: true});

export async function createFuturesOrder(formData: FormData) {
    try{
        const {user_id, symbol, side, type, price, usd_size, leverage, take_profit, stop_loss} = CreateFuturesOrder.parse({
            user_id: formData.get('user-id'),
            symbol: formData.get('symbol'),
            side: formData.get('side'),
            type: formData.get('type'),
            price: formData.get('price'),
            usd_size: formData.get('usdc-size'),
            leverage:formData.get('leverage'),
            take_profit: formData.get('take_profit'),
            stop_loss: formData.get('stop_loss')
        });
        if(price < 1 || usd_size < 10 || leverage < 1) {
            throw new Error('Invalid input');
        }
    
        const priceInCents = price * 100;
        const usd_sizeInCents = usd_size * 100;
        const take_profitInCents =  take_profit !== 0 ? take_profit * 100 : null;
        const stop_lossInCents =  stop_loss !== 0 ? stop_loss * 100 : null;
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
        if(side==='LONG' && take_profit !==0 && take_profit < price){
            throw new Error('Invalid Take Profit');
        }else if(side==='LONG' && stop_loss !==0 && stop_loss > price){
            throw new Error('Invalid Stop Loss');
        }else if(side==='SHORT' && take_profit !==0 && take_profit > price){
            throw new Error('Invalid Take Profit');
        }else if(side==='SHORT' && stop_loss !==0 && stop_loss < price){
            throw new Error('Invalid Stop Loss');
        }
    
        if (type==='MARKET') {
            status='OPEN';
        } else if (type==='LIMIT') {
            status='PENDING';
        }
    
        await sql`
            INSERT INTO futures_orders (user_id, symbol, type, status, side, price, leverage, liquidation_price, usdc_size, take_profit, stop_loss, time)
            VALUES (${user_id}, ${symbol}, ${type}, ${status}, ${side}, ${priceInCents}, ${leverage}, ${liquidation_priceInCents}, ${usd_sizeInCents}, ${take_profitInCents}, ${stop_lossInCents}, ${time})
            `;
    
        await sql` UPDATE users SET usdc = usdc - ${usd_size} WHERE id = ${user_id}`;

        revalidatePath(`/home/trade/futures/${symbol}`);
    }
    catch(error){
        console.log("Error creating futures order", error);
    }

}


export async function updateLastLogin(user_id: string | undefined) {
    try{
        await sql`UPDATE users SET futures_page_last_login = CURRENT_TIMESTAMP WHERE id = ${user_id}`;
        console.log("Updated futures_page_last_login");
    }catch(error){
        console.log("Error updating futures_page_last_login", error);
    }
    revalidatePath(`/home/trade/futures/BTC}`);
}

export async function getOrCreateFuturesLearning(user_id: string | undefined) {
    try{
        const query =  sql`INSERT INTO futures_learning (user_id) VALUES (${user_id}) ON CONFLICT (user_id) DO NOTHING RETURNING *`;
        const result = await query;
        if (result.rows.length===0) {
            const existingQuery = sql`SELECT * FROM futures_learning WHERE user_id = ${user_id}`;
            const existingResult = await existingQuery;
            return existingResult.rows[0];
        }else{
            return result.rows[0];
        }
    }catch(error){
        console.error('Failed to get or create futures learning:', error);
        throw new Error('Failed to get or create futures learning.');
    }
}

export async function getOrCreateOptionsLearning(user_id: string | undefined) {
    try{
        const existingQuery = sql`SELECT * FROM options_learning WHERE user_id = ${user_id}`;
        const existingResult = await existingQuery;

        if (existingResult.rows.length > 0) {
            return existingResult.rows[0];
        } else {
            const query = sql`INSERT INTO options_learning (user_id) VALUES (${user_id}) RETURNING *`;
            const result = await query;
            return result.rows[0];
        }
    }catch(error){
        console.error('Failed to get or create options learning:', error);
        throw new Error('Failed to get or create options learning.');
    }
}

const optionsLearningSchema = z.object({
    user_id: z.string(),
    chapter: z.coerce.number()  
});
export async function updateOptionLearning(prevState: any, formData: FormData) {
    //Not in the try block because of NEXT REDIRECT issue :( 
    const {user_id, chapter} = optionsLearningSchema.parse({
        user_id: formData.get('user_id'),
        chapter: formData.get('chapter'),
    });
    try{
        //Why not do one time `SET chapter${chapter} = TRUE` and do all this switch cases?
        //Because when putting ${chapter} in sql,
        //it will be "translated" in (for exmaple) $1 or $2 or "1"
        //the outcome will be chapter$1 / chapter"2"
        switch(chapter){
            case 1:
                await sql`UPDATE options_learning SET chapter1 = TRUE WHERE user_id = ${user_id}`;
                break;
            case 2:
                await sql`UPDATE options_learning SET chapter2 = TRUE WHERE user_id = ${user_id}`;
                break;
            case 3:
                await sql`UPDATE options_learning SET chapter3 = TRUE WHERE user_id = ${user_id}`;
                break;
            case 4:
                await sql`UPDATE options_learning SET chapter4 = TRUE WHERE user_id = ${user_id}`;
                break;
            case 5:
                await sql`UPDATE options_learning SET chapter5 = TRUE WHERE user_id = ${user_id}`;
                break;
            case 6:
                await sql`UPDATE options_learning SET chapter6 = TRUE WHERE user_id = ${user_id}`;
                break;
            case 7:
                await sql`UPDATE options_learning SET chapter7 = TRUE WHERE user_id = ${user_id}`;
                break;
            case 8:
                await sql`UPDATE options_learning SET chapter8 = TRUE WHERE user_id = ${user_id}`;
                break;
            case 9:
                await sql`UPDATE options_learning SET chapter9 = TRUE WHERE user_id = ${user_id}`;
                break;
            case 10:
                await sql`UPDATE options_learning SET chapter10 = TRUE WHERE user_id = ${user_id}`;
                break;
            case 11:
                await sql`UPDATE options_learning SET chapter11 = TRUE WHERE user_id = ${user_id}`;
                break;
            case 12:
                await sql`UPDATE options_learning SET chapter12 = TRUE WHERE user_id = ${user_id}`;
                break;
            case 13:
                await sql`UPDATE options_learning SET chapter13 = TRUE WHERE user_id = ${user_id}`;
                break;
            case 14:
                await sql`UPDATE options_learning SET chapter14 = TRUE WHERE user_id = ${user_id}`;
                break;
            case 15:
                await sql`UPDATE options_learning SET chapter15 = TRUE WHERE user_id = ${user_id}`;
                break;
            case 16:
                await sql`UPDATE options_learning SET chapter16 = TRUE WHERE user_id = ${user_id}`;
                break;
            case 17:
                await sql`UPDATE options_learning SET chapter17 = TRUE WHERE user_id = ${user_id}`;
                break;
            case 18:
                await sql`UPDATE options_learning SET chapter18 = TRUE WHERE user_id = ${user_id}`;
                break;
            case 19:
                await sql`UPDATE options_learning SET chapter19 = TRUE WHERE user_id = ${user_id}`;
                break;
            case 20:
                await sql`UPDATE options_learning SET chapter20 = TRUE WHERE user_id = ${user_id}`;
                break;
            default:
                break;
        }
        revalidatePath("/home/learn");
    }catch(error){
        console.error('Failed to update options learning:', error);
        throw new Error('Failed to update options learning.');
    }
    if (chapter !== 20){
        redirect(`/home/learn/options/chapter${chapter+1}`);
    }
    else {
        redirect(`/home/learn`);
    }
}