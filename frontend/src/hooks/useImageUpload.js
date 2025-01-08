import { useMutation } from "@tanstack/react-query";
import { uploadImage } from "../services/apiUser";

function useImageUpload() {
  const { mutate, isPending } = useMutation({
    mutationFn: (image) => uploadImage(image),
  });

  return { mutate, isPending };
}

export default useImageUpload;
