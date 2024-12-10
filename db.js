import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config({
  path: "./.env",
});

const mongoURL = process.env.DB_URL;

mongoose.connect(mongoURL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;

db.on("connected", () => {
  console.log("Connected to MongoDB Server");
});

db.on("error", (err) => {
  console.log("MongoDB Connection Error =", err);
});

db.on("disconnected", () => {
  console.log("MongoDB disconnected");
});

export default db;
