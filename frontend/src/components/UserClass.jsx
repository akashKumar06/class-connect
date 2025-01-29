import { useNavigate } from "react-router";
import { useQueryClient } from "@tanstack/react-query";
import { useGetAllStudents } from "../hooks/class/useGetAllStudents";
import { useLeaveClass } from "../hooks/class/useLeaveClass";
import JoinRequests from "./JoinRequests";
import NotificationForm from "./NotificationForm";
import Notifications from "./Notifications";
import Spinner from "./Spinner";

function UserClass({ user }) {
  const { data: students, isPending: isFetchingStudents } = useGetAllStudents(
    user.class._id
  );
  const { mutate: leaveClass, isPending: isLeaving } = useLeaveClass();
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  function handleLeaveClass() {
    leaveClass(null, {
      onSuccess: () => {
        queryClient.invalidateQueries(["user"]);
        navigate("/dashboard/join-class");
      },
    });
  }
  return (
    <div className="min-h-screen bg-gray-200 p-6">
      <div className="relative bg-white p-6 shadow-md rounded-lg w-full">
        <button
          onClick={handleLeaveClass}
          className="absolute right-4 top-4 bg-red-500 text-white px-4 py-1 rounded-md hover:bg-red-600 transition-all duration-300"
        >
          Leave
        </button>
        <h1 className="text-2xl font-bold mb-2">{user.class.name}</h1>
        <p className="text-gray-600">
          Session: {user.class.startYear} - {user.class.endYear}
        </p>
        <p className="text-gray-600">Branch: {user.class.department}</p>
      </div>
      <div className="mt-4 flex w-full items-center h-96 gap-4">
        <div
          className={`bg-white p-4 shadow-md rounded-lg h-full overflow-y-auto overflow-x-hidden no-scrollbar ${
            user.isCR ? "w-1/2" : "w-full"
          }`}
        >
          <h1 className="text-2xl font-bold mb-2">Notifications</h1>
          {user.isCR && <NotificationForm />}
          <Notifications />
        </div>
        {user.isCR && <JoinRequests classId={user.class._id} />}
      </div>

      {/* Student List */}
      <div className="mt-8 bg-white p-6 shadow-md rounded-lg">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold">Students in this Class</h2>
          <input
            type="text"
            placeholder="Search students..."
            className="px-4 py-2 border rounded-lg focus:outline-none focus:ring focus:ring-blue-300"
          />
        </div>
        {isFetchingStudents ? (
          <Spinner />
        ) : (
          <ul className="divide-y divide-gray-200">
            {students.map(
              (student) =>
                student._id !== user._id && (
                  <li
                    key={student._id}
                    className="py-4 flex justify-between items-center"
                  >
                    <div>
                      <p className="text-lg font-medium">
                        {student.fullname.firstname}
                      </p>
                      <p className="text-gray-500">@{student.username}</p>
                    </div>
                    <button className="bg-blue-500 text-white px-4 py-1 rounded-lg hover:bg-blue-600 transition">
                      View Profile
                    </button>
                  </li>
                )
            )}
          </ul>
        )}
        {/* {filteredStudents.length > 0 ? (
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
        )} */}
      </div>
    </div>
  );
}

export default UserClass;
