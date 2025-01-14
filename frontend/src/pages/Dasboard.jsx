import { Outlet } from "react-router";
import { useUser } from "../hooks/useUser";
import Spinner from "../components/Spinner";
import Sidebar from "../components/Sidebar";
import Header from "../components/Header";

function Dashboard() {
  const { data: user, isPending: isFetchingUser } = useUser();

  if (isFetchingUser) return <Spinner />;
  return (
    <div className="flex min-h-screen bg-gray-100">
      <Sidebar user={user} />
      <div className="flex-1 p-6">
        <Header />
        <Outlet />
      </div>
    </div>
  );
}

export default Dashboard;
