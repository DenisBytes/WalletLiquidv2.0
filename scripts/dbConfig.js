const { db } = require('@vercel/postgres');
const bcrypt = require('bcrypt');

const users = [
    {
        id: '410544b2-4001-4271-9855-fec4b6a6442b',
        username: 'Cool',
        email: 'user2@nextmail.com',
        password: '123456',
    },
    {
        id: '410544b2-4001-4271-9855-fec4b6a6442c',
        username: 'Cooler',
        email: 'user3@nextmail.com',
        password: '123456',
    }
];

async function createUserTable(client){
    try{
        await client.sql`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`;
        const createTable = await client.sql`
            CREATE TABLE IF NOT EXISTS users (
                id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
                username VARCHAR(255) NOT NULL,
                email TEXT NOT NULL UNIQUE,
                password TEXT NOT NULL,
                usdc NUMERIC DEFAULT 100000, -- Setting the default value for usdc to 10000
                futures_page_last_login TIMESTAMPTZ
            );
    `;

    console.log(`Created "users" table`);

    const insertedUsers = await Promise.all(
        users.map(async (user) => {
            const hashedPassword = await bcrypt.hash(user.password, 10);
            return client.sql`
                INSERT INTO users (id, username, email, password, usdc)
                VALUES (${user.id}, ${user.username}, ${user.email}, ${hashedPassword}, 10000)
                ON CONFLICT (id) DO NOTHING;
            `;
        }),
    );
    }catch (error) {
        console.error('Error Creating users table:', error);
        throw error;
    }
}


async function createFuturesOrderTable(client) {
    try {
        await client.sql`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`;

        const createTable = await client.sql`
            CREATE TABLE IF NOT EXISTS futures_orders (
                id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
                user_id UUID NOT NULL,
                symbol VARCHAR(10) NOT NULL CHECK (symbol IN ('BTC', 'ETH')),
                type VARCHAR(10) NOT NULL CHECK (type IN ('MARKET', 'LIMIT')),
                status VARCHAR(10) NOT NULL CHECK (status IN ('OPEN', 'CLOSED', 'PENDING')),
                side VARCHAR(10) NOT NULL CHECK (side IN ('LONG', 'SHORT')),
                price NUMERIC NOT NULL,
                leverage NUMERIC NOT NULL,
                liquidation_price NUMERIC NOT NULL,
                usdc_size NUMERIC NOT NULL,
                time TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
                pnl NUMERIC,
                take_profit NUMERIC,
                stop_loss NUMERIC,
                close_price NUMERIC, -- Added close_price column
                closed_time TIMESTAMP -- Added closed_time column   
            );
        `;

        console.log(`Created "futures_orders" table`);
    } catch (error) {
        console.error('Error Creating futures_orders table:', error);
        throw error;
    }
}

async function createFuturesChapter(client) {
    try {
        await client.sql`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`;

        const createTable = await client.sql`
            CREATE TABLE IF NOT EXISTS futures_chapter (
                id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
                user_id UUID NOT NULL,
                is_done BOOLEAN NOT NULL,
                is_quit_done BOOLEAN NOT NULL
            );
        `;

        console.log(`Created "futures_chapter" table`);
    } catch (error) {
        console.error('Error Creating futures_chapter table:', error);
        throw error;
    }

} 

async function main() {
    const client = await db.connect();

    await createUserTable(client);
    await createFuturesOrderTable(client);
    await createFuturesChapter(client);

    await client.end();
}

main().catch((err) => {
    console.error(
        'An error occurred while attempting to seed the database:',
        err,
    );
});