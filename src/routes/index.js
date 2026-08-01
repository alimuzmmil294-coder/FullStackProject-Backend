import { Router } from "express";
import authRoute from './authRoute.js'
import productRoute from './productRoute.js'

const allRoutes = Router();

allRoutes.use("/auth", authRoute)
allRoutes.use("/product", productRoute)

export default allRoutes;