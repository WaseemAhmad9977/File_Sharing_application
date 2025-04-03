import mongoose from "mongoose";

const { model, Schema } = mongoose;

const fileSchema = new Schema({
    user:{
        type:mongoose.Types.ObjectId,
        ref:'User'
    },
    filename:{
        type:String,
        lowercase:true,
        trim:true,
        required:true
    },
    type:{
        type:String,
        required:true,
        trim:true,
        lowercase:true
    },
    size:{
        type:Number,
        lowercase:true,
        required:true
    },
    path:{
        type:String,
        trim:true,
        required:true
    }

},{timestamps:true})

const fileModel = model("File",fileSchema)
export default fileModel
