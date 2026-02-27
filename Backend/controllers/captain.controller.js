const captainModel = require('../models/captain.model');
const captainService = require('../services/captain.service');
const {validationResult} = require('express-validator');


module.exports.registerCaptain = async (req,res)=>{
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({errors: errors.array()});
    }
    const {fullname:{firstname, lastname}, email, password, vehicles:{color, plate, capacity, vehicleType}} = req.body;
 
    const isCaptainAlreadyExist = await captainModel.findOne({email});
    if(isCaptainAlreadyExist){      
        return res.status(400).json({error: 'Captain with this email already exists'});
    }

    const hashedPassword = await captainModel.hashPassword(password);

        const captain = await captainService.createCaptain({
            fullname:{
                firstname,
                lastname
            },
            email,
            password: hashedPassword,
            vehicles:{
                color,
                plate,
                capacity,
                vehicleType
            }
        });                     
        
        const token = captain.generateAuthToken();

        res.status(201).json({token, captain});
}