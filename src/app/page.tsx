import Hero from "@/features/home/components/Hero";

const page = () => {
  return (
    <main className="bg-black-100 relative flex flex-col items-center justify-center overflow-hidden px-5 sm:px-10">
      <div className="w-full max-w-7xl">
        <Hero />
      </div>
    </main>
  );
};

export default page;
