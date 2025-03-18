import mongoose from "mongoose";


const userSchema = new mongoose.Schema({
    username: {type:String,rerquired:true,unique:true},
    password: {type:String,required:true}
})

export type IUser = mongoose.InferSchemaType<typeof userSchema>
export const userModel = mongoose.model('user',userSchema)