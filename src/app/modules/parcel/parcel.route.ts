import { Router } from "express";
import { validateRequest } from "../../middlewares/validateRequest";
import { createParcelZodSchema } from "./parcel.validation";
import { ParcelController } from "./parcel.controller";
import { checkAuth } from "../../middlewares/checkAuth";
import { Role } from "../user/user.interface";

const router = Router();

// sender routes
router.post("/", checkAuth(Role.SENDER), validateRequest(createParcelZodSchema), ParcelController.createParcel);

router.patch("/:id/cancel", checkAuth(Role.SENDER, Role.ADMIN), ParcelController.cancelParcel);

router.get("/me", checkAuth(Role.SENDER, Role.RECEIVER), ParcelController.getMyParcels);


// receiver routes
router.get("/history", checkAuth(Role.RECEIVER), ParcelController.getDeliveryHistory);

router.patch("/:id/confirm", checkAuth(Role.RECEIVER, Role.ADMIN), ParcelController.confirmParcelDelivery);

router.patch("/:id/accept", checkAuth(Role.RECEIVER), ParcelController.acceptParcelRequest
);

router.patch("/:id/reject", checkAuth(Role.RECEIVER), ParcelController.rejectParcelRequest
);

router.get("/incoming", checkAuth(Role.RECEIVER), ParcelController.getIncomingParcels);
router.get("/requests", checkAuth(Role.RECEIVER), ParcelController.getReceiverRequestedParcels);

// admin routes
router.get("/", checkAuth(Role.ADMIN), ParcelController.getAllParcels);

router.patch("/:id/status", checkAuth(Role.ADMIN), ParcelController.updateParcelStatus);

// all user routes
router.get("/:id/status-log", checkAuth(Role.SENDER, Role.RECEIVER, Role.ADMIN), ParcelController.getParcelStatusLog);

// public routes
router.get("/track/:trackingId", ParcelController.trackParcelByTrackingId);





export const ParcelRoutes = router;