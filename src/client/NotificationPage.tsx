import TopMenu from "./components/TopMenu";

const NotificationPage = () => {
  const notifications = [
    {
      id: "1",
      message: "You have a new follower",
      time: "2 hours ago",
      read: false
    },
    {
      id: "2",
      message: "Your post has been liked",
      time: "5 hours ago",
      read: true
    },
    {
      id: "3",
      message: "You have been challenged to a game",
      time: "10 hours ago",
      read: false
    }
    // Add more notifications
  ];

  const handleAcceptChallenge = (notificationId: string) => {
    // Logic to accept the challenge
    console.log("Challenge accepted for notification ID:", notificationId);
  };

  const handleDeclineChallenge = (notificationId: string) => {
    // Logic to decline the challenge
    console.log("Challenge declined for notification ID:", notificationId);
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <TopMenu />
      <div className="mx-auto max-w-screen-lg p-4">
        {notifications.map((notification) => (
          <div
            key={notification.id}
            className={`mb-4 rounded-lg bg-white p-4 ${
              notification.read ? "" : "border-blue-500 border"
            }`}
          >
            <p>{notification.message}</p>
            <p className="text-gray-600">{notification.time}</p>
            {notification.message === "You have been challenged to a game" && (
              <div className="mt-4">
                <button
                  className="bg-green-500 hover:bg-green-600 mr-2 rounded px-4 py-2 font-bold text-white"
                  onClick={() => handleAcceptChallenge(notification.id)}
                >
                  Accept
                </button>
                <button
                  className="bg-red-500 hover:bg-red-600 rounded px-4 py-2 font-bold text-white"
                  onClick={() => handleDeclineChallenge(notification.id)}
                >
                  Decline
                </button>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default NotificationPage;
