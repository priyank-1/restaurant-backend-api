import express, { NextFunction, Request, Response } from "express";
import { SESSION_OPTIONS } from "./config";
import session,{Store} from "express-session";
import { register , login, restaurant } from "./routes/index";
import RedisStore from "connect-redis";
import dotenv from "dotenv";
dotenv.config()

declare module "express-session"{
 interface SessionData{
    userId : string | null;
 }
}

export const createApp = (store : Store)=>{
    const app = express();
    const cookieParser = require('cookie-parser');
    app.use(cookieParser());
    app.use(express.json());

    app.use(
        session({
        ...SESSION_OPTIONS,
       store,
    
    })) 


   
    
    app.use(login)
    app.use(register);
    app.use(restaurant);

    app.use((req,res,next)=>{
        res.status(404).json({message : 'Not Found'});
    })

    app.use((err : any,req : Request,res : Response,next : NextFunction)=>{
        if(!err.status){

            console.error(err.stack);
        }
        res.status(err.status || 500).json({message : err.message || 'Internal Server Error'});
    })
    

    return app
    
}