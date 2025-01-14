import Spinner from "../components/Spinner";
import { useUser } from "../hooks/useUser";
import { Link } from "react-router";
import UserClass from "../components/UserClass";

function MyClass() {
  const { data: user, isPending } = useUser();

  if (isPending) return <Spinner />;
  if (!user.class)
    return (
      <p className="text-center">
        <h2 className="text-lg font-medium">You not belong to any class👻</h2>
        <Link to="/dashboard/join-class" className="underline text-blue-600">
          join now
        </Link>
      </p>
    );
  if (user.hasJoined === "pending")
    return (
      <div className="bg-white p-4 rounded-lg shadow-md hover:shadow-lg  transform transition-transform">
        <h2 className="text-xl font-bold text-gray-800">{user.class.name}</h2>
        <p className="text-gray-600 mb-4">
          {user.class.startYear}-{user.class.endYear}
        </p>
        <p className="text-gray-600 mb-4">{user.class.department}</p>
        <button className="bg-slate-400 px-4 py-2 rounded-md text-white">
          Pending
        </button>
      </div>
    );
  return <UserClass user={user} />;
}

export default MyClass;
