import { sql } from '@vercel/postgres';
import { User } from './definitions';
import { unstable_noStore as noStore } from 'next/cache';

export async function getUser(email: string): Promise<User | undefined> {
    noStore();
    try {
        const user = await sql<User>`SELECT * FROM users WHERE email=${email}`;
        return user.rows[0];
    } catch (error) {
        console.error('Failed to fetch user:', error);
        throw new Error('Failed to fetch user.');
    }
}   
