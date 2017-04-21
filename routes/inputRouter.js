const express = require('express');
const inputController = require('../controllers/inputController');
const passport = require('passport');

const router = express.Router()

router.get('/api/inputs', inputController.readInputs);
router.get('/api/comps', inputController.readComps);
router.put('/api/inputs', inputController.updateInputs);
router.post('/api/comps', inputController.createComps);

router.post('/api/login', passport.authenticate('local', {
  successRedirect: '/users/me',
  failureRedirect: '/oops'
}));

module.exports = router
