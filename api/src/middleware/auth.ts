import { NextFunction, Request, Response } from "express";
import { BadRequest, Unauthorized } from "../errors";

export const guest = (req: Request, res: Response, next: NextFunction) => {
    if (req.session.userId) {
        return next(new BadRequest("Already Logged in"));
    }
    next();
};

export const auth = (req : Request, res : Response, next : NextFunction) =>{
    
    if(!req.session.userId){
        return next(new Unauthorized("You must be logged in"))  
    }
    next()
}