import { useQueryClient } from "@tanstack/react-query";
import { useLogout } from "../hooks/useLogout";
import Spinner from "./Spinner";

function Header() {
  const { mutate, isPending } = useLogout();
  const queryClient = useQueryClient();
  const user = queryClient.getQueryData(["user"]);
  return (
    <header className="flex justify-between items-center mb-6">
      <h1 className="text-3xl font-bold animate-fadeIn">
        Welcome, {user.fullname.firstname}
      </h1>
      <button
        onClick={mutate}
        className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600 transition-all duration-300"
      >
        {isPending ? <Spinner /> : "Logout"}
      </button>
    </header>
  );
}

export default Header;
