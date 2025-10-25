import { z } from "zod";

export const createParcelZodSchema = z.object({
    receiver: z.string().min(1, "Receiver ID is required"),
    pickupAddress: z.string().min(1, "Pickup address is required"),
    deliveryAddress: z.string().min(1, "Delivery address is required"),
});
