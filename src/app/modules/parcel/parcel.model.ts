import mongoose, { Schema } from "mongoose";
import { IParcel, ITrackingEvent, ParcelStatus } from "./parcel.interface";
import { object } from "zod";

const trackingEventSchema = new Schema<ITrackingEvent>({
    status: { type: String, required: true },
    timestamp: { type: Date, default: Date.now },
    updatedBy: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    note: { type: String },
});

const parcelSchema: Schema<IParcel> = new Schema(
    {
        trackingId: { type: String, unique: true, required: true },
        sender: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
        receiver: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
        pickupAddress: { type: String, required: true },
        deliveryAddress: { type: String, required: true },
        status: {
            type: String,
            enum: Object.values(ParcelStatus),
            default: ParcelStatus.REQUESTED,
        },
        trackingEvents: [trackingEventSchema],
        fee: Number,
        estimatedDeliveryDate: Date,
    },
    {
        timestamps: true,
        versionKey: false
    }
);

export const Parcel = mongoose.model<IParcel>("Parcel", parcelSchema);