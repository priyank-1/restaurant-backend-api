import { SessionOptions } from "express-session";
import { IN_PROD } from "./app";
import dotenv from 'dotenv';

dotenv.config()

export const SESSION_IDLE_TIMEOUT = process.env.SESSION_IDLE_TIMEOUT!
export const SESSION_NAME = process.env.SESSION_NAME! 
export const SESSION_SECRET = process.env.SESSION_SECRET!



export const SESSION_OPTIONS  : SessionOptions = {
    secret : SESSION_SECRET,
    name : SESSION_NAME,
    cookie:{
        maxAge : +SESSION_IDLE_TIMEOUT || 1000 * 60 *30,
        secure : IN_PROD,
        sameSite : true
    },
    rolling : true,
    resave : false,
    saveUninitialized : false,

}

