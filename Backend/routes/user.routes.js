const express = require('express')
const router = express.Router();
const {body} = require('express-validator')

const userController = require('../controllers/user.controller')

const {authUser} = require('../middlewares/auth.middleware')

router.post('/register', [
  body('email').isEmail().withMessage('Invalid Email')
], userController.registerUser)

router.post('/login', [
  body('email').isEmail().withMessage('Invalid Email')
], userController.loginUser)

router.get('/profile', authUser, userController.getUserProfile)

router.get('/logout', userController.logoutUser)


module.exports = router;