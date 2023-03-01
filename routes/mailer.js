const express = require('express')
const controller = require('../controllers/mailer')

const router = express.Router()

router.post('/', controller.send)

module.exports = router
