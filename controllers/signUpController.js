// imports
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

const validateClubPassword = body('clubPassword').custom(value => {
    if (value === 'gravy') {
        return true;
    } else {
        throw new Error('That is not the club password')
    }
});

const validateAdminPassword = body('adminPassword').custom(value => {
    if (value === '753694') {
        return true;
    } else {
        throw new Error('That is not the admin password')
    }
})

// functions
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
        res.redirect('/join-club');
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

function getJoinClub(req, res) {
    res.render('join-club', {
        title: 'Join the Club',
        message: 'Enter club password to join the club and become a member.'
    });
}

async function postJoinClub(req, res) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).render('join-club', {
            title: 'Join the Club',
            message: errors.array()[0].msg,
        });
    }
    try {
        // TKTK hardcoded user until login is implemented 
        await db.joinClub('cobbland');
        res.redirect('/');
    } catch(err) {
        return res.status(400).render('join-club', {
            title: 'Join the Club',
            message: err,
        });
    }
}

function getMakeAdmin(req, res) {
    res.render('make-admin', {
        title: 'Become an Admin',
        message: 'Enter admin password to become an admin.'
    });
}

async function postMakeAdmin(req, res) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).render('make-admin', {
            title: 'Become an Admin',
            message: errors.array()[0].msg,
        });
    }
    try {
        // TKTK hardcoded user until login is implemented 
        await db.makeAdmin('cobbland');
        res.redirect('/');
    } catch(err) {
        return res.status(400).render('make-admin', {
            title: 'Become an Admin',
            message: err,
        });
    }
}

//exports
module.exports = {
    validateUser, validateClubPassword,
    validateAdminPassword,
    getSignUp, postSignUp,
    getJoinClub, postJoinClub,
    getMakeAdmin, postMakeAdmin,
}