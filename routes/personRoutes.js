import express from "express";
import  {Person}  from "../models/Person.js";

const router = express.Router();

// POST Method to Save a Person Data
router.post("/", async (req, res) => {
  try {
    const data = req.body;

    const newPerson = new Person(data);

    const response = await newPerson.save();

    console.log("Data saved successfully");
    res.status(200).json(response);
  } catch (error) {
    console.log("Error while Saving Person =", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// GET Method to get the Person
router.get("/", async (req, res) => {
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
router.put("/:id", async(req,res) => {
  try {
    const personID = req.params.id
    const updatedPersonData = req.body // Ekhane client theke person er updated data asbe

    const response = await Person.findByIdAndUpdate(personID,updatedPersonData, {
      new: true, // Return the Updated Document
      runValidators: true // Run Mongoose Validation
    })

    if(!response){
      return res.status(404).json({message: "Person not found"})
    }

    console.log("Person Data Updated Successfully")
    res.status(200).json(response)

  } catch (error) {
    console.log("Error Occured while Updating Person Data =", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
})

// Delete a Peraon Data
router.delete("/:id", async(req,res) => {
  try {
    const personID = req.params.id
    
    const response = await Person.findByIdAndDelete(personID)

    if(!response){
      return res.status(404).json({message: "Person not Found"})
    }

    console.log("Person Data Deleted Successfully")
    res.status(200).json({message: "Person Deleted Successfully"})
  } catch (error) {
    console.log("Error Occured while Deleting Person Data =", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
})

export default router;
