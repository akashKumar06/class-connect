import { useMutation } from "@tanstack/react-query";
import { createFolder } from "../services/apiFolder";
import { useSearchParams } from "react-router";
export function useCreateFolder() {
  const [params] = useSearchParams();
  const folderId = params.get("folderId");

  const { mutate, isPending } = useMutation({
    mutationFn: (folder) => createFolder(folder, folderId),
  });

  return { mutate, isPending };
}
