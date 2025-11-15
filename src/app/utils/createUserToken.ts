import { JwtPayload } from "jsonwebtoken";
import { generateToken, verifyToken } from "./jwt";
import { envVArs } from "../config/env";
import { User } from "../modules/user/user.model";
import AppError from "../errorHelpers/AppError";
import { Status } from "../modules/user/user.interface";

export const createNewAccessTokenWithRefreshToken = async (token: string) => {
    const verifiedRefreshToken = verifyToken(token, envVArs.JWT_REFRESH_SECRET) as JwtPayload;

    const user = await User.findOne({ email: verifiedRefreshToken.email });

    if (!user) {
        throw new AppError(400, "User does not exits")
    }

    if (user.status !== Status.ACTIVE) {
        throw new AppError(400, `User is ${user.status}`)
    }

    const jwtPayload = {
        userId: user._id,
        email: user.email,
        role: user.role
    }

    const accessToken = generateToken(jwtPayload, envVArs.JWT_ACCESS_SECRET, envVArs.JWT_ACCESS_EXPIRES);

    return accessToken;
}