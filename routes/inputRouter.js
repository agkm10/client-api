const express = require('express');
const inputController = require('../controllers/inputController');
const passport = require('passport');

const router = express.Router()

router.get('/', inputController.readInputs);
router.put('/', inputController.updateInputs);

module.exports = router
