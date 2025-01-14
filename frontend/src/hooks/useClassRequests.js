import { useQuery } from "@tanstack/react-query";
import { getClassRequests } from "../services/apiClass";

export function useClassRequests(classId) {
  const { data, isPending } = useQuery({
    queryKey: ["classRequests"],
    queryFn: () => getClassRequests(classId),
  });
  return { classInfo: data?.data, isPending };
}
