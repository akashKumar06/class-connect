function Folders({ folder, onFolderClick }) {
  return (
    <div
      onDoubleClick={() => onFolderClick(folder._id)}
      className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg hover:scale-105 transform transition-transform"
    >
      <h3 className="text-lg font-bold text-gray-800">📁{folder.name}</h3>
    </div>
  );
}

export default Folders;
