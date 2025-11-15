import { Request, Response, Router } from "express";
import { authController } from "./auth.controller";

const router = Router();

router.get("/me", authController.getMe);

router.post("/login", authController.credentialsLogin);

router.post("/refresh-token", authController.getNewAccessToken);

router.post("/logout", authController.logout);

export const AuthRoutes = router;