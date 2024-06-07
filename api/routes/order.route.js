import express from "express";
import {verifyToken} from "../middleware/jwt.js"
import {countOrders,createOrder, getOrders, intent,confirm,toggleFinishOrder,getOrdersByMonth, getTotalPricesByMonth, getTotalCount, getTotalEarningsLast7DaysAndToday, getOrdersByBuyerAndService   } from "../controllers/order.controller.js";

const router = express.Router();

router.get("/", verifyToken, getOrders);

router.get('/getTotalEarningsLast7DaysAndToday',verifyToken, getTotalEarningsLast7DaysAndToday ); 
getOrdersByBuyerAndService
router.post("/:serviceId", verifyToken, createOrder);
router.get("/countOrders" ,countOrders);
router.post("/create-payment-intent/:id", verifyToken, intent);
router.put("/", verifyToken, confirm);
router.put('/:id/toggle-finish',verifyToken, toggleFinishOrder);
router.get('/getOrdersByMonth',verifyToken, getOrdersByMonth);
router.get('/getTotalPricesByMonth',verifyToken, getTotalPricesByMonth);
router.get('/totalCount',verifyToken, getTotalCount);
router.get('/:buyerId/:serviceId',verifyToken, getOrdersByBuyerAndService);


export default router;