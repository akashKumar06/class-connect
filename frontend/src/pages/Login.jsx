import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Link, useNavigate } from "react-router";
import { login } from "../services/apiUser";
import { useState } from "react";
import Spinner from "../components/Spinner";
import { toast } from "react-hot-toast";

function Login() {
  const [data, setData] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const { mutate, isPending } = useMutation({
    mutationFn: (user) => login(user),
    onSuccess: (user) => {
      queryClient.setQueryData(["user"], user);
      navigate("/dashboard", { replace: true });
    },
    onError: (err) => {
      toast.error(err.message);
    },
  });

  function handleSubmit(e) {
    e.preventDefault();
    mutate(
      { username: data, email: data, password },
      {
        onSettled: () => {
          setData("");
          setPassword("");
        },
      }
    );
  }
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full">
        <h2 className="text-2xl font-bold mb-4">Login</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-700">Email or Username</label>
            <input
              type="text"
              className="w-full px-4 py-2 border rounded-md focus:outline-none"
              placeholder="Username or Email"
              value={data}
              onChange={(e) => setData(e.target.value)}
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Password</label>
            <input
              type="password"
              className="w-full px-4 py-2 border rounded-md focus:outline-none"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <button
            disabled={isPending}
            type="submit"
            className="w-full flex items-center justify-center bg-green-500 text-white py-2 rounded-md hover:bg-green-600"
          >
            {isPending ? <Spinner /> : "Login"}
          </button>
        </form>
        <div className="mt-4">
          <p className=" text-sm text-center">
            Not have an account?{" "}
            <Link to="/signup" className="underline text-blue-600">
              Create Account
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Login;
