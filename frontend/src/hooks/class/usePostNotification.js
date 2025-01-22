import { useMutation } from "@tanstack/react-query";
import { postNotification } from "../../services/apiClass";

export function usePostNotification() {
  const { mutate, isPending } = useMutation({
    mutationFn: (message) => postNotification(message),
  });

  return { mutate, isPending };
}
