import { useMutation } from "@tanstack/react-query";
import { uploadFile } from "../services/apiFile";
import { useSearchParams } from "react-router";

export function useUploadFile() {
  const [params] = useSearchParams();
  let parentId = params.get("folderId");
  if (!parentId) parentId = "root";
  const { mutate, isPending } = useMutation({
    mutationFn: (data) => uploadFile(data, parentId),
  });
  return { mutate, isPending };
}
