import { useMutation } from "@tanstack/react-query";
import { updatePassword } from "../services/apiUser";

export function useUpdatePassword() {
  const { mutate, isPending } = useMutation({
    mutationFn: (data) => updatePassword(data),
  });
  return { mutate, isPending };
}
