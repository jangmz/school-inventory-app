#! /usr/bin/env node
import pkg from "pg";
import dotenv from "dotenv";

const {Client} = pkg;
dotenv.config();

const sqlValues = `
    INSERT INTO users (first_name, last_name, email) VALUES 
        ('John', 'Doe', 'johndoe@test.com'),
        ('Jane', 'Doe', 'janedoe@test.com');

    INSERT INTO laptops VALUES
        (1234, 'Lenovo L580', 'Not available', 1, true, 'i5-8250U', 18, 256, 'perfect condition');
    
        INSERT INTO tablets (id, model, status, notes, doc_signed) VALUES
        (1223, 'Lenovo P10', 'Available', 'Does not charge', false);
`;

async function main() {
    console.log("Inserting data...");

    try {
        const client = new Client({
            connectionString: `postgresql://${process.env.DB_USER}:${process.env.DB_PASSWORD}@localhost:${process.env.DB_PORT}/${process.env.DB_NAME}`
        });
    
        await client.connect();
        await client.query(sqlValues);
        await client.end();
    
        console.log("Data inserted successfully.");
    } catch (error) {
        console.log(error);
    }
    
}

main();