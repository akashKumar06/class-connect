import { useQuery } from "@tanstack/react-query";
import { getAllStudentsOfClass } from "../../services/apiClass";

export function useGetAllStudents(classId) {
  const { data, isPending } = useQuery({
    queryKey: ["class-students", classId],
    queryFn: () => getAllStudentsOfClass(classId),
  });
  return { data, isPending };
}
