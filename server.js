import express from "express";
import db from "./db.js";
import dotenv from "dotenv";
import passport from "./auth.js"; // Import passport (default export)
import bodyParser from "body-parser";
import personRoutes from "./routes/personRoutes.js";
import menuItemRoutes from "./routes/menuItemRoutes.js";

const app = express();

dotenv.config({ path: "./.env" });

app.use(bodyParser.json()); // Use Express' built-in json parser
const PORT = process.env.PORT || 3000;

// Middleware Function
const logRequest = (req, res, next) => {
  console.log(`[${new Date().toLocaleString()}] Request Made to : ${req.originalUrl}`);
  next();
};

app.use(logRequest);

// Initialize passport middleware
app.use(passport.initialize());
const localAuthMiddleware = passport.authenticate('local', { session: false });

app.get("/", localAuthMiddleware, function (req, res) {
  res.send("Hey this is the world of Akash");
});

// Routes
app.use("/person",localAuthMiddleware, personRoutes);
app.use("/menu", menuItemRoutes);

app.listen(PORT, () => console.log(`Server listening on Port ${PORT}`));
