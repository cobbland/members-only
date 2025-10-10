function indexControls(req, res) {
    res.render('index', {
        title: 'Hello, World!',
        message: 'It is working!',
    });
}

module.exports = {
    indexControls,
}