import { required } from "joi";
import { NextFunction, Request, Response } from 'express';
import mongoose from "mongoose";
import User, { IUser } from '../models/user';

const bcrypt = require('bcrypt')



const handleNewUser = async (req: Request, res: Response, next: NextFunction) => {
    const { name, pwd } = req.body;
    if (!name || !pwd) return res.status(400).json({ 'message': 'username and password are required.' });
    try {
        const hashedPwd = await bcrypt.hash(pwd, 10);
        const duplicate = await User.findOne({ email: name })
        if (duplicate) {
            res.status(409).json({ 'false': `duplicate ${duplicate}, name ${name}` })
        } else {
            const createUser = new User({
                _id: new mongoose.Types.ObjectId(),
                email: name,
                password: hashedPwd
            });
            return createUser
                .save()
                .then(() => res.status(201).json({ 'success': `New user ${name} created` }))
        }
    } catch (err: any) {
        res.status(500).json({ "message": err.message })
    }
}

export default { handleNewUser }