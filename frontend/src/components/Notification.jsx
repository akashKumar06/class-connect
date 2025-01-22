import { useQueryClient } from "@tanstack/react-query";
import { forwardRef } from "react";
import { useDeleteNotification } from "../hooks/class/useDeleteNotification";
import toast from "react-hot-toast";

const Notification = forwardRef(function Notificaton({ notification }, ref) {
  const { mutate, isPending: isDeleting } = useDeleteNotification();
  const queryClient = useQueryClient();
  const user = queryClient.getQueryData(["user"]);

  function handleDeleteNotification(id) {
    mutate(
      { classId: user.class._id, id },
      {
        onSuccess: () => {
          toast.success("message deleted successfully");
        },
      }
    );
  }
  return (
    <li
      key={notification._id}
      className="bg-white p-3 rounded-lg shadow-sm relative border-gray-300 border"
      ref={ref}
    >
      <p className="text-gray-800">{notification.message}</p>
      <p className="text-gray-500 text-sm">
        {new Date(notification.postedAt).toLocaleDateString()}
      </p>
      {user.isCR && (
        <button
          onClick={() => handleDeleteNotification(notification._id)}
          className="absolute right-1 top-1 bg-red-500 text-white text-sm px-4 py-1 rounded-lg hover:bg-red-600 transition-all duration-300"
        >
          {isDeleting ? "Deleting..." : "Delete"}
        </button>
      )}
    </li>
  );
});

export default Notification;
