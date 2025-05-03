import jwt from 'jsonwebtoken'
import { Refresh_Secret } from '../config'
import { Access_Secret } from '../config'

export interface AuthRequest extends Request{
        user?:{id:string}
}

import type { Request, Response ,NextFunction} from 'express';

const userAuth = (req:AuthRequest,res:Response,next:NextFunction)=>{
   
        const authHeader = req.headers['authorization'];
       
        if(!authHeader?.startsWith('Bearer'))
        {
           res.status(401).json({message:'No token is provided'});

        } 
        
        const token = String(authHeader?.split(' ')[1]);

        try{
                const decodedData = jwt.verify(token,Access_Secret) as {id:string} ;
                req.user = {id:decodedData.id}
                next(); 
        }
        catch(err)
        {
                res.status(401).json({message:'Invalid or expried token',shouldRefresh: err instanceof jwt.TokenExpiredError });
        }

}



export default userAuth;