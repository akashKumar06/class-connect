import { useMutation } from "@tanstack/react-query";
import { joinClass } from "../services/apiClass";

export function useJoinClass() {
  const { mutate, isPending } = useMutation({
    mutationFn: (data) => {
      return joinClass(data.studentId, data.classId);
    },
  });

  return { mutate, isPending };
}
