import { useEffect, useRef } from "react";
import { useGetNotification } from "../hooks/class/useGetNotificatons";
import Spinner from "./Spinner";
import socket from "../utils/socket";
import { useQueryClient } from "@tanstack/react-query";
import Notification from "./Notification";

function Notifications() {
  const { data: notifications, isPending } = useGetNotification();

  const queryClient = useQueryClient();

  const messageEndRef = useRef();

  useEffect(() => {
    socket.on("class_notification", (data) => {
      queryClient.setQueryData(["notifications"], (oldData) => {
        if (!oldData) return;
        return [...oldData, data];
      });
    });

    socket.on("delete_notification", (notificationId) => {
      queryClient.setQueryData(["notifications"], (oldData) => {
        if (!oldData) return;
        return oldData.filter((data) => data._id !== notificationId);
      });
    });

    return () => {
      socket.off("class_notification");
      socket.off("delete_notification");
    };
  }, [queryClient]);

  useEffect(() => {
    if (messageEndRef.current && notifications) {
      messageEndRef.current.scrollIntoView({ behaviour: "smooth" });
    }
  }, [notifications]);

  if (isPending) return <Spinner />;
  return (
    <ul className="space-y-3">
      {notifications.length > 0 ? (
        notifications.map((notification) => (
          <Notification
            key={notification._id}
            notification={notification}
            ref={messageEndRef}
          />
        ))
      ) : (
        <p className="text-gray-600">No notifications available.</p>
      )}
    </ul>
  );
}

export default Notifications;
