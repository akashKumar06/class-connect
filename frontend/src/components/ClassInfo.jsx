import Spinner from "./Spinner";

function ClassInfo({ cls, classId, onJoinClass }) {
  return (
    <div
      key={cls._id}
      className="bg-white p-4 rounded-lg shadow-md hover:shadow-lg  transform transition-transform"
    >
      <h2 className="text-xl font-bold text-gray-800">{cls.name}</h2>
      <p className="text-gray-600 mb-4">
        {cls.startYear}-{cls.endYear}
      </p>
      <p className="text-gray-600 mb-4">{cls.department}</p>
      <button
        className="bg-blue-500 hover:bg-blue-600 px-4 py-2 rounded-md text-white"
        onClick={() => onJoinClass(cls._id)}
      >
        {classId === cls._id ? <Spinner /> : "Join"}
      </button>
    </div>
  );
}

export default ClassInfo;
