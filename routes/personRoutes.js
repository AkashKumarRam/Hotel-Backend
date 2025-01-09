import express from "express";
import { Person } from "../models/Person.js";
import { jwtAuthMiddleware, generateToke } from "../jwt.js";

const router = express.Router();

// POST Method to Save a Person Data
router.post("/signup", async (req, res) => {
  try {
    const data = req.body;

    const newPerson = new Person(data);

    const response = await newPerson.save();

    console.log("Data saved successfully");

    const payload = {
      id: response.id,
      username: response.username,
    };

    const token = generateToke(payload);
    res.status(200).json({ response: response, token: token });
  } catch (error) {
    console.log("Error while Saving Person =", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// Login Route
router.post("/login", async (req, res) => {
  try {
    // Extract the username and Password from request body
    const { username, password } = req.body;

    const user = await Person.findOne({ username: username });

    // If user dostnot exits or password dosesnot match
    if (!user || !(await user.comparePassword(password))) {
      return res.status(401).json({ error: "Invalid username or Password" });
    }

    // Generate token
    const payload = {
      id: user.id,
      username: user.username,
    };

    const token = generateToke(payload);

    res.json({ token });
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// Profile Route
router.get("/profile", jwtAuthMiddleware, async (req, res) => {
  try {
    const userData = req.user;

    const userID = userData.id;
    const user = await Person.findById(userID);
    res.status(200).json({ user });
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// GET Method to get the Person
router.get("/", jwtAuthMiddleware, async (req, res) => {
  try {
    const data = await Person.find();
    console.log("Person Data Fetched Successfully");
    res.status(200).json(data);
  } catch (error) {
    console.log("Error while Data Fetched =", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// GET Person Details using your WorkType
router.get("/:WorkType", async (req, res) => {
  try {
    const WorkType = req.params.WorkType;
    if (WorkType == "chef" || WorkType == "waiter" || WorkType == "manager") {
      const response = await Person.find({ work: WorkType });
      console.log("Person Find Successfully by his Position");
      res.status(200).json(response);
    }
  } catch (error) {
    console.log("Not Getting Person Details by his Work =", error);
    res.status(404).json({ message: "Person is Not Found" });
  }
});

// Update the Person Data
router.put("/:id", async (req, res) => {
  try {
    const personID = req.params.id;
    const updatedPersonData = req.body; // Ekhane client theke person er updated data asbe

    const response = await Person.findByIdAndUpdate(
      personID,
      updatedPersonData,
      {
        new: true, // Return the Updated Document
        runValidators: true, // Run Mongoose Validation
      }
    );

    if (!response) {
      return res.status(404).json({ message: "Person not found" });
    }

    console.log("Person Data Updated Successfully");
    res.status(200).json(response);
  } catch (error) {
    console.log("Error Occured while Updating Person Data =", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

// Delete a Peraon Data
router.delete("/:id", async (req, res) => {
  try {
    const personID = req.params.id;

    const response = await Person.findByIdAndDelete(personID);

    if (!response) {
      return res.status(404).json({ message: "Person not Found" });
    }

    console.log("Person Data Deleted Successfully");
    res.status(200).json({ message: "Person Deleted Successfully" });
  } catch (error) {
    console.log("Error Occured while Deleting Person Data =", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

export default router;
