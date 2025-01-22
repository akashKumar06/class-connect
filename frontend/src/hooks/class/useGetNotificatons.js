import { useQuery } from "@tanstack/react-query";
import { getNotifications } from "../../services/apiClass";

export function useGetNotification() {
  const { data, isPending } = useQuery({
    queryKey: ["notifications"],
    queryFn: () => getNotifications(),
  });

  return { data, isPending };
}
