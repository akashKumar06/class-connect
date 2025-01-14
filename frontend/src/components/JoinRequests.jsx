import { useHandleClassRequests } from "../hooks/class/useHandleClassRequests";
import { useClassRequests } from "../hooks/useClassRequests";
import Spinner from "./Spinner";

function JoinRequests({ classId }) {
  const { classInfo, isPending: isFetchingRequests } =
    useClassRequests(classId);
  const { mutate: handleClassRequest, isPending } = useHandleClassRequests();
  if (isFetchingRequests) return <Spinner />;
  return (
    <div className="bg-white w-1/2 h-full rounded-lg p-4 overflow-y-auto overflow-x-hidden no-scrollbar">
      <h1 className="text-2xl font-bold mb-2">Join Requests</h1>
      <ul className="flex flex-col gap-2">
        {classInfo.requests.length === 0 && (
          <h1 className="text-lg font-medium text-center">No join requests</h1>
        )}
        {classInfo.requests.length > 0 &&
          classInfo.requests.map((user) => (
            <li
              key={user._id}
              className="py-4 flex justify-between items-center bg-gray-100 p-4 rounded-lg"
            >
              <div>
                <p className="text-lg font-medium">Akash Kumar</p>
                <p className="text-gray-500">akash@gmail.com</p>
              </div>
              <div className="flex gap-2">
                <button
                  onClick={() =>
                    handleClassRequest({
                      classId: classInfo._id,
                      studentId: user._id,
                      status: "accepted",
                    })
                  }
                  className=" text-white px-4 py-1 rounded-lg bg-green-500 hover:bg-green-600 transition"
                >
                  {isPending ? <Spinner /> : "Accept"}
                </button>
                <button
                  onClick={() =>
                    handleClassRequest({
                      classId: classInfo._id,
                      studentId: user._id,
                      status: "rejected",
                    })
                  }
                  className="bg-red-500 text-white px-4 py-1 rounded-lg hover:bg-red-600 transition"
                >
                  {isPending ? <Spinner /> : "Reject"}
                </button>
              </div>
            </li>
          ))}
      </ul>
    </div>
  );
}

export default JoinRequests;
