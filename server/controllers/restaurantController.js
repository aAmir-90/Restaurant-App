const Restaurant = require("../models/restaurantModel");

const registerRestaurantController = async (req, res) => {
  try {
    const {
      title,
      imageUrl,
      foods,
      pickup,
      delivery,
      isOpen,
      rating,
      ratingCount,
      address,
      orderBy,
    } = req.body;
    if (!title) {
      return res.status(309).json({
        success: false,
        message: "Provide restaurant title",
      });
    }
    const restaurant = new Restaurant({
      title,
      imageUrl,
      foods,
      pickup,
      delivery,
      isOpen,
      rating,
      ratingCount,
      address,
      orderBy,
    });

    await restaurant.save();
    res.status(200).json({
      success: true,
      message: "Restaurant created successfully",
      restaurant,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error in Register Restaurant API",
    });
  }
};

const getAllRestaurantController = async (req, res) => {
  try {
    const restaurants = await Restaurant.find({});
    if (!restaurants) {
      return res.status(404).json({
        success: false,
        message: "Restaurant not found",
      });
    }
    res.status(200).json({
      success: true,
      message: "Get all restaurants successfully",
      totalRestaurant: restaurants.length,
      restaurant: restaurants,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error in Get All Restaurant API",
    });
  }
};

const getSingleRestaurantController = async (req, res) => {
  try {
    const restaurantId = req.params.id;
    if (!restaurantId) {
      return res.status(500).json({
        success: false,
        message: "Restaurant Id or credentials missing",
      });
    }
    const restaurant = await Restaurant.findById(restaurantId);
    if (!restaurant) {
      return res.status({
        success: false,
        message: "Restaurant not found",
      });
    }
    res.status(200).json({
      success: true,
      message: "Getting restaurant by single successfully",
      restaurant,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error in Get Single Restaurant API",
    });
  }
};

const deleteRestaurantController = async (req, res) => {
  try {
    const restaurantId = req.params.id;
    if (!restaurantId) {
      return res.status(500).json({
        success: false,
        message: "Please provide all credentials",
      });
    }
    const restaurant = await Restaurant.findByIdAndDelete(restaurantId);
    if (!restaurant) {
      return res.status(404).json({
        success: false,
        message: "restaurant not found",
      });
    }
    res.status(200).json({
      success: true,
      message: "Restaurant deleted successfully",
      restaurant,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error in deleting Restaurant API",
    });
  }
};

module.exports = {
  registerRestaurantController,
  getAllRestaurantController,
  getSingleRestaurantController,
  deleteRestaurantController,
};
