#! /usr/bin/env node

require('dotenv').config()

const { Client } = require('pg');

const SQL =`
DROP TABLE users;

DROP TABLE messages;

CREATE TABLE IF NOT EXISTS users (
  id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  username VARCHAR ( 255 ) UNIQUE NOT NULL,
  password VARCHAR ( 255 ) NOT NULL,
  name VARCHAR ( 255 ),
  membership BOOLEAN DEFAULT false,
  admin BOOLEAN DEFAULT false
);

CREATE TABLE IF NOT EXISTS messages (
  id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  title VARCHAR ( 255 ),
  text VARCHAR ( 255 ) NOT NULL,
  timestamp TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  user_id INTEGER
);
`;

async function main() {
    console.log('creating...');
    const client = new Client({
        connectionString: `postgresql://${process.env.user}:${process.env.password}@${process.env.host}:${process.env.port}/${process.env.database}`,
    });
    await client.connect();
    await client.query(SQL);
    await client.end();
    console.log("done");
}

main();