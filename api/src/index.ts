import mongoose from "mongoose";
import { Redis } from "ioredis";
import RedisStore from "connect-redis";
import { REDIS_OPTIONS, APP_PORT, MONGO_URI} from "./config";
import { createApp } from "./app";
import session from "express-session";
import dotenv from "dotenv";

dotenv.config();


(async () => {
  await mongoose
    .connect(MONGO_URI)
    .then(() => {
      console.log("MongoDB Connected");
    })
    .catch((error) => {
      console.log(`MongoDB Connection Error ${error}`);
    });
  const client = new Redis(REDIS_OPTIONS);
  // client.connect();
  //  await client.connect().then(()=>{
  //   console.log('Redis Connected');
  //  }).catch(console.error);
  //  const client = redis.client;


  const store = new RedisStore({ client: client });
  const app = createApp(store);

  app.listen(APP_PORT, () => console.log(`http://localhost:${APP_PORT}`));
})();
