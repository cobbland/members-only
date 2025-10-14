const db = require('../db/queries');

async function getMessages(req, res) {
    try {
        const messages = db.selectAllMessages
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

module.exports = {
    getMessages,
};