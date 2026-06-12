import { FloatingNav } from "@/shared/components/FloatingNavbar";
import Hero from "@/features/home/components/Hero";
import Grid from "@/features/home/components/Grid";
import { Home } from "lucide-react";
import RecentProject from "@/features/home/components/RecentProject";
import Experience from "@/features/home/components/Experience";
import Journey from "@/features/home/components/Journey";
import Footer from "@/features/home/components/Footer";

const page = () => {
  return (
    <main className="bg-black-100 relative flex flex-col items-center justify-center overflow-hidden">
      <div className="w-full">
        <FloatingNav
          className="font-heading"
          navItems={[
            { name: "Home", link: "/", icon: <Home /> },
            { name: "Project", link: "/#project", icon: <Home /> },
          ]}
        />
        <Hero />
        <Grid />
        <RecentProject />
        <Experience />
        <Journey />
        <Footer />
      </div>
    </main>
  );
};

export default page;
