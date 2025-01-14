import JoinRequests from "./JoinRequests";
import NotificationForm from "./NotificationForm";
import Notifications from "./Notifications";

function UserClass({ user }) {
  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="bg-white p-6 shadow-md rounded-lg w-full">
        <h1 className="text-2xl font-bold mb-2">{user.class.name}</h1>
        <p className="text-gray-600">
          Session: {user.class.startYear} - {user.class.endYear}
        </p>
        <p className="text-gray-600">Branch: {user.class.department}</p>
      </div>
      <div className="mt-4 flex w-full items-center h-96 gap-4">
        <div className="bg-white p-4 shadow-md rounded-lg w-1/2 h-full overflow-y-auto overflow-x-hidden no-scrollbar">
          <h1 className="text-2xl font-bold mb-2">Notifications</h1>
          {user.isCr && <NotificationForm />}
          <Notifications />
        </div>
        {user.isCR && <JoinRequests classId={user.class._id} />}
      </div>

      {/* Notifications Section */}

      {/* Student List */}
      {/* <div className="bg-white p-6 shadow-md rounded-lg">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold">Students in this Class</h2>
          <input
            type="text"
            placeholder="Search students..."
            className="px-4 py-2 border rounded-lg focus:outline-none focus:ring focus:ring-blue-300"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        {filteredStudents.length > 0 ? (
          <ul className="divide-y divide-gray-200">
            {filteredStudents.map((student) => (
              <li
                key={student.id}
                className="py-4 flex justify-between items-center"
              >
                <div>
                  <p className="text-lg font-medium">{student.name}</p>
                  <p className="text-gray-500">@{student.username}</p>
                </div>
                <button className="bg-blue-500 text-white px-4 py-1 rounded-lg hover:bg-blue-600 transition">
                  View Profile
                </button>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-gray-500">No students found.</p>
        )}
      </div> */}
    </div>
  );
}

export default UserClass;
