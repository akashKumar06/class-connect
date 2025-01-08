import { useState } from "react";
import Spinner from "./Spinner";

function ImageUploadForm({ onClose, onImageUpload, isUploadingImage }) {
  const [image, setImage] = useState();

  function handleSubmit(e) {
    e.preventDefault();
    const form = new FormData();
    form.append("avatar", image);
    onImageUpload(form);
  }
  return (
    <div className="bg-white w-96 rounded-lg shadow-lg p-6 relative">
      {/* Close Button */}
      <i
        className="ri-close-line absolute right-4 top-[10px] font-semibold text-xl hover:cursor-pointer"
        onClick={onClose}
      ></i>

      {/* Modal Header */}
      <h2 className="text-xl font-bold mb-4">Upload an Image</h2>

      {/* Upload Form */}
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label
            htmlFor="image"
            className="block text-sm font-medium text-gray-700"
          >
            Choose an image
          </label>
          <input
            type="file"
            name="avatar"
            id="avatar"
            accept="image/*"
            className="mt-2 w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring focus:ring-blue-300"
            onChange={(e) => setImage(e.target.files[0])}
          />
        </div>
        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition w-full"
        >
          {isUploadingImage ? <Spinner /> : "Upload"}
        </button>
      </form>
    </div>
  );
}

export default ImageUploadForm;
