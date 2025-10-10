// import db functions (after making them)

// validators for form data, including matching passwords

function getSignUp(req, res) {
    res.render('sign-up', {
        title: 'Sign Up',
        message: 'Signing up is the first step in becoming a member.'
    });
}

// make postSignUp function
// here

module.exports = {
    getSignUp,
}