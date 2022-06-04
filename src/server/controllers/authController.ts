import { NextFunction, Request, Response } from 'express';

import User, { IUser } from '../models/user';

const bcrypt = require('bcrypt')

const JWT = require('jsonwebtoken')

const handleLogin = async (req: Request, res: Response, next: NextFunction) => {

    const { name, pwd } = req.body;
    if (!name || !pwd) return res.status(400).json({ 'message': 'username and password are required.' });
    const foundUser: IUser | null = await User.findOne({ email: name })
    try {
        if (!foundUser) res.sendStatus(401)
        const match = await bcrypt.compare(pwd, foundUser?.password)
        if (match)
            // create JWT
            res.json({ 'success': `Login ${name} ${foundUser}` })
        else {
            res.sendStatus(401)
        }
    } catch (err: any) {
        res.status(500)
    }
}

export default { handleLogin }