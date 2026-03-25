const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");

const connectDB = require("./config/db");

// Import Routes
const authRoutes = require("./routes/authRoutes");
const buildingRoutes = require("./routes/buildingRoutes");
const questionRoutes = require("./routes/questionRoutes");
const responseRoutes = require("./routes/responseRoutes");
const riskRoutes = require("./routes/riskRoutes");
const recommendationRoutes = require("./routes/recommendationRoutes");
const alertRoutes = require("./routes/alertRoutes");
const safePlaceRoutes = require("./routes/safePlaceRoutes");
const buildingTypeRoutes = require("./routes/buildingTypeRoutes");

dotenv.config();

const app = express();

// Connect MongoDB
connectDB();

// Middlewares
app.use(cors());
app.use(express.json());

// Request logger
app.use((req, res, next) => {
  console.log(req.method, req.url);
  next();
});

// API Routes
app.use("/api/auth", authRoutes);
app.use("/api/buildings", buildingRoutes);
app.use("/api/building-types", buildingTypeRoutes);
app.use("/api/questions", questionRoutes);
app.use("/api/responses", responseRoutes);
app.use("/api/risk", riskRoutes);
app.use("/api/recommendations", recommendationRoutes);
app.use("/api/alerts", alertRoutes);
app.use("/api/safeplaces", safePlaceRoutes);

// Root
app.get("/", (req, res) => {
  res.send("ResQGuide API Running");
});

// Start Server
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
