import { useState } from "react";
import Modal from "../components/Modal";
import useImageUpload from "../hooks/useImageUpload";
import { useUser } from "../hooks/useUser";
import Spinner from "../components/Spinner";
import { useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import ImageUploadForm from "../components/ImageUploadForm";
import EditProfile from "../components/EditProfile";
import UpdatePasswordForm from "../components/UpdatePasswordForm";
import { useUpdatePassword } from "../hooks/useUpdatePassword";

function Profile() {
  const queryClient = useQueryClient();
  const { data: user, isPending } = useUser();
  const { mutate: uploadImage, isPending: isUploadingImage } = useImageUpload();
  const { mutate: updatePassword, isPending: isUpdatingPassword } =
    useUpdatePassword();

  const [openImageModal, setOpenImageModal] = useState(false);
  const [openEditModal, setOpenEditModal] = useState(false);
  const [openUpdatePasswordModal, setUpdatePasswordModal] = useState(false);

  const handleImageOpen = () => {
    setOpenImageModal(() => true);
  };

  function handleCloseModal() {
    setOpenEditModal(false);
    setOpenImageModal(false);
    setUpdatePasswordModal(false);
  }

  function handleUpdatePassword(data) {
    updatePassword(data, {
      onSuccess: () => {
        toast.success("Password updated successfully");
        handleCloseModal();
      },
      onError: (err) => {
        toast.error(err.msg);
      },
    });
  }

  const handleImageUpload = (image) => {
    uploadImage(image, {
      onSuccess: () => {
        queryClient.invalidateQueries("user");
        toast.success("Image uploaded successfully.");
        handleCloseModal();
      },
      onError: (err) => {
        toast.error(err.msg);
      },
    });
  };

  if (isPending) return <Spinner />;
  return (
    <div className="min-h-screen bg-gray-100 p-6">
      {openImageModal && (
        <Modal>
          <ImageUploadForm
            onClose={handleCloseModal}
            onImageUpload={handleImageUpload}
            isUploadingImage={isUploadingImage}
          />
        </Modal>
      )}
      {openEditModal && (
        <Modal>
          <EditProfile onClose={handleCloseModal} />
        </Modal>
      )}
      {openUpdatePasswordModal && (
        <Modal>
          <UpdatePasswordForm
            isUpdatingPassword={isUpdatingPassword}
            onPasswordUpdate={handleUpdatePassword}
            onClose={handleCloseModal}
          />
        </Modal>
      )}
      <div className="max-w-4xl mx-auto bg-white p-8 rounded-lg shadow-lg">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-3xl font-bold">Your Profile</h1>
          <div className="flex gap-2">
            <button
              className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 transition-all"
              onClick={() => setOpenEditModal(true)}
            >
              Edit Profile
            </button>
            <button
              className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 transition-all"
              onClick={() => setUpdatePasswordModal(true)}
            >
              Update Password
            </button>
          </div>
        </div>

        {/* Profile Picture */}
        <div className="flex items-center space-x-6 mb-8">
          <div className="w-24 h-24 rounded-full shadow-md relative top-0 overflow-hidden">
            <img src={user.avatar} alt="Profile" className="" />
            <div
              onClick={handleImageOpen}
              className="absolute bottom-0 w-full h-10 backdrop-blur-sm hover:cursor-pointer flex items-center justify-center"
            >
              <i className="ri-camera-fill"></i>
            </div>
          </div>
          <div>
            <h2 className="text-xl font-semibold">{`${user.fullname.firstname} ${user.fullname.firstname}`}</h2>
            <p className="text-gray-600">{user.username}</p>
          </div>
        </div>

        <div className="space-y-6">
          {/* Name */}
          <div>
            <h2 className="block text-gray-700 font-medium mb-2">Name</h2>
            <p className="text-gray-800">{`${user.fullname.firstname} ${user.fullname.firstname}`}</p>
          </div>

          {/* Email */}
          <div>
            <h2 className="block text-gray-700 font-medium mb-2">Email</h2>
            <p className="text-gray-800">{user.email}</p>
          </div>

          {/* Phone */}
          <div>
            <h4 className="block text-gray-700 font-medium mb-2">Phone</h4>
            <p className="text-gray-800">{user?.phone || "Add Phone number"}</p>
          </div>

          {/* Bio */}
          <div>
            <h4 className="block text-gray-700 font-medium mb-2">Bio</h4>

            <p className="text-gray-800">{user?.bio || "Add Bio"}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Profile;
