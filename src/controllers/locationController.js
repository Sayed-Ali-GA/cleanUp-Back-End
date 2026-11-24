
import Location from "../models/Location.js";

// GET all locations
export const getLocations = async (req, res, next) => {
  try {
    const locations = await Location.find()
      .sort({ createdAt: -1 })
      .lean();

    res.status(200).json({
      success: true,
      count: locations.length,
      data: locations,
    });
  } catch (error) {
    next(error);
  }
};

// GET one location
export const getLocation = async (req, res, next) => {
  try {
    const location = await Location.findById(req.params.id).lean();

    if (!location) {
      return res.status(404).json({
        success: false,
        message: "Location not found",
      });
    }

    res.status(200).json({
      success: true,
      data: location,
    });
  } catch (error) {
    next(error);
  }
};

// CREATE location
export const createLocation = async (req, res, next) => {
  try {
    const { title, description, latitude, longitude } = req.body;

    const location = await Location.create({
      title,
      description,
      latitude,
      longitude,
    });

    res.status(201).json({
      success: true,
      message: "Location created successfully",
      data: location,
    });
  } catch (error) {
    next(error);
  }
};

// UPDATE location
export const updateLocation = async (req, res, next) => {
  try {
    const { title, description, latitude, longitude } = req.body;

    const location = await Location.findByIdAndUpdate(
      req.params.id,
      {
        title,
        description,
        latitude,
        longitude,
      },
      {
        new: true,
        runValidators: true,
      }
    ).lean();

    if (!location) {
      return res.status(404).json({
        success: false,
        message: "Location not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Location updated successfully",
      data: location,
    });
  } catch (error) {
    next(error);
  }
};

// DELETE location
export const deleteLocation = async (req, res, next) => {
  try {
    const location = await Location.findByIdAndDelete(req.params.id);

    if (!location) {
      return res.status(404).json({
        success: false,
        message: "Location not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Location deleted successfully",
    });
  } catch (error) {
    next(error);
  }
};
