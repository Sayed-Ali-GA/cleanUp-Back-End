import mongoose from "mongoose";

const locationSchema = new mongoose.Schema(
  {
    title: { type: String, required: [true, "Location title is required"], trim: true, maxlength: [100, "Title cannot exceed 100 characters"] },
    description: { type: String, trim: true, default: "", maxlength: [500, "Description cannot exceed 500 characters"] },
    // Same bounds as the frontend (southern Bahrain / Hawar were being rejected before)
    latitude: { type: Number, required: [true, "Latitude is required"], min: 25.5, max: 26.45 },
    longitude: { type: Number, required: [true, "Longitude is required"], min: 50.2, max: 50.9 },
  },
  { timestamps: true }
);

locationSchema.index({ createdAt: -1 });

export default mongoose.model("Location", locationSchema);