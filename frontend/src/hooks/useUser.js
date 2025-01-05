import { useQuery } from "@tanstack/react-query";
import { getUser } from "../services/apiUser";

export function useUser() {
  const { data, isPending } = useQuery({
    queryKey: ["user"],
    queryFn: getUser,
  });

  return {
    user: data,
    isPending,
  };
}
