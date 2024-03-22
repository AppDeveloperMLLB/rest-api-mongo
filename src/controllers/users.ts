import express from "express";

import { getUsers, deleteUserById, getUserById } from "../db/users";

export const getAllUsers = async (req: express.Request, res: express.Response) => {
    try {
        const user = await getUsers();
        return res.status(200).json(user);
    } catch (error) {
        console.log(error);
        return res.sendStatus(400);
    }
}

export const deleteUser = async (req: express.Request, res: express.Response) => {
    try {
        const { id } = req.params;
        console.log(id);
        const user = await deleteUserById(id);
        return res.status(200).json(user);
    } catch (error) {
        console.log(error);
        return res.sendStatus(400);
    }
};

export const updateUser = async (req: express.Request, res: express.Response) => {
    try {
        const { id } = req.params;
        const { userName } = req.body;

        if(!userName) {
            return res.sendStatus(400);
        }

        const user = await getUserById(id);
        user.userName = userName;
        await user.save();
        return res.status(200).json(user).end();
    } catch (error) {
        console.log(error);
        return res.sendStatus(400);
    }
};