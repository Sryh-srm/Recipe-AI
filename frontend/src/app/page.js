import Navbar from "./components/Navbar";
import HeroSection from "./components/HeroSection";
import FeatureCards from "./components/FeatureCards";
import Footer from "./components/Footer";

export default function HomePage() {
  return (
    <>
      {/* Ambient background orbs */}
      <div aria-hidden="true">
        <div className="orb orb-purple-primary" />
        <div className="orb orb-purple-secondary" />
        <div className="orb orb-blue" />
      </div>

      {/* Page content */}
      <Navbar />

      <main id="main-content" className="relative z-10 flex-1 flex flex-col">
        <HeroSection />
        <FeatureCards />
      </main>

      <Footer />
    </>
  );
}
