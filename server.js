import express from "express";
import db from "./db.js";
import bodyParser from "body-parser";

const app = express();                                                                                                                   

app.use(bodyParser.json());

app.get("/", function (req, res) {
  res.send("Hey this is the world of Akash");
});


import personRoutes from "./routes/personRoutes.js";
import menuItemRoutes from "./routes/menuItemRoutes.js"

//Routes
app.use("/person",personRoutes )
app.use("/menu", menuItemRoutes)


app.listen(3000, () => console.log("Server listening on Port 3000"));
