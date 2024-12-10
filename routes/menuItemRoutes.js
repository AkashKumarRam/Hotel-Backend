import express from "express";
import { MenuItem } from "../models/MenuItem.js";
const router = express.Router();

// POST a MenuItem
router.post("/", async (req, res) => {
  try {
    const data = req.body;

    const newMenu = new MenuItem(data);

    const response = await newMenu.save();

    console.log("MenuItem Created Successfully");
    res.status(200).json({ response });
  } catch (error) {
    console.log("Error is occured on Creating MenuItem =", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

// GET MenuItems
router.get("/", async (req, res) => {
  try {
    const Menus = await MenuItem.find();

    console.log("MenuItems Shows Successfully");
    res.status(200).json({ Menus });
  } catch (error) {
    console.log("Error Occured in GET Menus =", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

// GET Menu Items by their taste
router.get("/:tasteType", async (req, res) => {
  try {
    const tasteType = req.params.tasteType;

    if (tasteType == "sweet" || tasteType == "spicy" || tasteType == "sour") {
      const response = await MenuItem.find({ taste: tasteType });
      console.log("MenuItems Find Successfully");
      res.status(200).json(response);
    }
  } catch (error) {
    console.log("Error while Finding Menus according to taste =", error);
    res.status(404).json({ message: "MenuItems not Found" });
  }
});

// Update a Menu Item
router.put("/:id", async (req, res) => {
  try {
    const menuID = req.params.id;
    const updatedMenuItemData = req.body;

    const response = await MenuItem.findByIdAndUpdate(
      menuID,
      updatedMenuItemData,
      {
        new: true,
        runValidators: true,
      }
    );

    if (!response) {
      return res.status(404).json({ message: "MenuItem not Found" });
    }

    console.log("Menu Item Updated Successfully");
    res.status(200).json(response);
  } catch (error) {
    console.log("Menu Item is not Updating");
    res.status(500).json({ message: "Internal server error" });
  }
});

// Delete MenuItems
router.delete("/:id", async (req, res) => {
  try {
    const menuID = req.params.id;

    const response = await MenuItem.findByIdAndDelete(menuID);

    if (!response) {
      return res.status(404).json({ message: "MenuItem not Found" });
    }

    console.log("MenuItem Deleted Successfully");
    res.status(200).json({ message: "MenuItem Deleted Successfully" });
  } catch (error) {
    console.log("Menu Item is not Deleted");
    res.status(500).json({ message: "Internal server error" });
  }
});

export default router;
