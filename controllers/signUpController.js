const db = require('../db/queries');
const bcrypt = require('bcryptjs');
const { body, validationResult } = require('express-validator');

// validators for form data, including matching passwords
const validateUser = [
    body('username').trim().notEmpty().custom(async value => {
        const user = await db.selectUser(value);
        if (user) {
            throw new Error('Username already in use');
        } else {
            return true;
        }
    }),
    body('passwordAgain').custom((value, { req }) => {
        if (value === req.body.password) {
            return true;
        } else {
            throw new Error('Passwords must match');
        }
    }),
    body('givenName').trim(),
    body('familyName').trim(),
];

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
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).render('sign-up', {
            title: 'Sign Up',
            message: 'Problem(s):',
            errors: errors.array(),
            username: username,
            givenName: givenName,
            familyName: familyName,
        });
    }
    try {
        const hashedPassword = await bcrypt.hash(password, 10);
        await db.insertUser(username, hashedPassword, givenName, familyName);
        res.redirect('/');
    } catch(err) {
        res.render('sign-up', {
            title: 'Sign Up',
            message: err,
            username: username,
            givenName: givenName,
            familyName: familyName,
        });
    }
}

module.exports = {
    validateUser, getSignUp, postSignUp,
}