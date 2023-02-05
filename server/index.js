import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import paymentsRoute from "./routes/payments.js";
import mongoose from "mongoose";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 8000;

app.use(express.json());
app.use(cors());

app.get("/", (req, res) => {
  return res.status(200).json({ msg: "Hello world!" });
});

app.use("/api/payments", paymentsRoute);

app.use((req, res, next) => {
  return res.status(404).json({ err: "Page not found!" });
});

const connectDB = async () => {
  mongoose.set("strictQuery", false);
  await mongoose.connect(process.env.MONGO_URI);
};
connectDB();

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}...`);
});
