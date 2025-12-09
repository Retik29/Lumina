const express = require("express");
const cors = require("cors");
require("dotenv").config();
const connectDB = require("./config/db");

const app = express();

// middleware
app.use(cors());
app.use(express.json());

// connect db
connectDB();

// routes
app.get("/", (req, res) => res.send("API is running..."));
app.use("/api/auth", require("./routes/authRoutes"));
app.use("/api/appointment", require("./routes/appointmentRoutes"));
app.use("/api/admin", require("./routes/adminRoutes"));
app.use("/api/chatbot", require("./routes/chatbotRoutes"));

app.listen(5000, () => console.log("Server running on port 5000"));
