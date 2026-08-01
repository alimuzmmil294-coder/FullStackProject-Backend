import { Router } from "express";
import { Login, logout, signUp } from "../controllers/authController.js";

const route = Router();

route.post("/signUp", signUp);
route.post("/login", Login);
route.post("/logout", logout);

export default route;
