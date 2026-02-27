const express = require('express');
const router = express.Router();
const {body} = require('express-validator');
const userModel = require('../models/user.model');
const captainController = require('../controllers/captain.controller');
const authMiddleware = require('../middlewares/auth.middleware');


router.post('/register', [
    body('fullname.firstname').isString().isLength({min:3}).withMessage('First name must be at least 3 characters long'),
    body('fullname.lastname').isString().isLength({min:3}).withMessage('Last name must be at least 3 characters long'),
    body('email').isEmail().withMessage('Please use a valid email address'),
    body('password').isLength({min:6}).withMessage('Password must be at least 6 characters long'),
    body('vehicles.color').isString().isLength({min:3}).withMessage('Color must be at least 3 characters long'),
    body('vehicles.plate').isString().isLength({min:6}).withMessage('Plate number must be at least 6 characters long'),
    body('vehicles.capacity').isInt({min:1}).withMessage('Capacity must be at least 1'),
    body('vehicles.vehicleType').isIn(['car', 'motorcycle', 'auto rickshaw'])
        .withMessage('Vehicle type must be either car, motorcycle, or auto rickshaw')
],
captainController.registerCaptain
)

router.post('/login', [
    body('email').isEmail().withMessage('Please use a valid email address'),
    body('password').isLength({min:6}).withMessage('Password must be at least 6 characters long')
], 
    captainController.loginCaptain
)


router.get('/profile', authMiddleware.authCaptain, captainController.getCaptainProfile)

router.get('/logout', authMiddleware.authCaptain, captainController.logoutCaptain)

module.exports = router;