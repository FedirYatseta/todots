import { NextFunction, Request, Response } from 'express';
import User from '../models/user';
const bcrypt = require('bcrypt');
import jwt from 'jsonwebtoken';

const handleLogin = async (req: Request, res: Response, next: NextFunction) => {
    const cookies = req.cookies;
    const { name, pwd } = req.body;
    if (!name || !pwd) return res.status(400).json({ 'message': 'username and password are required.' });
    const foundUser = await User.findOne({ email: name }).exec()
    try {
        if (!foundUser) res.sendStatus(401)
        const match = await bcrypt.compare(pwd, foundUser?.password)
        if (match) {
            const roles = Object.values(foundUser!.roles).filter(Boolean);
            // create JWT
            const accessToken = jwt.sign(
                {
                    "UserInfo": {
                        "email": foundUser?.email,
                        "roles": roles
                    }
                },
                process.env.ACCESS_TOKEN_SECRET as string,
                { expiresIn: '10d' }
            )

            const newRefreshToken = jwt.sign(
                { "email": foundUser?.email },
                process.env.REFRESH_TOKEN_SECRET as string,
                { expiresIn: '15d' }

            );
            let newRefreshTokenArray =
                !cookies?.jwt
                    ? foundUser?.refreshToken
                    : foundUser?.refreshToken.filter((rt: any) => rt !== cookies.jwt);
            //saving refresh token with current users
            if (cookies?.jwt) {

                /* 
                Scenario added here: 
                    1) User logs in but never uses RT and does not logout 
                    2) RT is stolen
                    3) If 1 & 2, reuse detection is needed to clear all RTs when user logs in
                */
                const refreshToken = cookies.jwt;
                const foundToken = await User.findOne({ refreshToken }).exec();

                // Detected refresh token reuse!
                if (!foundToken) {
                    // clear out ALL previous refresh tokens
                    newRefreshTokenArray = [];
                }

                res.clearCookie('jwt', { httpOnly: true, sameSite: 'none', secure: true });
            }

            // Saving refreshToken with current user
            foundUser!.refreshToken = [...newRefreshTokenArray, newRefreshToken];
            //const result: any = await foundUser.save();

            // Creates Secure Cookie with refresh token
            res.cookie('jwt', newRefreshToken, { httpOnly: true, sameSite: 'none', maxAge: 24 * 60 * 60 * 1000 });//secure: true,
            const result: any = await foundUser?.save();
            console.log(result)
            // Send authorization roles and access token to user
            res.json({ accessToken });
        }


        else {
            res.sendStatus(401)
        }
    } catch (err: any) {
        res.status(500)
    }
}

export default { handleLogin }