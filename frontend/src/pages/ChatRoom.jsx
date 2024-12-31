import { useState } from "react";

const usersData = [
  { id: 1, username: "john_doe", name: "John Doe" },
  { id: 2, username: "jane_smith", name: "Jane Smith" },
  { id: 3, username: "mike_jones", name: "Mike Jones" },
  { id: 4, username: "sara_lee", name: "Sara Lee" },
];

function ChatRoom() {
  const [friends, setFriends] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [messages, setMessages] = useState([]);
  const [selectedFriend, setSelectedFriend] = useState(null);
  const [newMessage, setNewMessage] = useState("");

  // Search for users
  const searchResults = usersData.filter(
    (user) =>
      user.username.toLowerCase().includes(searchQuery.toLowerCase()) &&
      !friends.some((friend) => friend.id === user.id)
  );

  // Add a user to the friend list
  const addFriend = (user) => {
    setFriends([...friends, user]);
    alert(`${user.name} has been added to your friend list.`);
    setSearchQuery("");
  };

  // Select a friend to chat with
  const selectFriend = (friend) => {
    setSelectedFriend(friend);
  };

  // Send a message
  const sendMessage = () => {
    if (newMessage.trim() === "") return;

    setMessages([
      ...messages,
      {
        id: messages.length + 1,
        sender: "You",
        text: newMessage,
        friendId: selectedFriend.id,
      },
    ]);
    setNewMessage("");
  };

  const filteredMessages = messages.filter(
    (msg) => msg.friendId === selectedFriend?.id
  );

  return (
    <div className="min-h-screen bg-gray-100 flex">
      {/* Sidebar */}
      <div className="w-1/4 bg-white shadow-lg p-6">
        <h2 className="text-xl font-bold mb-4">Friends</h2>
        <ul className="space-y-4">
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
        </ul>
        {/* Search Users */}
        <div className="mt-6">
          <h3 className="text-lg font-bold mb-2">Search Students</h3>
          <input
            type="text"
            placeholder="Enter username..."
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring focus:ring-blue-300"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <ul className="mt-4 space-y-2">
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
          </ul>
        </div>
      </div>

      {/* Chat Area */}
      <div className="w-3/4 flex flex-col">
        {/* Chat Header */}
        <div className="bg-blue-500 text-white p-4 font-bold text-lg">
          {selectedFriend ? selectedFriend.name : "Select a friend to chat"}
        </div>

        {/* Messages */}
        <div className="flex-1 p-6 overflow-y-auto">
          {selectedFriend ? (
            filteredMessages.length > 0 ? (
              filteredMessages.map((msg) => (
                <div
                  key={msg.id}
                  className={`mb-4 ${
                    msg.sender === "You" ? "text-right" : "text-left"
                  }`}
                >
                  <div
                    className={`inline-block px-4 py-2 rounded-lg ${
                      msg.sender === "You"
                        ? "bg-blue-500 text-white"
                        : "bg-gray-200 text-gray-800"
                    }`}
                  >
                    <span className="block">{msg.text}</span>
                  </div>
                </div>
              ))
            ) : (
              <p className="text-gray-500 text-center">No messages yet.</p>
            )
          ) : (
            <p className="text-gray-500 text-center">
              Please select a friend to chat with.
            </p>
          )}
        </div>

        {/* Input Box */}
        {selectedFriend && (
          <div className="bg-gray-200 p-4">
            <div className="flex items-center space-x-4">
              <input
                type="text"
                placeholder="Type a message..."
                className="flex-1 px-4 py-2 border rounded-lg focus:outline-none focus:ring focus:ring-blue-300"
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
              />
              <button
                onClick={sendMessage}
                className="bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600 transition"
              >
                Send
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default ChatRoom;
