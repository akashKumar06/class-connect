import { useQuery } from "@tanstack/react-query";
import { getFolder } from "../services/apiFolder";
import { useSearchParams } from "react-router";

export function useFolder() {
  const [params] = useSearchParams();
  let folderId = params.get("folderId");
  if (!folderId) folderId = "root";
  const { data, isPending } = useQuery({
    queryKey: ["folder", folderId],
    queryFn: () => getFolder(folderId),
  });
  return { data, isPending };
}
