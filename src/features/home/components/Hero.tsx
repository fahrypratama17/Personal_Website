import { Spotlight } from "@/shared/components/spotlight-new";

const Hero = () => {
  return (
    <div className="h-full min-h-screen">
      <div>
        <Spotlight width={1000} height={2000} />
        <h1 className="font-heading text-white">Halo Dunia</h1>
      </div>
    </div>
  );
};

export default Hero;
