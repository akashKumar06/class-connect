import { useMutation } from "@tanstack/react-query";
import { createClass } from "../services/apiClass";
export function useCreateClass() {
  const { mutate, isPending } = useMutation({
    mutationFn: (classData) => createClass(classData),
  });

  return { mutate, isPending };
}
