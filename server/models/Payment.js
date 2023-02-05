import mongoose from "mongoose";

const paymentSchema = new mongoose.Schema({
  userId: String,
  amount: Number,
  token: Object,
  client_ip: String,
  created: Number,
  email: String,
  livemode: Boolean,
  type: String,
  used: Boolean,
});

export const Payment = mongoose.model("Payment", paymentSchema);
