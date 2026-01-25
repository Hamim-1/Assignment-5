import mongoose from "mongoose";
import AppError from "../../errorHelpers/AppError";
import { Role, Status } from "../user/user.interface";
import { User } from "../user/user.model"
import { IParcel, ITrackingEvent, ParcelStatus } from "./parcel.interface"
import { Parcel } from "./parcel.model";

const createParcel = async (payload: Partial<IParcel>, senderId: string) => {

    const sender = await User.findOne({ _id: senderId });
    const receiver = await User.findOne({ _id: payload.receiver });

    if (!sender) {
        throw new AppError(404, "Sender not found");
    }
    if (!receiver || receiver.role !== Role.RECEIVER) {
        throw new AppError(400, "Invalid Receiver")
    }
    if (receiver.status !== Status.ACTIVE) {
        throw new AppError(400, "Receiver is Blocked")
    }

    let trackingId = '';
    let exists = true;

    while (exists) {
        const datePart = new Date().toISOString().slice(0, 10).replace(/-/g, '');
        const randomPart = Math.floor(100000 + Math.random() * 900000).toString();
        trackingId = `TRK-${datePart}-${randomPart}`;

        const parcel = await Parcel.findOne({ trackingId });
        exists = !!parcel;
    }
    const parcel = await Parcel.create({
        ...payload,
        trackingId,
        sender: sender._id,
        status: ParcelStatus.REQUESTED
    })
    return parcel;

}
const getMyParcels = async (userId: string, role: string) => {

    if (role === "SENDER") {

        return await Parcel.find({ sender: userId });
    } else {
        return await Parcel.find({ receiver: userId });

    }

}
const getAllParcels = async (query: any) => {
    const filter: any = {};

    if (query.status) {
        filter.status = query.status;
    }
    if (query.status) {
        filter.status = {
            $ne: "REQUESTED",
            $eq: query.status
        };
    } else {
        filter.status = { $ne: "REQUESTED" };
    }

    if (query.sender) {
        filter.sender = query.sender;
    }

    if (query.receiver) {
        filter.receiver = query.receiver;
    }
    const parcels = await Parcel.find(filter);

    return parcels;
}

const updateParcelStatus = async (parcelId: string, status: ParcelStatus, adminId: mongoose.Types.ObjectId) => {

    const parcel = await Parcel.findOne({ _id: parcelId });

    if (!parcel) {
        throw new AppError(404, "Parcel  not found");
    }
    const payload = {
        status,
        $push: {
            trackingEvents: {
                status,
                timestamp: new Date(),
                updatedBy: adminId,
                note: `Status updated to ${status}`,
            }
        }
    }

    const updatedParcel = await Parcel.findByIdAndUpdate(parcelId, payload, {
        new: true, runValidators: true
    })


    return updatedParcel;
}

const getIncomingParcels = async (userId: string) => {
    const parcels = await Parcel.find({
        receiver: userId,
        status: {
            $in: [
                ParcelStatus.ACCEPTED,
                ParcelStatus.PICKED,
                ParcelStatus.IN_TRANSIT
            ]
        },
    });


    return parcels;
}

const cancelParcel = async (parcelId: string, userId: string, userRole: string) => {
    const parcel = await Parcel.findOne({ _id: parcelId });
    if (!parcel) throw new AppError(404, "Parcel not found")

    if (userRole !== Role.ADMIN && parcel?.sender.toString() !== userId) {
        throw new AppError(403, "You can cancel only your parcels");
    }

    if (userRole !== Role.ADMIN && parcel.status !== ParcelStatus.REQUESTED) {
        throw new AppError(400, "Parcel cannot be canceled at this stage")
    }
    const payload = {
        status: ParcelStatus.CANCELED,
        $push: {
            trackingEvents: {
                status: ParcelStatus.CANCELED,
                timestamp: new Date(),
                updatedBy: userId,
                note: "Parcel canceled by sender",
            }
        }
    }
    const canceledParcel = await Parcel.findByIdAndUpdate(parcelId, payload,);

    return canceledParcel;
}

const confirmParcelDelivery = async (parcelId: string, userId: string, userRole: string) => {
    const parcel = await Parcel.findOne({ _id: parcelId });
    if (!parcel) throw new AppError(404, "Parcel not found")



    if (userRole !== Role.ADMIN && parcel?.receiver.toString() !== userId) {
        throw new AppError(403, "You can only confirm your own parcels");
    }

    if (userRole !== Role.ADMIN && parcel.status !== ParcelStatus.IN_TRANSIT) {
        throw new AppError(400, "Parcel is not in transit yet")
    }
    const payload = {
        status: ParcelStatus.DELIVERED,
        $push: {
            trackingEvents: {
                status: ParcelStatus.DELIVERED,
                timestamp: new Date(),
                updatedBy: userId,
                note: "Parcel delivery confirmed by receiver",
            }
        }
    }
    const deliveredParcel = await Parcel.findByIdAndUpdate(parcelId, payload, { new: true, runValidators: true });

    return deliveredParcel;
}

const trackParcelByTrackingId = async (trackingId: string) => {
    const parcel = await Parcel.findOne({ trackingId }).select("-_id")
        .populate("sender", "name email -_id")
        .populate("receiver", "name email -_id")
        .lean();

    if (!parcel) {
        throw new AppError(404, "Parcel not found with this tracking ID");
    }


    if (parcel.trackingEvents) {
        parcel.trackingEvents = parcel.trackingEvents.map(({ _id, updatedBy, ...rest }) => rest as ITrackingEvent);
    }

    return parcel;
};

const getDeliveryHistory = async (userId: string) => {
    return await Parcel.find({ receiver: userId, status: "DELIVERED" });
};

const getParcelStatusLog = async (userId: string, parcelId: string) => {
    const parcel = await Parcel.findOne({ _id: parcelId }).populate("trackingEvents.updatedBy", "name email -_id")

    if (!parcel) {
        throw new AppError(404, "Parcel not found");
    }

    if (parcel.sender.toString() !== userId && parcel.receiver.toString() !== userId) {
        throw new AppError(403, "You can only view your own parcel status");
    }

    return parcel.trackingEvents;
};

const getReceiverRequestedParcels = async (userId: string) => {
    const parcels = await Parcel.find({ receiver: userId, status: ParcelStatus.REQUESTED });

    if (!parcels) {
        throw new AppError(404, "Parcel not found");
    }


    return parcels;
};

const acceptParcelRequest = async (userId: string, parcelId: string) => {
    const parcel = await Parcel.findOne({ receiver: userId, _id: parcelId });

    if (!parcel) {
        throw new AppError(404, "Parcel not found");
    }

    parcel.status = ParcelStatus.ACCEPTED;
    parcel.save();
    return parcel;
};

const rejectParcelRequest = async (userId: string, parcelId: string) => {
    const parcel = await Parcel.findOne({ receiver: userId, _id: parcelId });

    if (!parcel) {
        throw new AppError(404, "Parcel not found");
    }

    parcel.status = ParcelStatus.REJECTED;
    parcel.save();
    return parcel;
};



export const ParcelService = {
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
    acceptParcelRequest,
    rejectParcelRequest

}