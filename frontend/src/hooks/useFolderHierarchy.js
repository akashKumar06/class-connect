import { useQuery } from "@tanstack/react-query";
import { useSearchParams } from "react-router";
import { getHierarchy } from "../services/apiFolder";

export function useFolderHierarchy() {
  const [params] = useSearchParams();
  let folderId = params.get("folderId");
  if (!folderId) folderId = "root";
  const { data, isPending } = useQuery({
    queryKey: ["hierarchy", folderId],
    queryFn: () => getHierarchy(folderId),
  });
  return { data, isPending };
}
