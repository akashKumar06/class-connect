import { useState } from "react";

function Resources() {
  const [resources, setResources] = useState([
    {
      id: 1,
      title: "Mathematics Notes - Algebra",
      description:
        "Comprehensive notes on Algebra covering key concepts and examples.",
      fileUrl: "/resources/algebra-notes.pdf",
    },
    {
      id: 2,
      title: "Physics Lecture - Kinematics",
      description: "Recorded lecture on the basics of Kinematics.",
      fileUrl: "/resources/kinematics-lecture.mp4",
    },
  ]);

  const [folders, setFolders] = useState([
    { id: 1, name: "Mathematics" },
    { id: 2, name: "Physics" },
  ]);

  const [showUploadModal, setShowUploadModal] = useState(false);
  const [newFolderName, setNewFolderName] = useState("");

  // Handle folder creation
  const handleCreateFolder = () => {
    if (newFolderName.trim() === "") return;
    const newFolder = { id: folders.length + 1, name: newFolderName };
    setFolders([...folders, newFolder]);
    setNewFolderName("");
    alert("Folder created successfully!");
  };

  // Handle file upload (mock implementation)
  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setResources([
        ...resources,
        {
          id: resources.length + 1,
          title: file.name,
          description: "Uploaded file",
          fileUrl: URL.createObjectURL(file),
        },
      ]);
      alert("File uploaded successfully!");
    }
    setShowUploadModal(false);
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-8 flex justify-between items-center">
          <h1 className="text-3xl font-bold text-gray-800">Resources</h1>
          <div className="space-x-4">
            <button
              className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600 transition-all"
              onClick={() => setShowUploadModal(true)}
            >
              Upload File
            </button>
            <input
              type="text"
              placeholder="New Folder Name"
              className="px-4 py-2 border rounded-md focus:outline-none focus:ring focus:ring-green-300"
              value={newFolderName}
              onChange={(e) => setNewFolderName(e.target.value)}
            />
            <button
              className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition-all"
              onClick={handleCreateFolder}
            >
              Create Folder
            </button>
          </div>
        </div>

        {/* Folders */}
        <div className="mb-8">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">Folders</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {folders.map((folder) => (
              <div
                key={folder.id}
                className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg hover:scale-105 transform transition-transform"
              >
                <h3 className="text-lg font-bold text-gray-800">
                  {folder.name}
                </h3>
              </div>
            ))}
          </div>
        </div>

        {/* Resources */}
        <div>
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">Files</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {resources.map((resource) => (
              <div
                key={resource.id}
                className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg hover:scale-105 transform transition-transform"
              >
                <h3 className="text-xl font-bold text-gray-800 mb-2">
                  {resource.title}
                </h3>
                <p className="text-gray-600 mb-4">{resource.description}</p>
                <div className="flex space-x-4">
                  <a
                    href={resource.fileUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition-all"
                  >
                    View
                  </a>
                  <a
                    href={resource.fileUrl}
                    download
                    className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600 transition-all"
                  >
                    Download
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Upload File Modal */}
      {showUploadModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded-lg shadow-lg w-96">
            <h2 className="text-xl font-bold mb-4">Upload File</h2>
            <input
              type="file"
              className="block w-full text-gray-700 px-4 py-2 border rounded-lg focus:outline-none focus:ring focus:ring-green-300"
              onChange={handleFileUpload}
            />
            <button
              className="mt-4 bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600 transition-all"
              onClick={() => setShowUploadModal(false)}
            >
              Cancel
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default Resources;
