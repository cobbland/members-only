const express = require("express");
const router = express.Router();
const controller = require('../controllers/signUpController');

router.get('/', controller.getSignUp);

module.exports = router;