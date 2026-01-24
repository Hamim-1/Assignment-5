import { NextFunction, Request, Response } from "express";
import { sendResponse } from "../../utils/sendResponse";
import { catchAsync } from "../../utils/catchAsync";
import { ParcelService } from "./parcel.service";
import AppError from "../../errorHelpers/AppError";
import { ParcelStatus } from "./parcel.interface";


const createParcel = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const user = req.user;
    const parcel = await ParcelService.createParcel(req.body, user.userId);

    sendResponse(res, {
        statusCode: 201,
        success: true,
        message: "Parcel Created Successfully",
        data: parcel

    })
})

const getMyParcels = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const user = req.user;
    const parcels = await ParcelService.getMyParcels(user.userId, user.role);

    sendResponse(res, {
        statusCode: 200,
        success: true,
        message: "Parcels retrieved successfully",
        data: parcels

    })
})

const getAllParcels = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const parcels = await ParcelService.getAllParcels(req.query);

    sendResponse(res, {
        statusCode: 200,
        success: true,
        message: "Parcels retrieved successfully",
        data: parcels

    })
})

const updateParcelStatus = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const user = req.user;
    const parcelId = req.params.id;
    const status = req.body.status;

    if (!Object.values(ParcelStatus).includes(status)) {
        throw new AppError(400, "Status value is invalid")
    }
    const updatedParcel = await ParcelService.updateParcelStatus(parcelId, status, user.userId);
    sendResponse(res, {
        statusCode: 200,
        success: true,
        message: "Parcels updated successfully",
        data: updatedParcel

    })
})

const getIncomingParcels = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const user = req.user;
    const parcels = await ParcelService.getIncomingParcels(user.userId);

    sendResponse(res, {
        statusCode: 200,
        success: true,
        message: "Parcels retrieved successfully",
        data: parcels

    })
})

const cancelParcel = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const user = req.user;
    const parcerId = req.params.id;
    const canceledParcel = await ParcelService.cancelParcel(parcerId, user.userId, user.role);
    sendResponse(res, {
        statusCode: 200,
        success: true,
        message: "Parcels canceled successfully",
        data: canceledParcel

    })
})

const confirmParcelDelivery = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const user = req.user;
    const parcelrId = req.params.id;
    const confirmParcel = await ParcelService.confirmParcelDelivery(parcelrId, user.userId, user.role);
    sendResponse(res, {
        statusCode: 200,
        success: true,
        message: "Parcels Devlivered successfully",
        data: confirmParcel

    })
})

const trackParcelByTrackingId = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const { trackingId } = req.params;
    const parcel = await ParcelService.trackParcelByTrackingId(trackingId);
    sendResponse(res, {
        statusCode: 200,
        success: true,
        message: "Parcel tracking info retrieved successfully",
        data: parcel

    })
})

const getDeliveryHistory = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const user = req.user;
    const history = await ParcelService.getDeliveryHistory(user.userId);
    sendResponse(res, {
        statusCode: 200,
        success: true,
        message: history.length > 0 ? "Delivered parcel history retrieved successfully" : "No delivery history found",
        data: history

    })
})

const getParcelStatusLog = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const user = req.user;
    const parcelId = req.params.id;
    const history = await ParcelService.getParcelStatusLog(user.userId, parcelId);
    sendResponse(res, {
        statusCode: 200,
        success: true,
        message: "Parcel status history retrieved successfully",
        data: history

    })
})

const getReceiverRequestedParcels = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const user = req.user;
    const parcels = await ParcelService.getReceiverRequestedParcels(user.userId);
    sendResponse(res, {
        statusCode: 200,
        success: true,
        message: "Requested parcel retrieved successfully",
        data: parcels

    })
})

const acceptParcelRequest = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const user = req.user;
    const parcelId = req.params.id;
    const parcel = await ParcelService.acceptParcelRequest(user.userId, parcelId);
    sendResponse(res, {
        statusCode: 200,
        success: true,
        message: "Receiver Accept the Parcel Request",
        data: parcel

    })
})

const rejectParcelRequest = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const user = req.user;
    const parcelId = req.params.id;
    const parcel = await ParcelService.rejectParcelRequest(user.userId, parcelId);
    sendResponse(res, {
        statusCode: 200,
        success: true,
        message: "Receiver Accept the Parcel Request",
        data: parcel

    })
})

export const ParcelController = {
    createParcel,
    getAllParcels,
    getIncomingParcels,
    getMyParcels,
    updateParcelStatus,
    cancelParcel,
    confirmParcelDelivery,
    trackParcelByTrackingId,
    getDeliveryHistory,
    getParcelStatusLog,
    getReceiverRequestedParcels,
    rejectParcelRequest,
    acceptParcelRequest
}