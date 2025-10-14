// imports
const db = require('../db/queries');
const bcrypt = require('bcryptjs');
const { body, validationResult } = require('express-validator');

const passport = require('passport');

// validators for form data, including matching passwords


// functions
function getLogIn(req, res) {
    res.render('log-in', {
        title: 'Log In',
        message: 'Log in here.'
    });
}

const postLogIn = passport.authenticate('local', {
    successRedirect: '/',
    failureRedirect: '/log-in',
})

//exports
module.exports = {
    getLogIn, postLogIn,
}