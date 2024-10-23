import Faq from "./_components/Faq";
import Footer from "./_components/Footer";
import Founder from "./_components/Founder";
import Hero from "./_components/Hero";
import JoiningPlatform from "./_components/JoiningPlatform";
import Navbar from "./_components/Navbar";
import OurTeam from "./_components/OurTeam";
import Packages from "./_components/Packages";
import VantaBackground from "./_components/VantaBackground";

export default function Home() {
  return (
    <main className="flex min-h-screen w-screen overflow-hidden  flex-col">
      <Hero />
      <JoiningPlatform />
      <Packages />
      <Founder />
      <OurTeam />
      <Faq />
      <Footer/>
    </main>
  );
}
