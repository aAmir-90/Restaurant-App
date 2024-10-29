const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const dotenv = require("dotenv");
const connectDB = require("./config/db");

dotenv.config();

connectDB();

const app = express();

const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());
app.use(morgan("dev"));

app.use("/api/v1/auth", require("./routes/userRoutes"));
app.use("/api/v1/restaurant", require("./routes/restaurantRoutes"))

app.listen(PORT, () => {
  console.log(`Server is running on https://localhost:${PORT}`);
});
