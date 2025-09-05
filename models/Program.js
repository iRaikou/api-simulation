import mongoose from "mongoose";

const programSchema = new mongoose.Schema(
  {
    email: { type: String, required: true }, // user’s email
    name: { type: String, required: true }, // program name
    date: { type: String, required: true }, // program date
    status: { type: String, required: true }, // e.g. active, pending, completed
  },
  { timestamps: true }
);

export default mongoose.model("Program", programSchema);
