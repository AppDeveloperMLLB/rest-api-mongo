import express from "express";
import { getUserByEmail, createUser } from "../db/users";
import { random, authentication } from "../helpers/index";

export const login = async (req: express.Request, res: express.Response) => {
    try {
        const { email, password } = req.body;
        if(!email || !password) {
            return res.status(422).json({ message: "Email and password are required." }).end();
        }

        const user = await getUserByEmail(email).select("+authentication.salt +authentication.password");
        if(!user) {
            return res.status(400).json({ message: "User not found." }).end();
        }

        const expectedHash = authentication(user.authentication.salt, password);
        if(user.authentication.password !== expectedHash) {
            return res.status(403).json({ message: "Invalid password." }).end();
        }

        const salt = random();
        user.authentication.sessionToken = authentication(salt, user._id.toString());
        await user.save();

        res.cookie(
            "REST-API-MONG-AUTH", 
            user.authentication.sessionToken, 
            {
                domain: "localhost",
                path: "/"
            }
        );
        return res.status(200).json({
            _id: user._id.toString(),
            email: user.email,
            userName: user.userName,
        }).end();
    } catch (error) {
        console.log(error);
        return res.sendStatus(400);
    }
}

export const register = async (req: express.Request, res: express.Response) => {
    try {
        const {email, password, userName} = req.body;
        if(!email || !password || !userName) {
            return res.sendStatus(400);
        }

        const existingUser = await getUserByEmail(email);
        if(existingUser) {
            return res.sendStatus(400);
        }

        const salt = random();
        const user = await createUser({
            email,
            userName,
            authentication: {
                salt,
                password: authentication(salt, password),
            },
        });

        return res.status(200).json(user).end();
    } catch (error) {
        console.log(error);
        return res.sendStatus(400);
    }
}