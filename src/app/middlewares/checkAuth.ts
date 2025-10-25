import { JwtPayload } from "jsonwebtoken";
import { verifyToken } from "../utils/jwt";
import AppError from "../errorHelpers/AppError";
import { NextFunction, Request, Response } from "express";
import { User } from "../modules/user/user.model";
import { Status } from "../modules/user/user.interface";
// import { IsActive } from "../modules/user/user.interface";

export const checkAuth = (...authRoles: string[]) => async (req: Request, res: Response, next: NextFunction) => {
    try {
        const accessToken = req.cookies.accessToken;

        if (!accessToken) {
            throw new AppError(403, "No Token Recived")
        }

        const verifiedToken = verifyToken(accessToken, "secret") as JwtPayload;

        const user = await User.findOne({ email: verifiedToken.email });

        if (!user) {
            throw new AppError(400, "User does not exits")
        }

        if (user.status !== Status.ACTIVE) {
            throw new AppError(400, `User is ${user.status}`)
        }

        if (!authRoles.includes(verifiedToken.role)) {
            throw new AppError(403, "You are not permitted to view this route!")
        }
        req.user = verifiedToken;
        next()
    } catch (error) {
        next(error)
    }
}