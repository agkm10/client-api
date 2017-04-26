const express = require('express')
const watsonCtrl = require('../controllers/watsonCtrl')
const router = express.Router()

router.get('/message', watsonCtrl.getMessage)

router.post('/message', watsonCtrl.postMessage)

module.exports = router
