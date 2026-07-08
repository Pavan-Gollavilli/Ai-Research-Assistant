const mongoose = require("mongoose");
const dns = require("dns");

// Force Google DNS
dns.setServers(["8.8.8.8", "8.8.4.4"]);

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGODB_URI, {
      dbName: process.env.DB_NAME,
    });

    console.log("==================================");
    console.log("✅ MongoDB Connected Successfully");
    console.log(`📂 Database : ${conn.connection.name}`);
    console.log(`🌐 Host     : ${conn.connection.host}`);
    console.log("==================================");
  } catch (error) {
    console.error("==================================");
    console.error("❌ MongoDB Connection Failed");
    console.error(error);
    console.log("==================================");

    process.exit(1);
  }
};

module.exports = connectDB;