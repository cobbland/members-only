const express = require("express");
const router = express.Router();
const controller = require('../controllers/signUpController');
const { joinClub } = require("../db/queries");

router.get('/', controller.getSignUp);
router.post('/', controller.validateUser, controller.postSignUp);
router.get('/join-club', controller.getJoinClub);
router.post('/join-club', controller.validateClubPassword, controller.postJoinClub);

module.exports = router;