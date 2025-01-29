import { useState } from "react";
import { useClasses } from "../hooks/useClasses";
import Spinner from "../components/Spinner";
import { useQueryClient } from "@tanstack/react-query";
import { useJoinClass } from "../hooks/useJoinClass";
import { toast } from "react-hot-toast";
import { useUser } from "../hooks/useUser";
import ClassInfo from "../components/ClassInfo";
import socket from "../utils/socket";

function JoinClass() {
  const [searchTerm, setSearchTerm] = useState("");
  const [classId, setClassId] = useState("");
  const { data: user, isPending: isFetchingUser } = useUser();
  const { data: classes, isPending } = useClasses(searchTerm);
  const { mutate: joinClass, isPending: isJoiningClass } = useJoinClass();

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  const queryClient = useQueryClient();

  const handleJoinClass = (classId) => {
    setClassId(() => classId);

    const data = {
      studentId: user._id,
      classId: classId,
    };

    joinClass(data, {
      onSuccess: async () => {
        queryClient.invalidateQueries({
          queryKey: ["user"],
        });
        toast.success("Request has been sent successfully.");
        socket.emit("class_join", data);
      },
      onError: (err) => {
        toast.error(err.message);
      },
    });
  };

  if (isFetchingUser) return <Spinner />;
  if (!isFetchingUser && user.hasJoined === "pending")
    return <h1>Wait for approval by the CR</h1>;
  if (!isFetchingUser && user.hasJoined === "accepted")
    return <h1>You have already joined a class</h1>;

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      {user.hasJoined === "pending" ? (
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
      ) : (
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="mb-6">
            <h1 className="text-3xl font-bold text-gray-800">Join Class</h1>
            <p className="text-gray-600 mt-2">
              Search for a class and request to join. Only the CR can approve
              your request.
            </p>
          </div>
          {/* Search Bar */}
          <div className="mb-6">
            <input
              type="text"
              placeholder="Search for a class..."
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring focus:ring-blue-300"
              value={searchTerm}
              onChange={handleSearch}
            />
          </div>

          {isPending && <Spinner />}

          {/* Classes List */}
          {!isPending && classes.length === 0 && <p>No Class found</p>}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {!isPending &&
              classes.length > 0 &&
              classes.map((cls) => (
                <ClassInfo
                  key={cls._id}
                  cls={cls}
                  classId={classId}
                  onJoinClass={handleJoinClass}
                />
              ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default JoinClass;
