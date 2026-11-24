import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import compression from "compression";

import connectDB from "./config/database.js";
import locationRoutes from "./routes/locationRoutes.js";
import { resolveLink } from "./controllers/linkController.js";
import errorHandler from "./middleware/errorHandler.js";

dotenv.config();

const app = express();

app.use(compression());
app.use(cors({ origin: process.env.CLIENT_URL ? process.env.CLIENT_URL.split(",") : true }));
app.use(express.json({ limit: "10kb" }));

app.get("/api", (req, res) => res.json({ success: true, message: "CleanUp API is running" }));
app.get("/api/resolve", resolveLink);
app.use("/api/locations", locationRoutes);
app.use(errorHandler);

const PORT = process.env.PORT || 5000;
connectDB().then(() => app.listen(PORT, () => console.log(`Server running on port ${PORT}`)));