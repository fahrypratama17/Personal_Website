import { FloatingNav } from "@/shared/components/FloatingNavbar";
import { navItems } from "@/features/home/data/data";
import Hero from "@/features/home/components/Hero";
import Grid from "@/features/home/components/Grid";
import Project from "@/features/home/components/Project";
import Journey from "@/features/home/components/Journey";
import Reality from "@/features/home/components/Reality";
import Footer from "@/features/home/components/Footer";

const page = () => {
  return (
    <main className="bg-black-100 relative flex flex-col items-center justify-center overflow-hidden">
      <div className="w-full">
        <FloatingNav navItems={navItems} />
        <Hero />
        <Grid />
        <Project />
        <Journey />
        <Reality />
        <Footer />
      </div>
    </main>
  );
};

export default page;
