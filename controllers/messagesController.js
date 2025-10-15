const db = require('../db/queries');

async function getMessages(req, res) {
    try {
        const messages = await db.selectAllMessages();
        res.render('messages', {
            title: 'Messages',
            message: 'Here are all the messages:',
            messages: messages,
        });
    } catch(err) {
        res.render('messages', {
            title: 'Messages',
            message: err,
        });
    }
}

function getNewMessage(req, res) {
    if (res.locals.currentUser) {
        if (res.locals.currentUser.membership) {
            res.render('new-message', {
                title: 'New Message',
                message: 'Post a new message.',
            });
        }
    } else {
        res.render('log-in', {
            title: 'Log In',
            message: 'Log in here.'
        });
    }
}

async function postNewMessage(req, res) {
    const { title, text } = req.body;
    const userID = res.locals.currentUser.id
    try {
        await db.insertMessage(title, text, userID);
        res.redirect('/messages');
    } catch(err) {
        res.render('new-message', {
            title: 'New Message',
            message: err,
        });
    }
}

module.exports = {
    getMessages, getNewMessage, postNewMessage,
};