import { z } from "zod";
import { Role, Status } from "./user.interface";

export const createUserZodSchema = z.object({
    name: z
        .string({ error: "Name must be a string" })
        .min(2, { message: "Name must be at least 2 characters long" })
        .max(50, { message: "Name cannot exceed 100 characters" }),
    email: z
        .string({ error: "Email must be a string" })
        .email({ message: "invalid email" })
        .min(5, { message: "Email must be al least 5 characters long" })
        .max(100, { message: "Email cannot exceed 100 characters." }),
    password: z
        .string({ error: "Password must be string" })
        .min(8, { message: "Password must be at least 8 characters long." })
        .regex(/^(?=.*[A-Z])/, {
            message: "Password must contain at least 1 uppercase letter.",
        })
        .regex(/^(?=.*[!@#$%^&*])/, {
            message: "Password must contain at least 1 special character.",
        })
        .regex(/^(?=.*\d)/, {
            message: "Password must contain at least 1 number.",
        }),
    role: z.nativeEnum(Role).default(Role.SENDER),
    status: z.nativeEnum(Status).default(Status.ACTIVE),
});
