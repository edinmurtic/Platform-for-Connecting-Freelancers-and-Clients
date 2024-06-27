import express from 'express';
import { verifyToken } from "../middleware/jwt.js";

import {
    createReview,
    getReviews,
    deleteReview,
    getUserReviews,
  } from "../controllers/review.controller.js";
const router = express.Router();
router.post("/", verifyToken, createReview )
router.get("/:serviceId", getReviews )
router.get("/:serviceId/:userId", getUserReviews )

router.delete("/:id", deleteReview)
export default router;
