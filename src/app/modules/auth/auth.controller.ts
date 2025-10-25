import { NextFunction, Request, Response } from "express";
import { catchAsync } from "../../utils/catchAsync";
import { AuthService } from "./auth.service";
import { sendResponse } from "../../utils/sendResponse";

const credentialsLogin = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const loginInfo = await AuthService.credentialsLogin(req.body);

    res.cookie("accessToken", loginInfo.accessToken, {
        httpOnly: true,
        secure: false
    })

    sendResponse(res, {
        success: true,
        statusCode: 200,
        message: "User logged in successfully",
        data: loginInfo,
    })

})

export const authController = {
    credentialsLogin
}