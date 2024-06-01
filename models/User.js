import mongoose, { Schema } from 'mongoose';

const User = new Schema({
    name:{
        type:String,
        required: true
    },
    address:{
        type:String,
        required: true,
    },
    email:{
        type:String,
        required: true,
        unique: true
    },
    number:{
        type:Number,
        required: true
    },
    password:{
        type:String,
        required: true
    },
    role: {
        type: Number,
        default: 0,
      },
})

const UserSchema = mongoose.model('user', User);

export default UserSchema;