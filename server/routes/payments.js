import express from "express";
import { getPayments } from "../controllers/payments.js";
import { createPayment } from "../controllers/payments.js";

const router = express.Router();

router.get("/", getPayments);
router.post("/", createPayment);

export default router;
