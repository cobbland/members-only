// imports
const db = require('../db/queries');
const bcrypt = require('bcryptjs');
const { body, validationResult } = require('express-validator');

const session = require('express-session');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;

// validators for form data, including matching passwords


// functions
function getLogIn(req, res) {
    res.render('log-in', {
        title: 'Log In',
        message: 'Log in here.'
    });
}

//exports
module.exports = {
    getLogIn,
}