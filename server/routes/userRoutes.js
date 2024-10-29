const express = require("express");
const {
  registerUserController,
  loginUserController,
  updateUserController,
  requireSignin,
  deleteUserController,
  getUserController,
  getSingleUserController,
} = require("../controllers/userControllers");

const router = express.Router();

router.post("/register", registerUserController);

router.post("/login", loginUserController);

router.put("/update-user", requireSignin, updateUserController);

router.delete("/delete-user/:id", requireSignin, deleteUserController);

router.get("/get-user", getUserController);

router.get("/get-single-user", requireSignin, getSingleUserController);

module.exports = router;
