import mongoose from "mongoose";

const folderSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    parent: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Folder",
    },
    folders: [{ type: mongoose.Schema.Types.ObjectId, ref: "Folder" }],
    files: [{ type: mongoose.Schema.Types.ObjectId, ref: "File" }],
  },
  { timestamps: true }
);

const Folder = mongoose.model("Folder", folderSchema);
export default Folder;
