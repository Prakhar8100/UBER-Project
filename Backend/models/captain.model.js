const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const captainSchema = new mongoose.Schema({
    fullname:{
        firstname:{
            type:String,
            required:true,
            minlength: [3, 'First name must be at least 3 characters long']
        },
        lastname:{
            type:String,
            required:true,
            minlength: [3, 'Last name must be at least 3 characters long']
        }
    },
    email:{
        type:String,
        required:true,
        unique:true,
        lowercase:true,
        match: [/\S+@\S+\.\S+/, 'Please use a valid email address']
    },
    password:{
        type:String,
        required:true,
        select:false,
        minlength: [6, 'Password must be at least 6 characters long']
    },
    socketId:{
        type:String,
    },
    
    status:{
        type:String,
        enum:['available', 'busy', 'offline'],
        default:'offline'
    },

    role:{
        type:String,
        enum:['captain'],
        default:'captain'
    },
    vehicles:{
        color:{
            type:String,
            required:true,
            minlength: [3, 'Color must be at least 3 characters long']
        },
        plate:{
            type:String,
            required:true,
            minlength: [6, 'Plate number must be at least 6 characters long']
        },
        capacity:{
            type:Number,
            required:true,
            min:1
        },
        vehicleType:{
            type:String,
            required:true,
            enum:['car', 'motorcycle', 'auto rickshaw'],
        }
    },
    location:{
        latitude:{
            type:Number,
        },
        longitude:{
            type:Number,
        }
    }
})

captainSchema.methods.generateAuthToken = function() {
    const token = jwt.sign({ _id: this._id, role: this.role }, process.env.JWT_SECRET, { expiresIn: '1d' });
    return token;
};

captainSchema.methods.comparePassword = async function(candidatePassword) {
    return await bcrypt.compare(candidatePassword, this.password);
}

captainSchema.statics.hashPassword = async function(password) {
    return await bcrypt.hash(password,10);
}


const captainModel = mongoose.model('captain', captainSchema);

module.exports = captainModel;