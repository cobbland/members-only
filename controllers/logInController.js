// imports
const db = require('../db/queries');
const bcrypt = require('bcryptjs');
const { body, validationResult } = require('express-validator');

const passport = require('passport');

// validators for form data, including matching passwords


// functions
function getLogIn(req, res) {
    let message = 'Log in here.'
    if (req.session.messages) {
        message = req.session.messages;
    }
    res.render('log-in', {
        title: 'Log In',
        message: message,
    });
}

const postLogIn = passport.authenticate('local', {
    successRedirect: '/',
    failureRedirect: '/log-in',
    failureMessage: true,
})

//exports
module.exports = {
    getLogIn, postLogIn,
}