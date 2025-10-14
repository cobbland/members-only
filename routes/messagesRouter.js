const express = require("express");
const router = express.Router();
const controller = require('../controllers/messagesController');

router.get('/', controller.getMessages);

module.exports = router;