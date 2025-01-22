import { useMutation } from "@tanstack/react-query";
import { deleteNotifications } from "../../services/apiClass";

export function useDeleteNotification() {
  const { mutate, isPending } = useMutation({
    mutationFn: (data) => deleteNotifications(data.classId, data.id),
  });
  return { mutate, isPending };
}
