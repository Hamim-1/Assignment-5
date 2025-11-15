import { Request, Response, Router } from "express";
import { validateRequest } from './../../middlewares/validateRequest';
import { createUserZodSchema } from "./user.validation";
import { UserController } from "./user.controller";
import { checkAuth } from "../../middlewares/checkAuth";
import { Role } from "./user.interface";

const router = Router();
router.get("/", checkAuth(Role.ADMIN), UserController.getAllUsers);
router.post("/register", validateRequest(createUserZodSchema), UserController.createUser);

router.patch("/:id/status", checkAuth(Role.ADMIN), UserController.updateUserStatus)


export const userRoutes = router;