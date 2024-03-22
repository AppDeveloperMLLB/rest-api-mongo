import express from "express";
import { get, merge } from "lodash";
import { getUserBySessionToken } from "../db/users";

export const isOwner = async (
    req: express.Request, 
    res: express.Response, 
    next: express.NextFunction
) => {
    try {
        const { id } = req.params;
        const currentUserId = get(req, "identity._id") as string;
        console.log(currentUserId);
        console.log(id);

        if(!currentUserId) {
            console.log("No current user");
            return res.sendStatus(403);
        }

        if(currentUserId.toString() !== id) {
            console.log("Not the owner");
            return res.sendStatus(403);
        }

        return next();
    } catch (error) {
        console.log(error);
        return res.sendStatus(400);
    }
};

export const isAuthenticated = async (
    req: express.Request, 
    res: express.Response,
    next: express.NextFunction,
) => {
    try {
        const sessionToken = req.cookies["REST-API-MONG-AUTH"];
        if(!sessionToken) {
            return res.sendStatus(400);
        }

        const existingUser = await getUserBySessionToken(sessionToken);
        if(!existingUser) {
            return res.sendStatus(403);
        }

        merge(req, { identity: existingUser });

        return next();
    } catch (error) {
        console.log(error);
        return res.sendStatus(400);
    }
};