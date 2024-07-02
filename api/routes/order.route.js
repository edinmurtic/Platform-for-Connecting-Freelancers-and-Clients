import express from "express";
import {verifyToken} from "../middleware/jwt.js"
import {adminOrders, getApprovedOrders,countOrders,createOrder, getOrders,countUnprocessedOrders, intent,confirm,toggleFinishOrder,getOrdersByMonth, getTotalPricesByMonth, getTotalCount, getTotalEarningsLast7DaysAndToday, getOrdersByBuyerAndService, handleStateOrder    } from "../controllers/order.controller.js";

const router = express.Router();

router.get("/", verifyToken, getOrders);
router.get("/adminOrders", verifyToken, adminOrders);

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
router.put("/handle-state-order", verifyToken, handleStateOrder); 
router.get("/count-unprocessed", verifyToken, countUnprocessedOrders);
router.get("/approved-orders", verifyToken, getApprovedOrders); 


export default router;