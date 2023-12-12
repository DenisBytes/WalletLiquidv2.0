import { sql } from '@vercel/postgres';
import { User, FuturesOrder } from './definitions';
import { unstable_noStore as noStore } from 'next/cache';

export async function getUser(email: string | undefined | null): Promise<User | undefined> {
    noStore();
    try {
        const user = await sql<User>`SELECT * FROM users WHERE email=${email}`;
        return user.rows[0];
    } catch (error) {
        console.error('Failed to fetch user:', error);
        throw new Error('Failed to fetch user.');
    }
}   

export async function getFuturesOrders(user_id: string | undefined): Promise<FuturesOrder[] | undefined> {
    noStore();
    try {
        const futuresOrders = await sql<FuturesOrder[]>`SELECT * FROM futures_orders WHERE user_id=${user_id}`;
        return futuresOrders.rows[0];
    } catch (error) {
        console.error('Failed to fetch futures orders:', error);
        throw new Error('Failed to fetch futures orders.');
    }
}
