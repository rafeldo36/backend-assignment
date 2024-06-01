import mongoose, { Schema } from 'mongoose';

const Data = new Schema({
    user:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user'
    },
    name:{
        type:String,
        required: true,
        unique: true
    },
    img:{
        type:String,
        required: true,
    },
    summary:{
        type:String,
        required: true
    }
})

const DataSchema = mongoose.model('data', Data);

export default DataSchema;