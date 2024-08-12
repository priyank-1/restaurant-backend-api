import { NextFunction, Request,  Response,  Router } from "express";
import { validate, loginSchema } from "../validation";
import { User } from "../models";
import { Unauthorized } from "../errors";

import { auth, guest } from "../middleware";
import { SESSION_NAME } from "../config";

const router = Router();

export const logIn = (req : Request, res : Response , next : NextFunction ,id : any) =>{
  req.session.userId = id;
  req.session.save((err : any) => {
    if (err) {
      return next(err);
    }
    return res.status(201).json({ message: "Logged in successfully" });
  }); 
}

router.post("/login", guest,async (req, res, next) => {
  try {
    await validate(loginSchema, req.body);
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user || !(await user.matchesPassword(password))) {
      throw new Unauthorized("Incorrect Email or Password");
    }
    
    logIn(req, res, next, user._id);

   } catch (err) {
    next(err); 
   }
});


router.post("/logout", auth, async (req, res, next) => {
  try {
    req.session.destroy((err) => {
      if (err) {
          return err;
      }
      res.clearCookie(SESSION_NAME);
      return res.json({ message: "Logged out successfully" });     
  });
  } catch (err) {
    return next(err);
  }
});

export default router;
