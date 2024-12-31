import { Link } from "react-router";

function DashboardHeroSection() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {[
        {
          title: "Profile",
          text: "View and edit your personal information.",
          link: "/profile",
        },
        {
          title: "Resources",
          text: "Access study materials and files shared by your class.",
          link: "/resources",
        },
        {
          title: "Chat Room",
          text: "Collaborate and communicate with your classmates.",
          link: "/chat-room",
        },
        {
          title: "Join Class",
          text: "Find and request to join your class.",
          link: "/join-class",
        },
      ].map((item, index) => (
        <div
          key={index}
          className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg hover:scale-105 transform transition-transform duration-300"
        >
          <h2 className="text-xl font-bold mb-4">{item.title}</h2>
          <p className="text-gray-600">{item.text}</p>
          <Link
            to={item.link}
            className="text-green-500 mt-4 block hover:text-green-600"
          >
            {item.title === "Join Class"
              ? "Find Classes →"
              : `Go to ${item.title} →`}
          </Link>
        </div>
      ))}
    </div>
  );
}

export default DashboardHeroSection;
