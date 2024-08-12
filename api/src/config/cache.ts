import { configDotenv } from "dotenv"
import { RedisOptions } from "ioredis"

configDotenv();

export const REDIS_PORT  = process.env.REDIS_PORT!
export const REDIS_HOST = process.env.REDIS_HOST!

export const REDIS_PASSWORD = process.env.REDIS_PASSWORD!



export const REDIS_OPTIONS : RedisOptions = {
   host : REDIS_HOST,
   port : +REDIS_PORT,
   password : REDIS_PASSWORD
}