import mongoose from "mongoose";

export interface ITrackingEvent {
    _id: mongoose.Types.ObjectId;
    status: string;
    timestamp: Date;
    updatedBy: mongoose.Types.ObjectId;
    note?: string;
}
export enum ParcelStatus {
    REQUESTED = "REQUESTED",
    ACCEPTED = "ACCEPTED",
    REJECTED = "REJECTED",
    PICKED = "PICKED",
    IN_TRANSIT = "IN_TRANSIT",
    DELIVERED = "DELIVERED",
    CANCELED = "CANCELED"
}

export interface IParcel {
    _id: mongoose.Types.ObjectId;
    trackingId: string;
    sender: mongoose.Types.ObjectId;
    receiver: mongoose.Types.ObjectId;
    pickupAddress: string;
    deliveryAddress: string;
    status: ParcelStatus;
    trackingEvents: ITrackingEvent[];
    fee?: number;
    estimatedDeliveryDate?: Date;

}