require('dotenv').config()
import mongoose from "mongoose";
import express from "express";
import { port,Mongo_Url } from "./config";
import userRouter from "./routes/user";


const app = express();
app.use(express.json())

app.use('/api/user/',userRouter)



async function main(){
await mongoose.connect(Mongo_Url);
app.listen(port,()=>{
    console.log( `Listening on port ${port}`);
    console.log(`Connected to the database ${Mongo_Url}`);
})
}


main();