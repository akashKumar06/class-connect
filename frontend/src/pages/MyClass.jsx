import { useState } from "react";
import Spinner from "../components/Spinner";
import { useUser } from "../hooks/useUser";
import { Link } from "react-router";

function MyClass() {
  const [notifications, setNotifications] = useState([
    {
      id: 1,
      message: "Class schedule updated for next week.",
      timestamp: "2024-12-30",
    },
    {
      id: 2,
      message: "Midterm exams will start from 15th January.",
      timestamp: "2024-12-28",
    },
  ]);

  const [newMessage, setNewMessage] = useState("");
  const [searchQuery, setSearchQuery] = useState("");

  // Filter students based on the search query
  // const filteredStudents = classDetails.students.filter((student) =>
  //   student.name.toLowerCase().includes(searchQuery.toLowerCase())
  // );

  const handlePostMessage = (e) => {
    e.preventDefault();

    if (!newMessage.trim()) {
      alert("Message cannot be empty.");
      return;
    }

    const newNotification = {
      id: notifications.length + 1,
      message: newMessage,
      timestamp: new Date().toISOString(),
    };

    setNotifications([newNotification, ...notifications]);
    setNewMessage("");
  };

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
  return (
    <div className="min-h-screen bg-gray-100 p-6">
      {/* Header */}
      <div className="bg-white p-6 shadow-md rounded-lg mb-6">
        <h1 className="text-2xl font-bold mb-2">{user.class.name}</h1>
        <p className="text-gray-600">
          Session: {user.class.startYear} - {user.class.endYear}
        </p>
        <p className="text-gray-600">Branch: {user.class.department}</p>
      </div>

      {/* Notifications Section */}
      <div className="bg-yellow-100 p-4 shadow-md rounded-lg mb-6">
        <h2 className="text-lg font-bold mb-4">Notifications</h2>

        {/* New Message Form (Visible only to CR) */}
        <form onSubmit={handlePostMessage} className="mb-6">
          <textarea
            rows="3"
            placeholder="Enter a message to notify the class..."
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring focus:ring-blue-300"
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
          ></textarea>
          <button
            type="submit"
            className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition mt-2"
          >
            Post Message
          </button>
        </form>

        {/* List of Notifications */}
        <ul className="space-y-3">
          {notifications.length > 0 ? (
            notifications.map((notification) => (
              <li
                key={notification.id}
                className="bg-white p-3 rounded-lg shadow-sm border"
              >
                <p className="text-gray-800">{notification.message}</p>
                <p className="text-gray-500 text-sm">
                  {new Date(notification.timestamp).toLocaleDateString()}
                </p>
              </li>
            ))
          ) : (
            <p className="text-gray-600">No notifications available.</p>
          )}
        </ul>
      </div>

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

export default MyClass;
