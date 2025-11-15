import { envVArs } from "../../config/env";
import AppError from "../../errorHelpers/AppError";
import { createNewAccessTokenWithRefreshToken } from "../../utils/createUserToken";
import { generateToken } from "../../utils/jwt";
import { IUser, Status } from "../user/user.interface";
import { User } from "../user/user.model";
import bcryptjs from 'bcrypt';

const credentialsLogin = async (payload: Partial<IUser>) => {
    const { email, password } = payload;
    const user = await User.findOne({ email });
    if (!user) {
        throw new Error("User not found");
    }
    if (user.status === Status.BLOCKED) {
        throw new AppError(403, "Your account has been blocked.")
    }

    const isPasswordMatched = await bcryptjs.compare(password as string, user.password);
    if (!isPasswordMatched) {
        throw new Error("Password is Incorrect");
    }

    const jwtPayload = {
        userId: user._id,
        email: user.email,
        role: user.role
    }

    const accessToken = generateToken(jwtPayload, envVArs.JWT_ACCESS_SECRET, envVArs.JWT_ACCESS_EXPIRES);
    const refreshToken = generateToken(jwtPayload, envVArs.JWT_REFRESH_SECRET, envVArs.JWT_REFRESH_EXPIRES);

    const { password: pass, ...rest } = user.toObject();
    return {
        accessToken,
        refreshToken,
        user: rest
    };
}

const getNewAccessToken = async (token: string) => {
    const accessToken = await createNewAccessTokenWithRefreshToken(token);

    return {
        accessToken,
    }
}

export const AuthService = {
    credentialsLogin,
    getNewAccessToken
}