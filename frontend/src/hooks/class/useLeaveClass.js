import { useMutation } from "@tanstack/react-query";
import { leaveClass } from "../../services/apiClass";
export function useLeaveClass() {
  const { mutate, isPending } = useMutation({
    mutationFn: leaveClass,
  });
  return { mutate, isPending };
}
