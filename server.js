import express from "express";
import db from "./db.js";
import bodyParser from "body-parser";
import dotenv from "dotenv";

const app = express();

dotenv.config({
  path: "./.env",
});

app.use(bodyParser.json());
const PORT = process.env.PORT || 3000;

app.get("/", function (req, res) {
  res.send("Hey this is the world of Akash");
});

import personRoutes from "./routes/personRoutes.js";
import menuItemRoutes from "./routes/menuItemRoutes.js";

//Routes
app.use("/person", personRoutes);
app.use("/menu", menuItemRoutes);

app.listen(PORT, () => console.log(`Server listening on Port ${PORT}`));
