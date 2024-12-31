function Features() {
  const features = [
    {
      title: "File Management",
      description: "Organize your study materials in one place.",
    },
    {
      title: "Class Creation",
      description: "CRs can create and manage class groups effortlessly.",
    },
    {
      title: "Join Requests",
      description: "Request to join classes and collaborate with peers.",
    },
    {
      title: "Chat Feature",
      description: "Real-time communication with your classmates.",
    },
  ];

  return (
    <div className="py-12 bg-white">
      <h2 className="text-3xl md:text-4xl font-bold text-center mb-8">
        Features
      </h2>
      <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4 px-6 md:px-12">
        {features.map((feature, index) => (
          <div
            key={index}
            className="bg-gray-100 p-6 rounded-lg shadow-md hover:shadow-lg transition"
          >
            <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
            <p className="text-gray-600">{feature.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Features;
