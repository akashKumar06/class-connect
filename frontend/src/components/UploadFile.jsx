import { useState } from "react";
import Spinner from "./Spinner";

export function UploadFile({ onClose, onSubmit, isUploadingFile }) {
  const [file, setFile] = useState();

  function handleSubmit(e) {
    e.preventDefault();
    const form = new FormData();
    form.append("file", file);
    onSubmit(form);
  }

  return (
    <div className="bg-white w-96 rounded-lg shadow-lg p-6 relative">
      {/* Close Button */}
      <i
        className="ri-close-line absolute right-4 top-[10px] font-semibold text-xl hover:cursor-pointer"
        onClick={onClose}
      ></i>

      {/* Modal Header */}
      <h2 className="text-xl font-bold mb-4">Upload File</h2>

      {/* Upload Form */}
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label
            htmlFor="image"
            className="block text-sm font-medium text-gray-700"
          >
            Choose a file
          </label>
          <input
            type="file"
            name="file"
            id="file"
            className="mt-2 w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring focus:ring-blue-300"
            onChange={(e) => setFile(e.target.files[0])}
          />
        </div>
        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition w-full"
        >
          {isUploadingFile ? <Spinner /> : "Upload"}
        </button>
      </form>
    </div>
  );
}

export default UploadFile;
