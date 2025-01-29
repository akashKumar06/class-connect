import { useQueryClient } from "@tanstack/react-query";
import { useGetMessage } from "../hooks/message/useGetMessage";
import Spinner from "./Spinner";

const MessageContainer = () => {
  const queryClient = useQueryClient();
  const currentUser = queryClient.getQueryData(["user"]);
  const { data: messages, isPending } = useGetMessage(
    "67978873bc2abb0673e0e3be"
  );

  if (isPending) return <Spinner />;
  console.log(currentUser);
  return (
    <div className="flex flex-col w-full h-full overflow-y-auto bg-gray-100 p-4 rounded-lg shadow-lg">
      {messages.map((message, index) => (
        <div
          key={index}
          className={`flex ${
            message.senderId === currentUser._id
              ? "justify-end"
              : "justify-start"
          } mb-4`}
        >
          <div
            className={`${
              message.senderId === currentUser._id
                ? "bg-blue-500 text-white"
                : "bg-gray-300 text-gray-900"
            } max-w-xs p-3 rounded-lg`}
          >
            <p className="text-sm">{message.message}</p>
            <span className="text-xs text-gray-600 mt-1 block">
              {message.timestamp}
            </span>
          </div>
        </div>
      ))}
    </div>
  );
};

export default MessageContainer;
