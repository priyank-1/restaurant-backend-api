import { Router } from "express";
import { registerSchema , validate } from "../validation";
import { User } from "../models";
import { guest } from "../middleware";
import { logIn } from "./login";



const router = Router();
router.post('/register',guest ,  async (req ,res , next)=>{
    await validate(registerSchema , req.body);
    const {email , name ,password} = req.body;
    const found = await User.exists({email});
    
    if(found){
        return next(new Error('Invalid Email'));
    }


    const user = await User.create({
        email,
        name,
        password,
    });

   logIn(req,res,next,user.id);
   res.json(`User created`)

});
export default router