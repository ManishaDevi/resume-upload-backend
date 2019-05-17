const router = require('express').Router()
const userController = require('./controllers/user')
const response = require('./responses')

router.get('/', (req, res, next) => response.ok(res))
router.post('/submit', userController.submit)

module.exports = router