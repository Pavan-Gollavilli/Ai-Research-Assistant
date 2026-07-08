const dns = require("dns");
dns.setServers(["8.8.8.8", "8.8.4.4"]);

require("dotenv").config();
const mongoose = require("mongoose");

(async () => {
  try {
    console.log("Using DNS:", dns.getServers());
    console.log("Connecting...");

    const conn = await mongoose.connect(process.env.MONGODB_URI, {
      dbName: process.env.DB_NAME,
    });

    console.log("✅ Connected");
    console.log(conn.connection.host);
    process.exit(0);
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
})();