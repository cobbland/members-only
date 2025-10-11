const db = require('../db/queries');
const bcrypt = require('bcryptjs');

// validators for form data, including matching passwords

function getSignUp(req, res) {
    res.render('sign-up', {
        title: 'Sign Up',
        message: 'Signing up is the first step in becoming a member.'
    });
}

async function postSignUp(req, res) {
    const {
        username, password, 
        givenName, familyName,
    } = req.body;
    try {
        const hashedPassword = await bcrypt.hash(password, 10);
        await db.insertUser(username, hashedPassword, givenName, familyName);
        res.redirect('/');
    } catch(err) {
        res.render('sign-up', {
            title: 'Sign Up',
            message: err,
        });
    }
}

module.exports = {
    getSignUp, postSignUp,
}