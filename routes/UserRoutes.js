import express from "express";
// import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../models/User.js";

const router = express.Router();

// Helper: generate OTP
const generateOTP = () =>
  Math.floor(100000 + Math.random() * 900000).toString();

// ✅ Register User
router.post("/register", async (req, res) => {
  try {
    const {
      firstName,
      lastName,
      countryOfOrigin,
      firstLanguage,
      gender,
      age,
      education,
      immigrationStatus,
      postalCode,
      city,
      designatedGroup,
      currentOccupation,
      incomeSource,
      email,
      password,
    } = req.body;
    const userExists = await User.findOne({ email });

    if (userExists) {
      return res.status(400).json({ message: "Email already exists" });
    }

    const user = await User.create({
      firstName,
      lastName,
      countryOfOrigin,
      firstLanguage,
      gender,
      age,
      education,
      immigrationStatus,
      postalCode,
      city,
      designatedGroup,
      currentOccupation,
      incomeSource,
      email,
      password,
    });

    res.status(201).json({
      message: "User registered successfully",
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// ✅ Re-generate OTP
router.post("/regenerate-otp", async (req, res) => {
  try {
    const { email } = req.body;
    const user = await User.findOne({ email });

    if (!user) return res.status(404).json({ message: "User not found" });

    const otp = generateOTP();
    user.otp = otp;
    user.otpExpires = Date.now() + 10 * 60 * 1000;
    await user.save();

    res.json({ message: "OTP regenerated", otp });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// ✅ Check Email Exists
router.post("/check-email", async (req, res) => {
  try {
    const { email } = req.body;
    const exists = await User.exists({ email });
    res.json({ exists: !!exists });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.get("/test", async (req, res) => {
  try {
    res.json({ message: "User route test successful" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// ✅ User Login -> Generate JWT
// router.post("/login", async (req, res) => {
//   try {
//     const { email, password } = req.body;
//     const user = await User.findOne({ email });

//     if (!user) return res.status(404).json({ message: "User not found" });

//     const isMatch = await bcrypt.compare(password, user.password);
//     if (!isMatch)
//       return res.status(401).json({ message: "Invalid credentials" });

//     const token = jwt.sign(
//       { id: user._id, email: user.email },
//       process.env.JWT_SECRET,
//       { expiresIn: "1h" }
//     );

//     res.json({ message: "Login successful", token });
//   } catch (err) {
//     res.status(500).json({ message: err.message });
//   }
// });

export default router;
