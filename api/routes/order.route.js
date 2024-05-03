import express from "express";
import {verifyToken} from "../middleware/jwt.js"
import {createOrder, getOrders, intent,confirm,toggleFinishOrder } from "../controllers/order.controller.js";

const router = express.Router();

 router.post("/:serviceId", verifyToken, createOrder);
router.get("/", verifyToken, getOrders);
router.post("/create-payment-intent/:id", verifyToken, intent);
router.put("/", verifyToken, confirm);
router.put('/:id/toggle-finish',verifyToken, toggleFinishOrder);

export default router;