import { func } from "@hapi/joi";
import mongoose , {Document, model, Schema} from "mongoose";
import { compare, hash } from "bcryptjs";
import { BCRYPT_HASH_FACTOR } from "../config";


interface UserDocument extends Document{
    email : string,
    name : string,
    password : string,
    matchesPassword : (password : string) => Promise<boolean>
    
}

const userSchema = new Schema({
    email : String,
    name : String,
    password : String,
},{
    timestamps : true
})

userSchema.pre<UserDocument>('save', async function(){
      if(this.isModified('password'))  {
        this.password = await hash(this.password,BCRYPT_HASH_FACTOR);
      }
})

userSchema.methods.matchesPassword = function (password : string) {

    return compare(password,this.password)

}
export const User = model<UserDocument>('User', userSchema)