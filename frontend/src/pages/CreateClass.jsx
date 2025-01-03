import { useState } from "react";

function CreateClass() {
  const [className, setClassName] = useState("");
  const [startYear, setStartYear] = useState("");
  const [endYear, setEndYear] = useState("");
  const [branch, setBranch] = useState("");
  const [message, setMessage] = useState("");

  const handleCreateClass = (e) => {
    e.preventDefault();

    if (!className || !startYear || !endYear || !branch) {
      setMessage("Please fill out all fields.");
      return;
    }

    if (parseInt(startYear) >= parseInt(endYear)) {
      setMessage("Start year must be less than end year.");
      return;
    }

    // Simulate API call
    setMessage(`Class "${className}" created successfully!`);
    setClassName("");
    setStartYear("");
    setEndYear("");
    setBranch("");
  };

  return (
    <div className="min-h-screen bg-gray-100 flex justify-center items-center">
      <div className="bg-white shadow-md rounded-lg p-8 w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-center">Create a Class</h2>
        <form onSubmit={handleCreateClass} className="space-y-4">
          {/* Class Name */}
          <div>
            <label className="block font-medium mb-2" htmlFor="className">
              Class Unique Name
            </label>
            <input
              type="text"
              id="className"
              placeholder="Enter unique class name"
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring focus:ring-blue-300"
              value={className}
              onChange={(e) => setClassName(e.target.value)}
            />
          </div>

          {/* Start Year */}
          <div>
            <label className="block font-medium mb-2" htmlFor="startYear">
              Start Year
            </label>
            <input
              type="number"
              id="startYear"
              placeholder="Enter start year"
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring focus:ring-blue-300"
              value={startYear}
              onChange={(e) => setStartYear(e.target.value)}
            />
          </div>

          {/* End Year */}
          <div>
            <label className="block font-medium mb-2" htmlFor="endYear">
              End Year
            </label>
            <input
              type="number"
              id="endYear"
              placeholder="Enter end year"
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring focus:ring-blue-300"
              value={endYear}
              onChange={(e) => setEndYear(e.target.value)}
            />
          </div>

          {/* Branch/Department */}
          <div>
            <label className="block font-medium mb-2" htmlFor="branch">
              Branch/Department
            </label>
            <select
              id="branch"
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring focus:ring-blue-300"
              value={branch}
              onChange={(e) => setBranch(e.target.value)}
            >
              <option value="">Select a branch</option>
              <option value="Computer Science">Computer Science</option>
              <option value="Electronics">Electronics</option>
              <option value="Mechanical">Mechanical</option>
            </select>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition"
          >
            Create Class
          </button>

          {/* Message */}
          {message && (
            <p
              className={`mt-4 text-center font-medium ${
                message.includes("successfully")
                  ? "text-green-600"
                  : "text-red-600"
              }`}
            >
              {message}
            </p>
          )}
        </form>
      </div>
    </div>
  );
}

export default CreateClass;
