import { useState } from "react";
import { useCreateFolder } from "../hooks/useCreateFolder";
import Spinner from "../components/Spinner";
import { toast } from "react-hot-toast";
import { useQueryClient } from "@tanstack/react-query";
import { useFolder } from "../hooks/useFolder";
import { Link, useSearchParams } from "react-router";
import Folders from "../components/Folders";
import { useFolderHierarchy } from "../hooks/useFolderHierarchy";
import { useUploadFile } from "../hooks/useUploadFile";
import Modal from "../components/Modal";
import UploadFile from "../components/UploadFile";
function Resources() {
  const { mutate: createFolder, isPending: isCreatingFolder } =
    useCreateFolder();
  const [folderName, setFolderName] = useState("");
  const queryClient = useQueryClient();

  const searchParams = useSearchParams();
  const { data: folder, isPending: isLoadingFolder } = useFolder();

  const { data: hierarchy } = useFolderHierarchy();

  const { mutate: uploadFile, isPending: isUploadingFile } = useUploadFile();
  const [openFileUploadModal, setOpenFileUploadModal] = useState();

  // Handle folder creation
  const handleCreateFolder = () => {
    const folder = {
      name: folderName,
    };
    createFolder(folder, {
      onSuccess: () => {
        queryClient.invalidateQueries("folder");
        toast.success("Folder created successfully");
        setFolderName("");
      },
      onError: (err) => {
        toast.error(err.msg);
      },
    });
  };

  const handleFolderClick = (id) => {
    const setSearchParams = searchParams[1];
    setSearchParams((prev) => {
      prev.set("folderId", id);
      return prev;
    });
  };

  const handleFileUpload = (data) => {
    uploadFile(data, {
      onSuccess: () => {
        queryClient.invalidateQueries("folder");
        toast.success("File uploaded successfully");
        setOpenFileUploadModal(false);
      },
      onError: (err) => {
        toast.error(err.msg);
      },
    });
  };

  if (isLoadingFolder) return <Spinner />;
  return (
    <div className="min-h-screen bg-gray-100 p-6">
      {openFileUploadModal && (
        <Modal>
          <UploadFile
            onClose={setOpenFileUploadModal}
            onSubmit={handleFileUpload}
            isUploadingFile={isUploadingFile}
          />
        </Modal>
      )}
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-8 flex justify-between items-center">
          <h1 className="text-3xl font-bold text-gray-800">Resources</h1>
          <div className="space-x-4">
            <button
              className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600 transition-all"
              onClick={() => setOpenFileUploadModal(true)}
            >
              Upload File
            </button>
            <input
              type="text"
              placeholder="New Folder Name"
              className="px-4 py-2 border rounded-md focus:outline-none focus:ring focus:ring-green-300"
              value={folderName}
              onChange={(e) => setFolderName(e.target.value)}
            />
            <button
              className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition-all"
              onClick={handleCreateFolder}
            >
              {isCreatingFolder ? <Spinner /> : "Create Folder"}
            </button>
          </div>
        </div>

        {/* Folders */}
        <div className="mb-8">
          <div>
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">
              Folders
            </h2>
            {folder.folders.length === 0 && (
              <p className="text-base font-semibold text-gray-800 mb-4">
                No Folders
              </p>
            )}

            <div className="flex items-center mb-2">
              {hierarchy?.map((folder) => (
                <div className="flex" key={folder.id}>
                  <Link
                    className=" block text-lg font-semibold text-gray-800"
                    to={`/dashboard/resources?folderId=${folder.id}`}
                  >
                    {folder.name}
                  </Link>

                  <i className="block text-2xl ri-arrow-right-s-line"></i>
                </div>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {folder.folders.map((folder) => (
              <Folders
                onFolderClick={handleFolderClick}
                key={folder._id}
                folder={folder}
              />
            ))}
          </div>
        </div>

        {/* Resources */}
        <div>
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">Files</h2>
          <div className=" flex flex-col">
            {folder.files.length === 0 && (
              <p className="text-base font-semibold text-gray-800 mb-4">
                No Files
              </p>
            )}
            {folder?.files.map((file) => (
              <div
                key={file._id}
                className="flex items-center justify-between bg-white px-2 py-1 border shadow-md "
              >
                <h3 className="text-base font-bold text-gray-800">
                  {file.original_filename}
                </h3>
                <div className="flex">
                  <a
                    href={file.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition-all"
                  >
                    View
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Resources;
