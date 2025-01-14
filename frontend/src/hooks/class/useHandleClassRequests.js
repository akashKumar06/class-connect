import { useMutation, useQueryClient } from "@tanstack/react-query";
import { handleClassRequest } from "../../services/apiClass";

export function useHandleClassRequests() {
  const queryClient = useQueryClient();
  const { mutate, isPending } = useMutation({
    mutationFn: ({ classId, studentId, status }) =>
      handleClassRequest(classId, studentId, status),
    onSuccess: () => {
      queryClient.invalidateQueries(["classRequests"]);
    },
  });
  return { mutate, isPending };
}
