import { Link } from "react-router";

function HeroSection() {
  return (
    <div className="flex flex-col md:flex-row items-center justify-between bg-green-500 text-white p-8 md:p-16">
      <div className="max-w-md md:max-w-lg">
        <h1 className="text-4xl md:text-5xl font-bold mb-4">
          Welcome to ClassConnect
        </h1>
        <p className="text-lg md:text-xl mb-6">
          Organize your learning, connect with your class, and stay on track!
        </p>
        <div className="space-x-4">
          <Link
            to="/signup"
            className="bg-white text-green-500 px-6 py-3 rounded-full shadow-lg hover:bg-gray-100"
          >
            Get Started
          </Link>
          <button className="bg-transparent border-2 border-white px-6 py-3 rounded-full hover:bg-white hover:text-green-500">
            Learn More
          </button>
        </div>
      </div>
      <div className="mt-8 md:mt-0">
        <img
          src="/collab.png"
          alt="Collaboration Illustration"
          className="w-full max-w-sm md:max-w-md"
        />
      </div>
    </div>
  );
}

export default HeroSection;
