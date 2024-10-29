const express = require("express");
const { registerRestaurantController, getAllRestaurantController, getSingleRestaurantController, deleteRestaurantController } = require("../controllers/restaurantController");
const { requireSignin } = require("../controllers/userControllers");

const router = express.Router();

router.post("/create", requireSignin, registerRestaurantController)

router.get("/getAll", getAllRestaurantController)

router.get("/get/:id", getSingleRestaurantController)

router.delete("/delete/:id", deleteRestaurantController)

module.exports = router;
