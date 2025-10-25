import mongoose, { Schema } from "mongoose";
import { IUser, Role, Status } from "./user.interface";

const userSchema = new Schema<IUser>({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: { type: String, enum: Object.values(Role), default: Role.SENDER },
    status: { type: String, enum: Object.values(Status), default: Status.ACTIVE },
},
    {
        timestamps: true,
        versionKey: false
    })

export const User = mongoose.model("User", userSchema);