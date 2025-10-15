const express = require("express");
const router = express.Router();
const controller = require('../controllers/messagesController');

router.get('/', controller.getMessages);
router.get('/new', controller.getNewMessage);
router.post('/new', controller.postNewMessage);
router.post('/delete', controller.postDelete);

module.exports = router;