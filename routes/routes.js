const authController = require('../controllers/authController')
const {Router} = require('express')
const router = Router()


router.post('/account_recovery', authController.account_recovery)
router.post('/change_password', authController.change_password)
router.post('/signin', authController.signin)
router.post('/signup', authController.signup)
router.get('/logout', authController.logout)

module.exports = router