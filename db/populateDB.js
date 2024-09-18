#! /usr/bin/env node

import pkg from "pg";
const {Client} = pkg;

const sqlTables = `
    CREATE TABLE IF NOT EXISTS users (
        id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY NOT NULL,
        first_name VARCHAR(255) NOT NULL,
        last_name VARCHAR(255) NOT NULL,
        email VARCHAR(255) NOT NULL
    )

    CREATE TABLE IF NOT EXISTS laptops (
        id INTEGER PRIMARY KEY NOT NULL,
        model VARCHAR(255),
        status VARCHAR(255) NOT NULL,
        user_id INTEGER REFERENCES users(id) ON DELETE cascade 
        doc_signed BOOL NOT NULL,
        cpu VARCHAR(255),
        ram INTEGER,
        storage INTEGER,
        notes VARCHAR(255)
    )

    CREATE TABLE IF NOT EXISTS tablets (
        id INTEGER PRIMARY KEY NOT NULL,
        model VARCHAR(255),
        status VARCHAR(255) NOT NULL,
        user_id INTEGER REFERENCES users(id) ON DELETE cascade
        notes VARCHAR(255),
        doc_signed BOOL NOT NULL
    )
`;