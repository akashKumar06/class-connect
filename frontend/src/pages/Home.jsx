import Features from "../components/Features";
import Footer from "../components/Footer";
import HeroSection from "../components/HeroSection";

function Home() {
  return (
    <div className="bg-gray-50 min-h-screen">
      <HeroSection />
      <Features />
      <Footer />
    </div>
  );
}

export default Home;
