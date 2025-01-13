import mongoose from "mongoose";
const classSchema = new mongoose.Schema(
  {
    admin: {
      ref: "User",
      type: mongoose.Schema.Types.ObjectId,
    },
    name: {
      type: String,
      required: true,
      unique: [true, "Class with classname already exists."],
      index: true,
    },
    startYear: {
      type: Number,
      required: true,
    },
    endYear: {
      type: Number,
      required: true,
    },
    department: {
      type: String,
      required: true,
    },
    requests: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
  },
  { timestamps: true }
);
const Class = mongoose.model("Class", classSchema);
export default Class;
