import mongoose from "mongoose";

const fileSchmea = new mongoose.Schema(
  {
    parent: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Folder",
    },
    format: {
      type: String,
      required: true,
    },
    resource_type: {
      type: String,
      required: true,
    },
    url: {
      type: String, // cloudinary url
      required: true,
    },
    original_filename: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const File = mongoose.model("File", fileSchmea);

export default File;
