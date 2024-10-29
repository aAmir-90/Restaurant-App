const { hashPassword, comparePassword } = require("../helpers/authHelpers");
const User = require("../models/userModel");
const JWT = require("jsonwebtoken");
var { expressjwt: jwt } = require("express-jwt");

// verify token function
const requireSignin = jwt({
  secret: process.env.JWT_SECRET,
  algorithms: ["HS256"],
});

const registerUserController = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    if (!name) {
      return res.status(500).json({
        success: false,
        message: "Name is require",
      });
    }
    if (!email) {
      return res.status(500).json({
        success: false,
        message: "Email is require",
      });
    }
    if (!password) {
      return res.status(500).json({
        success: false,
        message: "Password is require & 6 characters long",
      });
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(409).json({
        success: false,
        message: "User Already exists",
      });
    }

    const hashedPassword = await hashPassword(password);

    const user = await User({ name, email, password: hashedPassword }).save();

    res.status(200).json({
      success: true,
      message: "User Register successfully Please login",
      user,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Register API error",
      error,
    });
  }
};

const loginUserController = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(500).json({
        success: false,
        message: "Please provide email or password",
      });
    }
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({
        success: falase,
        message: "User not found",
      });
    }
    const match = await comparePassword(password, user.password);
    if (!match) {
      return res.status(500).json({
        success: false,
        message: "Invalid email or password",
      });
    }
    const token = JWT.sign({ _id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });
    user.password = undefined;
    res.status(200).json({
      success: true,
      message: "User Login Successfully",
      token,
      user,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Login API error",
      error,
    });
  }
};

const updateUserController = async (req, res) => {
  try {
    const { name, password, email } = req.body;
    const user = await User.findOne({ email });
    if (password && password.length < 6) {
      return res.status(500).json({
        success: false,
        message: "Password is require and should be more than 6 characters ",
      });
    }

    const hashedPassword = password ? await hashPassword(password) : undefined;

    const updatedUser = await User.findOneAndUpdate(
      { email },
      {
        name: name || user.name,
        password: hashedPassword || user.password,
      },
      { new: true }
    );
    res.status(200).json({
      success: true,
      message: "User Updated Successfully, Please Login",
      updatedUser,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Update User API error",
      error,
    });
  }
};

const getUserController = async (req, res) => {
  try {
    const user = await User.find();
    if (!user) {
      return res.status(401).json({
        success: false,
        message: "User not found",
      });
    }
    res.status(200).json({
      success: true,
      message: "User Get successfully",
      totalUser: user.length,
      user,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Get User API error",
      error,
    });
  }
};

const getSingleUserController = async (req, res) => {
  try {
    const { email } = req.body;
    if (!email) {
      return res.status(500).json({
        success: false,
        message: "Please Provide Email",
      });
    }
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({
        success: false,
        message: "User not found",
      });
    }
    res.status(200).json({
      success: true,
      message: "Single User Get Successfully",
      user,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Get Single User API error",
      error,
    });
  }
};

const deleteUserController = async (req, res) => {
  console.log(req, res, "in node");
  try {
    const { id } = req.params;
    const deletedUser = await User.findByIdAndDelete({ _id: id });
    if (!deletedUser) {
      return res.status(404).json({
        success: false,
        message: "User already deleted",
      });
    }
    return res.status(200).json({
      success: true,
      message: "User Deleted successfully",
      deletedUser,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Delete User API error",
      error,
    });
  }
};

module.exports = {
  registerUserController,
  loginUserController,
  updateUserController,
  requireSignin,
  deleteUserController,
  getUserController,
  getSingleUserController,
};
