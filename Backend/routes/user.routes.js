const express = require('express')
const router = express.Router();
const {body}= require('express-validator')
const userController = require('../controllers/user.controller')
const authMiddleware = require('../middlewares/auth.middleware')

router.post('/register',[
    body('email').isEmail().withMessage('Please Enter Valid Email'),
    body('fullname.firstname').isLength({min:3}).withMessage('First Name Must Be At Least 3 characters Long'),
    body('fullname.lastname').isLength({min:3}).withMessage('Last Name Must Be At Least 3 characters Long'),
    body('password').isLength({min:6}).withMessage('Password Must Be At Least 6 characters Long')
],
userController.registerUser
)

router.post('/login',[
    body('email').isEmail().withMessage('Please Enter Valid Email'),
    body('password').isLength({min:6}).withMessage('Password Must Be At Least 6 Characters Long')
],
  userController.loginUser
)

router.get('/profile', authMiddleware.authUser, userController.getUserProfile)

router.get('/logout', authMiddleware.authUser, userController.logoutUser)

module.exports= router;
