import { useState } from "react";
import { useClasses } from "../hooks/useClasses";
import Spinner from "../components/Spinner";

function JoinClass() {
  const [searchTerm, setSearchTerm] = useState("");

  const { data: classes, isPending } = useClasses(searchTerm);

  // Handle search functionality
  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-gray-800">Join Class</h1>
          <p className="text-gray-600 mt-2">
            Search for a class and request to join. Only the CR can approve your
            request.
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
              <div
                key={cls._id}
                className="bg-white p-4 rounded-lg shadow-md hover:shadow-lg  transform transition-transform"
              >
                <h2 className="text-xl font-bold text-gray-800">{cls.name}</h2>
                <p className="text-gray-600 mb-4">
                  {cls.startYear}-{cls.endYear}
                </p>
                <p className="text-gray-600 mb-4">{cls.department}</p>
                <button className="bg-blue-500 hover:bg-blue-600 px-4 py-2 rounded-md text-white">
                  Join
                </button>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
}

export default JoinClass;
