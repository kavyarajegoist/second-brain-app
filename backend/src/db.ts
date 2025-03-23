import mongoose, { Types } from "mongoose";


const userSchema = new mongoose.Schema({
    username: {type:String,rerquired:true,unique:true},
    password: {type:String,required:true}
})

const contentTypes = ['image','article','audio','video'];
const contentSchema = new mongoose.Schema({
    link :{type:String,required:true},
    title: {type:String,required:true},
    tags:[{type:Types.ObjectId,ref:'tag'}],
    userId:{type:Types.ObjectId,},
    type: {type:String,enum:contentTypes,required:true},
    createdOn:{type:Date,required:true}
})

const linkSchema = new mongoose.Schema({
    hash:{type:String,required:true},
    userId:{type:mongoose.Types.ObjectId,ref:'user',required:true, unique:true }
})

const tagsSchema = new mongoose.Schema({
    title:{type:String,required:true,unique:true}
})



export const userModel = mongoose.model('user',userSchema);
export const Tag = mongoose.model('tag',tagsSchema);
export const Links = mongoose.model('link',linkSchema);
export const Content = mongoose.model('content',contentSchema);
