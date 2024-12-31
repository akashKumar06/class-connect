import { Link, Outlet } from "react-router";

function Dashboard() {
  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Sidebar */}
      <div className="w-64 bg-green-600 text-white flex flex-col p-6">
        <h2 className="text-2xl font-bold mb-8">ClassConnect</h2>
        <nav className="space-y-6">
          <Link
            to="profile"
            className="block text-lg hover:bg-green-700 px-4 py-2 rounded-md transition-all duration-300"
          >
            Profile
          </Link>
          <Link
            to="resources"
            className="block text-lg hover:bg-green-700 px-4 py-2 rounded-md transition-all duration-300"
          >
            Resources
          </Link>
          <Link
            to="chat-room"
            className="block text-lg hover:bg-green-700 px-4 py-2 rounded-md transition-all duration-300"
          >
            Chat Room
          </Link>
          <Link
            to="join-class"
            className="block text-lg hover:bg-green-700 px-4 py-2 rounded-md transition-all duration-300"
          >
            Join Class
          </Link>
        </nav>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-6">
        <header className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold animate-fadeIn">
            Welcome, Student!
          </h1>
          <button className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600 transition-all duration-300">
            Logout
          </button>
        </header>

        {/* Dashboard Content */}
        <Outlet />
      </div>
    </div>
  );
}

export default Dashboard;
