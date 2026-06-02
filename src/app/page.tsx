import Hero from "@/features/home/components/Hero";

const page = () => {
  return (
    <main className="bg-black-100 relative flex flex-col items-center justify-center overflow-hidden">
      <div className="w-full">
        <Hero />
      </div>
    </main>
  );
};

export default page;
