const authController = require('../controllers/authController')
const {Router} = require('express')
const router = Router()

router.post('/signin', authController.signin)
router.post('/signup', authController.signup)
router.get('/logout', authController.logout)

module.exports = router