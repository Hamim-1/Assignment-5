import { Router } from "express";
import { userRoutes } from "../modules/user/user.route";
import { AuthRoutes } from "../modules/auth/auth.route";
import { ParcelRoutes } from "../modules/parcel/parcel.route";

export const router = Router();
const moduleRoutes = [
    {
        path: "/users",
        route: userRoutes
    },
    {
        path: "/auth",
        route: AuthRoutes
    },
    {
        path: "/parcels",
        route: ParcelRoutes
    },
]

moduleRoutes.forEach(route => {
    router.use(route.path, route.route);
})