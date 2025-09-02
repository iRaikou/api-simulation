import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    countryOfOrigin: { type: String, required: true },
    firstLanguage: { type: String, required: true },
    gender: { type: String, required: true },
    age: { type: String, required: true },
    education: { type: String, required: true },
    immigrationStatus: { type: String, required: true },
    postalCode: { type: String, required: true },
    city: { type: String, required: true },
    designatedGroup: { type: String, required: true },
    currentOccupation: { type: String, required: true },
    incomeSource: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
  },
  { timestamps: true }
);

export default mongoose.model("User", userSchema);
