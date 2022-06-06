import { NextFunction, Request, Response } from 'express';
const jwt = require('jsonwebtoken');

const verifyJWT = (req: any, res: any, next: any) => {
    const authHeader: any = req.headers.authorization || req.headers.Authorization;
    if (!authHeader?.startsWith('Bearer')) return res.sendStatus(401);
    const token = authHeader.split(' ')[1];
    console.log(token)
    jwt.verify(
        token,
        process.env.ACCESS_TOKEN_SECRET,
        (err: any, decoded: any) => {
            if (err) return res.sendStatus(403); //invalid token
            req.email = decoded.UserInfo.email;
            req.roles = decoded.UserInfo.roles;
            next();
        }
    );
}

export default verifyJWT;