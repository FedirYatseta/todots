
import User from '../models/user';
import jwt from 'jsonwebtoken';
import { Response, Request, NextFunction } from 'express';

const handleRefreshToken = async (req: Request, res: Response, next: NextFunction) => {
    const cookies: any = req.cookies;
    console.log(cookies)
    if (!cookies?.jwt) return res.sendStatus(401);
    const refreshToken: any = cookies.jwt;
    res.clearCookie('jwt', { httpOnly: true, sameSite: 'none', secure: true });

    const foundUser = await User.findOne({ refreshToken }).exec();
    console.log(foundUser)
    // Detected refresh token reuse!
    if (!foundUser) {
        jwt.verify(
            refreshToken,
            (process.env.REFRESH_TOKEN_SECRET as string),
            async (err: any, decoded: any) => {
                if (err) return res.sendStatus(403); //Forbidden
                // Delete refresh tokens of hacked user
                const hackedUser: any = await User.findOne({ email: decoded.email }).exec();
                hackedUser.refreshToken = [];
                const result = await hackedUser?.save();
            }
        )
        return res.sendStatus(403); //Forbidden
    }

    const newRefreshTokenArray = foundUser.refreshToken.filter((rt: any) => rt !== refreshToken);

    // evaluate jwt 
    jwt.verify(
        refreshToken,
        process.env.REFRESH_TOKEN_SECRET as string,
        async (err: any, decoded: any) => {
            if (err) {
                // expired refresh token
                foundUser.refreshToken = [...newRefreshTokenArray];
                const result: any = await foundUser.save();
            }
            if (err || foundUser.email !== decoded.email) return res.sendStatus(403);

            // Refresh token was still valid
            const roles = Object.values(foundUser.roles);
            const accessToken = jwt.sign(
                {
                    "UserInfo": {
                        "email": decoded.email,
                        "roles": roles
                    }
                },
                process.env.ACCESS_TOKEN_SECRET as string,
                { expiresIn: '10s' }
            );

            const newRefreshToken = jwt.sign(
                { "email": foundUser.email },
                process.env.REFRESH_TOKEN_SECRET as string,
                { expiresIn: '15s' }
            );
            // Saving refreshToken with current user
            foundUser.refreshToken = [...newRefreshTokenArray, newRefreshToken];
            const result = await foundUser.save();
            console.log(result)
            // Creates Secure Cookie with refresh token
            res.cookie('jwt', newRefreshToken, { httpOnly: true, sameSite: 'none', maxAge: 24 * 60 * 60 * 1000 });//secure: true,

            res.json({ accessToken })
        }
    );
}

export default { handleRefreshToken }