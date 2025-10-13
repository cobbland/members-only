const pool = require('./pool');

async function insertUser(username, password, givenName, familyName) {
    try {
        await pool.query(`
        INSERT INTO users
        (username, password, given_name, family_name)
        VALUES ($1, $2, $3, $4);
    `, [username, password, givenName, familyName]);
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

module.exports = {
    insertUser, selectUser,
    joinClub, makeAdmin,
}