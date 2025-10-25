import { envVArs } from "../../config/env";
import AppError from "../../errorHelpers/AppError";
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

    const { password: pass, ...rest } = user.toObject();
    return {
        accessToken,
        user: rest
    };
}

export const AuthService = {
    credentialsLogin
}