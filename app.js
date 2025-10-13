// imports
const express = require('express');
const path = require('node:path');

// initializations and such
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

// routes and route variables
const routesPath = path.join(__dirname, 'routes');
const indexRouter = require(path.join(routesPath, 'indexRouter'));
const signUpRouter = require(path.join(routesPath, 'signUpRouter'));

app.use('/', indexRouter);
app.use('/sign-up', signUpRouter);

// here we go!
const PORT = process.env.PORT || 8080;
app.listen(PORT, (err) => {
    if (err) {
        throw err;
    }
    console.log(`Running at http://localhost:${PORT}.`)
});