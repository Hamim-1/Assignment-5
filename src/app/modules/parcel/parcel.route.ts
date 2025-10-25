import { Router } from "express";
import { validateRequest } from "../../middlewares/validateRequest";
import { createParcelZodSchema } from "./parcel.validation";
import { ParcelController } from "./parcel.controller";
import { checkAuth } from "../../middlewares/checkAuth";
import { Role } from "../user/user.interface";

const router = Router();

router.get("/:id/status-log", checkAuth(Role.SENDER, Role.RECEIVER, Role.ADMIN), ParcelController.getParcelStatusLog);

router.get("/history", checkAuth(Role.RECEIVER), ParcelController.getDeliveryHistory);

router.get("/track/:trackingId", ParcelController.trackParcelByTrackingId);

router.get("/", checkAuth(Role.ADMIN), ParcelController.getAllParcels);

router.patch("/:id/status", checkAuth(Role.ADMIN), ParcelController.updateParcelStatus);

router.patch("/:id/cancel", checkAuth(Role.SENDER, Role.ADMIN), ParcelController.cancelParcel);

router.patch("/:id/confirm", checkAuth(Role.RECEIVER, Role.ADMIN), ParcelController.confirmParcelDelivery);

router.get("/me", checkAuth(Role.SENDER), ParcelController.getMyParcels);

router.get("/incoming", checkAuth(Role.RECEIVER), ParcelController.getIncomingParcels);

router.post("/", checkAuth(Role.SENDER), validateRequest(createParcelZodSchema), ParcelController.createParcel);

export const ParcelRoutes = router;