import { useState } from "react";
import MessageContainer from "../components/MessageContainer";

const usersData = [
  { id: 1, username: "john_doe", name: "John Doe" },
  { id: 2, username: "jane_smith", name: "Jane Smith" },
  { id: 3, username: "mike_jones", name: "Mike Jones" },
  { id: 4, username: "sara_lee", name: "Sara Lee" },
];

function ChatRoom() {
  return (
    <div className="min-h-screen bg-gray-100 flex">
      {/* Sidebar */}
      <div className="w-1/4 bg-white shadow-lg p-6">
        <h2 className="text-xl font-bold mb-4">Friends</h2>
        {/* <ul className="space-y-4">
          {friends.map((friend) => (
            <li
              key={friend.id}
              className={`p-3 rounded-lg cursor-pointer hover:bg-blue-100 transition ${
                selectedFriend?.id === friend.id ? "bg-blue-200 font-bold" : ""
              }`}
              onClick={() => selectFriend(friend)}
            >
              {friend.name}
            </li>
          ))}
        </ul> */}

        {/* Search Users */}
        <div className="mt-6">
          <h3 className="text-lg font-bold mb-2">Search Students</h3>
          <input
            type="text"
            placeholder="Enter username..."
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring focus:ring-blue-300"
          />
          {/* <ul className="mt-4 space-y-2">
            {searchResults.map((user) => (
              <li
                key={user.id}
                className="p-3 bg-gray-200 rounded-lg flex justify-between items-center"
              >
                <span>
                  {user.name} (@{user.username})
                </span>
                <button
                  className="bg-blue-500 text-white px-4 py-1 rounded-lg hover:bg-blue-600 transition"
                  onClick={() => addFriend(user)}
                >
                  Add
                </button>
              </li>
            ))}
          </ul> */}
        </div>
      </div>
      <MessageContainer />
    </div>
  );
}

export default ChatRoom;
