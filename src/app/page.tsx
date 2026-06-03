import Hero from "@/features/home/components/Hero";
import { FloatingNav } from "@/shared/components/FloatingNavbar";
import { Home } from "lucide-react";

const page = () => {
  return (
    <main className="bg-black-100 relative flex flex-col items-center justify-center overflow-hidden">
      <div className="w-full">
        <FloatingNav navItems={[{ name: "Home", link: "/", icon: <Home /> }]} />
        <Hero />
      </div>
    </main>
  );
};

export default page;
