#! /usr/bin/env node

import pkg from "pg";
import dotenv from "dotenv";

const {Client} = pkg;
dotenv.config();

const sqlTables = `
    CREATE TABLE IF NOT EXISTS users (
        id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY NOT NULL,
        first_name VARCHAR(255) NOT NULL,
        last_name VARCHAR(255) NOT NULL,
        email VARCHAR(255) NOT NULL
    );

    CREATE TABLE IF NOT EXISTS laptops (
        id INTEGER PRIMARY KEY NOT NULL,
        model VARCHAR(255),
        status VARCHAR(255) NOT NULL,
        user_id INTEGER REFERENCES users(id) ON DELETE cascade,
        doc_signed BOOLEAN NOT NULL,
        cpu VARCHAR(255),
        ram INTEGER,
        storage INTEGER,
        notes VARCHAR(255)
    );

    CREATE TABLE IF NOT EXISTS tablets (
        id INTEGER PRIMARY KEY NOT NULL,
        model VARCHAR(255),
        status VARCHAR(255) NOT NULL,
        user_id INTEGER REFERENCES users(id) ON DELETE cascade,
        notes VARCHAR(255),
        doc_signed BOOLEAN NOT NULL
    );
`;

async function main() {
    console.log("Creating...");

    const client = new Client({
        connectionString: `postgresql://${process.env.DB_USER}:${process.env.DB_PASSWORD}@localhost:${process.env.DB_PORT}/${process.env.DB_NAME}`
    });

    await client.connect();
    await client.query(sqlTables);
    await client.end();

    console.log("Finished.");
}

main();