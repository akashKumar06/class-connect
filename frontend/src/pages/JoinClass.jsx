import { useState } from "react";

const classesData = [
  { id: 1, name: "Mathematics 101", description: "Basic Algebra and Geometry" },
  { id: 2, name: "Physics 201", description: "Introduction to Mechanics" },
  { id: 3, name: "Chemistry 301", description: "Organic Chemistry Basics" },
  {
    id: 4,
    name: "Programming in Java",
    description: "Learn Java programming from scratch",
  },
];

function JoinClass() {
  const [classes, setClasses] = useState(classesData);
  const [searchQuery, setSearchQuery] = useState("");
  const [requestedClasses, setRequestedClasses] = useState([]);

  // Handle search functionality
  const handleSearch = (e) => {
    const query = e.target.value.toLowerCase();
    setSearchQuery(query);
    setClasses(
      classesData.filter((cls) => cls.name.toLowerCase().includes(query))
    );
  };

  // Handle join request
  const handleJoinRequest = (classId) => {
    if (requestedClasses.includes(classId)) {
      alert("You have already requested to join this class.");
      return;
    }
    setRequestedClasses([...requestedClasses, classId]);
    alert("Join request sent! Waiting for approval.");
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
            value={searchQuery}
            onChange={handleSearch}
          />
        </div>

        {/* Classes List */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {classes.length > 0 ? (
            classes.map((cls) => (
              <div
                key={cls.id}
                className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg hover:scale-105 transform transition-transform"
              >
                <h2 className="text-xl font-bold text-gray-800">{cls.name}</h2>
                <p className="text-gray-600 mb-4">{cls.description}</p>
                <button
                  className={`px-4 py-2 rounded-md text-white ${
                    requestedClasses.includes(cls.id)
                      ? "bg-gray-400 cursor-not-allowed"
                      : "bg-blue-500 hover:bg-blue-600 transition-all"
                  }`}
                  disabled={requestedClasses.includes(cls.id)}
                  onClick={() => handleJoinRequest(cls.id)}
                >
                  {requestedClasses.includes(cls.id) ? "Requested" : "Join"}
                </button>
              </div>
            ))
          ) : (
            <p className="text-gray-600 text-center">No classes found.</p>
          )}
        </div>
      </div>
    </div>
  );
}

export default JoinClass;
