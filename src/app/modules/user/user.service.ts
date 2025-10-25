import { IUser } from "./user.interface";
import { User } from "./user.model";
import bcryptjs from "bcrypt";
import { envVArs } from "../../config/env";
import AppError from "../../errorHelpers/AppError";

const createUser = async (payload: Partial<IUser>) => {
    const { email, password, ...rest } = payload;

    const isUserExist = await User.findOne({ email });

    if (isUserExist) {
        throw new AppError(400, "User is already exits")
    }

    const hashedPassword = await bcryptjs.hash(password as string, Number(envVArs.BCRYPT_SALT_ROUND));

    const user = await User.create({
        email,
        password: hashedPassword,
        ...rest
    });
    return user;
}

const updateUserStatus = async (userId: string, status: string) => {
    const user = await User.findOne({ _id: userId });
    if (!user) {
        throw new AppError(404, "User not found");
    }
    const updatedUser = await User.findByIdAndUpdate(userId, { status: status }, { new: true, runValidators: true });
    return updatedUser;
}


export const UserService = {
    createUser,
    updateUserStatus
}