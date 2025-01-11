import { useQuery } from "@tanstack/react-query";
import { getClasses } from "../services/apiClass";
export function useClasses(query = "") {
  const { data, isPending } = useQuery({
    queryKey: ["classes", query],
    queryFn: () => getClasses(query),
  });
  return { data, isPending };
}
