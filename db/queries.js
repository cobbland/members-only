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

module.exports = {
    insertUser,
}