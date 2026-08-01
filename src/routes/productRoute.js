import { Router } from "express";
import { createProdct } from "../controllers/productController.js";
import { authMiddleware, checkRole } from "../middlewares/authMIddleware.js";

const route = Router();

route.post(
  "/create",
  authMiddleware,
  checkRole("BUYER", "SELLER", "ADMIN"),
  createProdct,
);

export default route;
