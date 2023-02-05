import Stripe from "stripe";
import dotenv from "dotenv";
import { Payment } from "../models/Payment.js";

dotenv.config();
const stripe = new Stripe(process.env.STRIPE_KEY);

export const createPayment = async (req, res) => {
  try {
    const { token, amount } = req.body;
    //here we can attach the userId by req.user.id
    await stripe.charges.create({
      amount: amount,
      currency: "usd",
      source: token.id,
    });
    await Payment.create(req.body);
    return res.status(201).json({ msg: "Created" });
  } catch (err) {
    return res.status(500).json(err);
  }
};

export const getPayments = async (req, res) => {
  try {
    const payments = await Payment.find({});
    return res.status(200).json(payments);
  } catch (err) {
    return res.status(500).json(err);
  }
};
