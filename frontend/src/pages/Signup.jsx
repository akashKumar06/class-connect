import { useState } from "react";
import { Link, useNavigate } from "react-router";
import { register } from "../services/apiUser.js";
import { useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";
function Signup() {
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();
  const { mutate, isPending } = useMutation({
    mutationFn: (user) => register(user),
    onSuccess: () => {
      toast.success("User registered successfully");
      navigate("/login");
    },
    onError: (err) => {
      console.log(err);
    },
  });

  function handleSubmit(e) {
    e.preventDefault();
    mutate(
      { username, email, fullname: { firstname, lastname }, password },
      {
        onSettled: () => {
          setEmail("");
          setFirstname("");
          setLastname("");
          setUsername("");
          setPassword("");
        },
        onError: (err) => {
          toast.error(err.message);
        },
      }
    );
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full">
        <h2 className="text-2xl font-bold mb-4">Signup</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-700">Full Name</label>
            <div className="flex gap-4">
              <input
                required
                type="text"
                className="w-1/2 px-4 py-2 border rounded-md focus:outline-none"
                placeholder="First Name"
                value={firstname}
                onChange={(e) => setFirstname(e.target.value)}
              />
              <input
                required
                type="text"
                className="w-1/2 px-4 py-2 border rounded-md focus:outline-none"
                placeholder="Last Name"
                value={lastname}
                onChange={(e) => setLastname(e.target.value)}
              />
            </div>
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Email</label>
            <input
              required
              type="email"
              className="w-full px-4 py-2 border rounded-md focus:outline-none"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Username</label>
            <input
              required
              type="text"
              className="w-full px-4 py-2 border rounded-md focus:outline-none"
              placeholder="Enter your username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Password</label>
            <input
              required
              type="password"
              className="w-full px-4 py-2 border rounded-md focus:outline-none"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <button
            type="submit"
            className="w-full bg-green-500 text-white py-2 rounded-md hover:bg-green-600"
            disabled={isPending}
          >
            Signup
          </button>
        </form>
        <div className="mt-4">
          <p className=" text-sm text-center">
            Already have an account?{" "}
            <Link to="/login" className="underline text-blue-600">
              Login here
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Signup;
