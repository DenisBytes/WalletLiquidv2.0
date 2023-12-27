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

    console.log(`Created ${insertedUsers.length} users`);
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

async function createOptionsLearning(client){
    try{
        await client.sql `CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`;
        const createTable = await client.sql`
            CREATE TABLE IF NOT EXISTS options_learning (
                id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
                user_id UUID NOT NULL,
                chapter1 BOOLEAN DEFAULT FALSE,
                chapter2 BOOLEAN DEFAULT FALSE,
                chapter3 BOOLEAN DEFAULT FALSE,
                chapter4 BOOLEAN DEFAULT FALSE,
                chapter5 BOOLEAN DEFAULT FALSE,
                chapter6 BOOLEAN DEFAULT FALSE,
                chapter7 BOOLEAN DEFAULT FALSE,
                chapter8 BOOLEAN DEFAULT FALSE,
                chapter9 BOOLEAN DEFAULT FALSE,
                chapter10 BOOLEAN DEFAULT FALSE,
                chapter11 BOOLEAN DEFAULT FALSE,
                chapter12 BOOLEAN DEFAULT FALSE,
                chapter13 BOOLEAN DEFAULT FALSE,
                chapter14 BOOLEAN DEFAULT FALSE,
                chapter15 BOOLEAN DEFAULT FALSE,
                chapter16 BOOLEAN DEFAULT FALSE,
                chapter17 BOOLEAN DEFAULT FALSE,
                chapter18 BOOLEAN DEFAULT FALSE,
                chapter19 BOOLEAN DEFAULT FALSE,
                chapter20 BOOLEAN DEFAULT FALSE
            );`

        console.log(`Created "options_learning" table`);
    }catch(error){
        console.error('Error Creating futures_orders table:', error);
        throw error;
    }
}

async function main() {
    const client = await db.connect();

    await createUserTable(client);
    await createFuturesOrderTable(client);
    await createOptionsLearning(client);

    await client.end();
}

main().catch((err) => {
    console.error(
        'An error occurred while attempting to seed the database:',
        err,
    );
});