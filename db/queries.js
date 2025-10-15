const pool = require('./pool');

async function insertUser(username, password, name) {
    try {
        await pool.query(`
        INSERT INTO users
        (username, password, name)
        VALUES ($1, $2, $3);
    `, [username, password, name]);
    } catch(err) {
        throw new Error(err);
    }
}

async function selectUser(username) {
    try {
        const { rows } = await pool.query(`
            SELECT * FROM users
            WHERE username = $1;
        `, [ username ]);
        return rows[0];
    } catch(err) {
        throw new Error(err);
    }
}

async function selectUserByID(id) {
    try {
        const { rows } = await pool.query(`
            SELECT * FROM users
            WHERE id = $1;
        `, [ id ]);
        return rows[0];
    } catch(err) {
        throw new Error(err);
    }
}

async function joinClub(username) {
    try {
        await pool.query(`
            UPDATE users
            SET membership = true
            WHERE username = $1
        `, [ username ]);
    } catch(err) {
        throw new Error(err);
    }
}

async function makeAdmin(username) {
    try {
        await pool.query(`
            UPDATE users
            SET admin = true
            WHERE username = $1
        `, [ username ]);
    } catch(err) {
        throw new Error(err);
    }
}

async function selectAllMessages() {
    try {
        const { rows } = await pool.query(`
            SELECT * FROM messages;    
        `)
        return rows;
    } catch(err) {
        throw new Error(err);
    }
}

module.exports = {
    insertUser, selectUser, selectUserByID,
    joinClub, makeAdmin,
    selectAllMessages,
}