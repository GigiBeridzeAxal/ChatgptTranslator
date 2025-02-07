const mongoose = require('mongoose')

const UserSchema = mongoose.Schema({

    firstname:{
        type:String,
        required:true
    },
    
    lastname:{
        type:String,
        required:true
    },
    
    password:{
        type:String,
        required:true
    },
    
    email:{
        type:String,
        required:true
    },
    credits:{
        type:Number,
        required:true,
        default:15
    },
    compleatedprofile:{
        type:Boolean,
        required:true,
        default:false
    },
    profilepicture:{
        type:String,
        required:true,
        default:'no'
    },
    


})

module.exports = mongoose.model('Users' , UserSchema)