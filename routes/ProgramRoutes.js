import express from "express";
import Program from "../models/Program.js";

const router = express.Router();

// ✅ POST: Save program
router.post("/", async (req, res) => {
  try {
    const { email, name, date, status } = req.body;

    const program = await Program.create({
      email,
      name,
      date,
      status,
    });

    res.status(201).json({ message: "Program saved successfully", program });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// ✅ GET: Get programs by email
router.get("/:email", async (req, res) => {
  try {
    const { email } = req.params;

    const programs = await Program.find({ email });
    res.json(programs);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

export default router;
