import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";

import authRoutes from "./routes/auth.route";

import { connectToDB } from "./lib/db.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json({ limit: "5mb" })); // parse JSON request bodies
app.use(cookieParser());

app.use("/api/v1/auth", authRoutes);

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
    connectToDB();
})