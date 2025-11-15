import { NextFunction, Request, Response } from "express";
import { UserService } from "./user.service";
import { sendResponse } from "../../utils/sendResponse";
import { catchAsync } from "../../utils/catchAsync";


const createUser = catchAsync(async (req: Request, res: Response, next: NextFunction) => {

    const user = await UserService.createUser(req.body);

    sendResponse(res, {
        statusCode: 201,
        success: true,
        message: "User Created Successfully",
        data: user

    })
})

const updateUserStatus = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const userId = req.params.id;
    const status = req.body?.status;

    const updatedUser = await UserService.updateUserStatus(userId, status);
    sendResponse(res, {
        statusCode: 200,
        success: true,
        message: "User updated Successfully",
        data: updatedUser

    })
})

const getAllUsers = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const users = await UserService.getAllUser(req.query);

    sendResponse(res, {
        statusCode: 200,
        success: true,
        message: "Users retrieved successfully",
        data: users

    })
})

export const UserController = {
    createUser,
    updateUserStatus,
    getAllUsers
}