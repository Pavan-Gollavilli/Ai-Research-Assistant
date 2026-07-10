const dotenv = require("dotenv");
dotenv.config();

const express = require("express");
const cors = require("cors");

const connectDB = require("./config/db");

const authRoutes = require("./routes/authRoutes");
const researchRoutes = require("./routes/researchRoutes");
const {
  notFound,
  errorHandler,
} = require("./middleware/errorHandler");

const app = express();

connectDB();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.json({
    success: true,
    message: "AI Research Assistant API",
  });
});

app.get("/health", (req, res) => {
  res.json({
    success: true,
    status: "OK",
  });
});

app.use("/api/auth", authRoutes);
app.use("/api/research", researchRoutes);

app.use(notFound);
app.use(errorHandler);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});