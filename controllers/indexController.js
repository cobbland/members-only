function indexControls(req, res) {
    let title = 'Hello, World!';
    let message = "Welcome to Member's Only—a simple message board."
    if (res.locals.currentUser) {
        title = `Hello, ${res.locals.currentUser.username}`;
        message = `Welcome, ${res.locals.currentUser.username}, to Member's Only—a simple message board.`;
    }
    res.render('index', {
        title: title,
        message: message,
    });
}

module.exports = {
    indexControls,
}