const express = require('express')
const controller = require('../controllers/mailer')

const router = express.Router()

router.post('/', controller.send)
router.post('/menu', controller.send)

module.exports = router
