// require("dotenv").config({ path: "./public/temp/.env" });     //make code inconsistent
import dotenv from "dotenv";
import mongoose from "mongoose";
import { DB_NAME } from "./constants.js";
import connectDB from "./db/index.js";
import { app } from "./app.js";
/*
first Approach :--
import express from "express";
const app=express();

;(async()=>{
    try{
        await mongoose.connect(`$(process.env.MONGODB_URI)/${DB_NAME}`)
        app.on("error",(err)=>{
            console.log("Error in connecting to db",err);
            throw err;
        })

        app.listen(process.env.PORT,()=>{
            console.log('Server is listening on port',$(process.env.PORT));
        })

    }
    catch(err){
        console.log("Error in starting the server",err);
        throw err;
    }
})()
*/

//Second Approach :--
dotenv.config({ path: "./public/temp/.env" });
connectDB()
.then(()=>{
    app.on("error",(err)=>{
            console.log("Error in connecting to db",err);
            throw err;
    });

    app.listen(process.env.PORT || 8000,()=>
    {
        console.log(`server is running on port:${process.env.PORT}`);
    })
})
.catch((err)=>{
    console.log("DB connection failed!!!",err);
})
