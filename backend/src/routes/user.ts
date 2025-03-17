import Router, { type Request, type Response } from 'express';
import jwt from 'jsonwebtoken';
import {UserSchema} from '../schema/schema'
import { userModel } from '../db';
import bcrypt from 'bcrypt'

const userRouter = Router();

userRouter.get('/',async(req:Request,res:Response)=>{
    try {
        const parsedData = UserSchema.safeParse(req.body);
        if(!parsedData.success)
        {   const errorMessages = parsedData.error.errors.map(error=>({
            field: error.path.join('.'),
            message:error.message
        })
            
        )
            res.status(411).json({
                errors: errorMessages,
                message: 'Invalid username or password'
            })
        }

        const {username,password} = req.body;
        const hassedPassword = await bcrypt.hash(password,10);

        await userModel.create({
            username,password:hassedPassword
        })

        res.status(200).json({
            message: 'SignUp'
        })
    
    } catch (error) {
        
    }


})  

