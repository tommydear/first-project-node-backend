import dns from "node:dns";
dns.setServers(["8.8.8.8", "1.1.1.1"]);

import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

console.log("Attempting to connect to:", process.env.MONGODB_URI_2);

mongoose.connect(process.env.MONGODB_URI_2)
  .then(() => {
    console.log("Success: Database connected successfully!");
    process.exit(0);
  })
  .catch((error) => {
    console.error("Failed to connect:", error);
    process.exit(1);
  });
