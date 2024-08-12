
import { NextFunction, RequestHandler , Request , Response } from "express";

export const catchAsync =  (handler : RequestHandler) =>(...args : [Request,Response , NextFunction]) => {
    try{

        handler(...args)
    }
    catch(error){
        const next = args[2];
        return next(new Error("Bad Request"));

    }
    }

