const express = require("express");
const router = express.Router();
const controller = require('../controllers/signUpController');

router.get('/', controller.getSignUp);
router.post('/', controller.validateUser, controller.postSignUp);

module.exports = router;