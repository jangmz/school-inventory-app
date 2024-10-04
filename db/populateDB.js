#! /usr/bin/env node

import pkg from "pg";
import dotenv from "dotenv";

const {Client} = pkg;
dotenv.config();

const sqlTables = `
    CREATE TABLE IF NOT EXISTS users (
        id SERIAL PRIMARY KEY NOT NULL,
        first_name VARCHAR(255) NOT NULL,
        last_name VARCHAR(255) NOT NULL,
        email VARCHAR(255) UNIQUE NOT NULL
    );

    CREATE TABLE IF NOT EXISTS laptops (
        id SERIAL PRIMARY KEY NOT NULL,
        model VARCHAR(255),
        status VARCHAR(255) NOT NULL,
        user_id INTEGER REFERENCES users(id) ON DELETE cascade,
        doc_signed BOOLEAN NOT NULL,
        cpu VARCHAR(255),
        ram INTEGER,
        storage INTEGER,
        notes TEXT
    );

    CREATE TABLE IF NOT EXISTS tablets (
        id SERIAL PRIMARY KEY NOT NULL,
        model VARCHAR(255),
        status VARCHAR(255) NOT NULL,
        user_id INTEGER REFERENCES users(id) ON DELETE cascade,
        notes TEXT,
        doc_signed BOOLEAN NOT NULL DEFAULT FALSE
    );
`;

async function main() {
    try {
        console.log("Creating...");

        const client = new Client({
            connectionString: `postgresql://${process.env.DB_USER}:${process.env.DB_PASSWORD}@${process.env.DB_HOST}:${process.env.DB_PORT}/${process.env.DB_NAME}`
        });

        await client.connect();
        await client.query(sqlTables);
        await client.end();

        console.log("Finished.");
    } catch (error) {
        console.log(error);   
    }
}

main();