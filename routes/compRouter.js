const express = require('express');
const inputController = require('../controllers/inputController');
const passport = require('passport');

const router = express.Router()

router.get('/', inputController.readComps);
router.post('/', inputController.createComps);

module.exports = router
