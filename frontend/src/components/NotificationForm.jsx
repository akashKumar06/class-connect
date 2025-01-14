function NotificationForm() {
  return (
    <form onSubmit={handlePostMessage} className="mb-6">
      <textarea
        rows="3"
        placeholder="Enter a message to notify the class..."
        className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring focus:ring-blue-300"
        value={newMessage}
        onChange={(e) => setNewMessage(e.target.value)}
      ></textarea>
      <button
        type="submit"
        className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition mt-2"
      >
        Post Message
      </button>
    </form>
  );
}

export default NotificationForm;
