import { useMutation } from "@tanstack/react-query";
import { updateProfile } from "../services/apiUser";

function useEditUser() {
  const { mutate, isPending } = useMutation({
    mutationFn: updateProfile,
  });
}

export default useEditUser;
