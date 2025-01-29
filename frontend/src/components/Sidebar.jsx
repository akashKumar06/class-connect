import { Link } from "react-router";

function Sidebar({ user }) {
  return (
    <div className="w-64 bg-green-600 text-white flex flex-col p-6">
      <Link to="/" className="text-2xl font-bold mb-8">
        ClassConnect
      </Link>
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
        {!user.isCR && (
          <Link
            to="join-class"
            className="block text-lg hover:bg-green-700 px-4 py-2 rounded-md transition-all duration-300"
          >
            Join Class
          </Link>
        )}

        {user.isCR && !user.class && (
          <Link
            to="create-class"
            className="block text-lg hover:bg-green-700 px-4 py-2 rounded-md transition-all duration-300"
          >
            Create Class
          </Link>
        )}
        <Link
          to="my-class"
          className="block text-lg hover:bg-green-700 px-4 py-2 rounded-md transition-all duration-300"
        >
          My Class
        </Link>
      </nav>
    </div>
  );
}

export default Sidebar;
