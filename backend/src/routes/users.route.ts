import { Router } from "express";
import verifyToken from "../middleware/verifyToken";
import { getAllUsers, login, register } from "../controllers/users.controller";
import {
  loginValidationSchema,
  registerValidationSchema,
} from "../middleware/validationSchema";

const router = Router();

router.get(verifyToken, getAllUsers);

router.post("/register", registerValidationSchema(), register);

router.post("/login", loginValidationSchema(), login);

export default router;
