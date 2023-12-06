"use server";
import { sql } from '@vercel/postgres';
import { User } from './definitions';
import { unstable_noStore as noStore } from 'next/cache';
import { auth } from '@/auth';

export async function getUser(email: string): Promise<User | undefined> {
    try {
        const user = await sql<User>`SELECT * FROM users WHERE email=${email}`;
        return user.rows[0];
    } catch (error) {
        console.error('Failed to fetch user:', error);
        throw new Error('Failed to fetch user.');
    }
}   

export async function getSession(){
    try {
        const session = await auth();
        return session;
    } catch (error) {
        console.error('Failed to fetch session:', error);
        throw new Error('Failed to fetch session.');
    }
}