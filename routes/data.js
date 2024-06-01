import express from "express";
import Data from "../models/Data.js";
import * as dotenv from "dotenv";
import fetchuser from "../middleware/fetchuser.js";
import { body, validationResult } from "express-validator";
const router = express.Router();

dotenv.config();

//Getting a details using GET "/api/v1/data/getdata"
router.get("/getdata", async (req, res) => {
  try {
    const data = await Data.find({});
    res.json(data);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Internal Server Error");
  }
});

//Adding a details using POST "/api/v1/data/adddata"
router.post(
  "/adddata",
  fetchuser,
  [
    body("name", "Enter a valid name").isLength({ min: 3 }),
    body("img", "Enter a valid link"),
    body("summary", "Enter a valid summary").isLength({ min: 50 }),
  ],
  async (req, res) => {
    try {
      const { name, img, summary } = req.body;
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }
      const data = new Data({
        name, img, summary,
        user: req.user.id,
      });
      const saveData = await data.save();
      res.json(saveData);
    } catch (error) {
      console.error(error.message);
      res.status(500).send("Internal Server Error");
    }
  }
);

//Updating an existing details using PUT "/api/v1/data/updatedata"
router.put("/updatedata/:id", fetchuser, async (req, res) => {
  const { name, img, summary  } = req.body;
  try {
    const newData = {};
    if (name) {
      newData.name = name;
    }
    if (img) {
      newData.img = img;
    }
    if (summary) {
      newData.summary = summary;
    }
  
    //find a data to update
    let data = await Data.findById(req.params.id);
    if (!data) {
      return res.status(404).send("Not found");
    }

    if (data.user.toString() != req.user.id) {
      return res.status(401).send("Not Allowed");
    }
    data = await Data.findByIdAndUpdate(
      req.params.id,
      { $set: newData },
      { new: true }
    );
    res.json(data);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Internal Server Error");
  }
});

//Deleting an existing details using PUT "/api/v1/data/deletedata"
router.delete("/deletedata/:id", fetchuser, async (req, res) => {
  try {
    //find a data to delete
    let data = await Data.findById(req.params.id);
    if (!data) {
      return res.status(404).send("Not found");
    }

    if (data.user.toString() != req.user.id) {
      return res.status(401).send("Not Allowed");
    }
    data = await Data.findByIdAndDelete(req.params.id);
    res.json({ Success: "Deleted Successfully", data: data });
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Internal Server Error");
  }
});
export default router;
