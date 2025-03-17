require('dotenv').config()


import express from "express";
import mongoose from "mongoose";

const app = express();

const port :any= process.env.PORT; 

app.get("/api/user",(req:any,res:any)=>{
    res.json(  "hello world to my world ")
})

app.listen(port,()=>{
    console.log( `Listening on port ${port}`);
})