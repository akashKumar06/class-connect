import { useQuery } from "@tanstack/react-query";
import { getClass } from "../services/apiClass";

export function useClass() {
  const { data, isPending } = useQuery({
    queryKey: ["class"],
    queryFn: () => getClass(id),
  });

  return { data, isPending };
}
