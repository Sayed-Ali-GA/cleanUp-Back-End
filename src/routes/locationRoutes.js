
import express from "express";

import {
  getLocations,
  getLocation,
  createLocation,
  updateLocation,
  deleteLocation,
} from "../controllers/locationController.js";

const router = express.Router();

// GET all locations
router.get("/", getLocations);

// GET one location
router.get("/:id", getLocation);

// CREATE location
router.post("/", createLocation);

// UPDATE location
router.put("/:id", updateLocation);

// DELETE location
router.delete("/:id", deleteLocation);

export default router;
