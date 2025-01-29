import { useMutation } from "@tanstack/react-query";

export function usePostMessage() {
  const { mutate, isPending } = useMutation({
    mutationFn: (id, body) => postMessage(id, body),
  });
  return { mutate, isPending };
}
