import { ConnectOptions } from "mongoose"


export const MONGO_USERNAME = process.env.MONGO_USERNAME!
export const MONGO_PASSWORD = process.env.MONGO_PASSWORD!
export const MONGO_HOST = process.env.MONGO_HOST!
export const MONGO_PORT = process.env.MONGO_PORT!
export const MONGO_DATABASE = process.env.MONGO_DATABASE!



export const MONGO_URI  =`mongodb://${MONGO_USERNAME}:${MONGO_PASSWORD}@${MONGO_HOST}:${MONGO_PORT}/${MONGO_DATABASE}?authSource=admin` ; 
