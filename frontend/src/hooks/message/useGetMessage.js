import { useQuery } from "@tanstack/react-query";
import { getMessage } from "../../services/apiMessage";

export function useGetMessage(id) {
  const { data, isPending } = useQuery({
    queryKey: ["messages", id],
    queryFn: () => getMessage(id),
  });
  return { data, isPending };
}
