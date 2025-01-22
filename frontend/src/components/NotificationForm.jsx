import { useState } from "react";
import { usePostNotification } from "../hooks/class/usePostNotification";
import { toast } from "react-hot-toast";
import Spinner from "./Spinner";
import { useQueryClient } from "@tanstack/react-query";

function NotificationForm() {
  const [newMessage, setNewMessage] = useState("");
  const { mutate, isPending } = usePostNotification();
  const queryClient = useQueryClient();

  function handlePostMessage(e) {
    e.preventDefault();
    mutate(
      { message: newMessage },
      {
        onSuccess: () => {
          queryClient.invalidateQueries(["notifications"]);
          toast.success("message sent to class");
        },
        onError: (err) => {
          toast.error(err.message);
        },
        onSettled: () => {
          setNewMessage("");
        },
      }
    );
  }

  return (
    <form onSubmit={handlePostMessage} className="mb-6">
      <textarea
        rows="3"
        placeholder="Enter a message to notify the class..."
        className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring focus:ring-blue-300"
        value={newMessage}
        onChange={(e) => setNewMessage(e.target.value)}
      ></textarea>
      <button
        type="submit"
        className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition mt-2"
      >
        {isPending ? <Spinner /> : "Post Message"}
      </button>
    </form>
  );
}

export default NotificationForm;
