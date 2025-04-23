const {Schema, model} = require('mongoose');

const UserSchema = new Schema({
    email:{
        email:{
            type:String,
            required:true,
            unique:true
        },
        email:{
            type:String,
            required:true,
        },
        isActivated:{
            type:Boolean,
            default:false,
            required:true,
        },
        activationLink:{
            type:String,
        },
    }
});

module.exports = model('User', UserSchema);