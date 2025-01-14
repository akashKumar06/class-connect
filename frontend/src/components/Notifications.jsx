function Notifications() {
  return (
    <ul className="space-y-3">
      {/* {notifications.length > 0 ? (
        notifications.map((notification) => (
          <li
            key={notification.id}
            className="bg-white p-3 rounded-lg shadow-sm border"
          >
            <p className="text-gray-800">{notification.message}</p>
            <p className="text-gray-500 text-sm">
              {new Date(notification.timestamp).toLocaleDateString()}
            </p>
          </li>
        ))
      ) : (
        <p className="text-gray-600">No notifications available.</p>
      )} */}
    </ul>
  );
}

export default Notifications;
