import { useState } from "react";
import Spinner from "./Spinner";

function UpdatePasswordForm({ onClose, onPasswordUpdate, isUpdatingPassword }) {
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  function handleSubmit(e) {
    e.preventDefault();
    onPasswordUpdate({
      oldPassword,
      newPassword,
      confirmPassword,
    });
  }
  return (
    <div className="bg-white w-96 rounded-lg shadow-lg p-6 relative">
      {/* Close Button */}
      <i
        className="ri-close-line absolute right-4 top-[10px] font-semibold text-xl hover:cursor-pointer"
        onClick={onClose}
      ></i>

      {/* Modal Header */}
      <h2 className="text-xl font-bold mb-4">Upload Password</h2>

      {/* Upload Form */}
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-gray-700">Old Password</label>
          <input
            required
            type="old password"
            className="w-full px-4 py-2 border rounded-md focus:outline-none"
            placeholder="Enter your old password"
            value={oldPassword}
            onChange={(e) => setOldPassword(e.target.value)}
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">New Password</label>
          <input
            required
            type="new password"
            className="w-full px-4 py-2 border rounded-md focus:outline-none"
            placeholder="Enter your new password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Confirm Password</label>
          <input
            required
            type="confirm password"
            className="w-full px-4 py-2 border rounded-md focus:outline-none"
            placeholder="confirm your password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
        </div>
        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition w-full"
        >
          {isUpdatingPassword ? <Spinner /> : "Update"}
        </button>
      </form>
    </div>
  );
}

export default UpdatePasswordForm;
