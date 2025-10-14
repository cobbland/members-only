// imports
const express = require('express');
const path = require('node:path');
const session = require('express-session');
const passport = require('passport');

require('./config/passport')(passport);

// initializations and such
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");
app.use(session({
    secret: "cat's cradle",
    resave: false,
    saveUninitialized: false,
}));
app.use(passport.initialize());
app.use(passport.session());

// some middleware
app.use((req, res, next) => {
    res.locals.currentUser = req.user;
    next();
});

// routes and route variables
const routesPath = path.join(__dirname, 'routes');
const indexRouter = require(path.join(routesPath, 'indexRouter'));
const signUpRouter = require(path.join(routesPath, 'signUpRouter'));
const logInRouter = require(path.join(routesPath, 'logInRouter'));
const messagesRouter = require(path.join(routesPath, 'messagesRouter'));

app.use('/', indexRouter);
app.use('/sign-up', signUpRouter);
app.use('/log-in', logInRouter);
app.use('/messages', messagesRouter);

// here we go!
const PORT = process.env.PORT || 8080;
app.listen(PORT, (err) => {
    if (err) {
        throw err;
    }
    console.log(`Running at http://localhost:${PORT}.`)
});