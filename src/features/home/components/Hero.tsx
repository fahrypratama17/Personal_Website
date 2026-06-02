import { Spotlight } from "@/shared/components/spotlight-new";
import { cn } from "@/lib/utils";
import { TextGenerateEffect } from "@/shared/components/text-generate-effect";

const Hero = () => {
  return (
    <div className="h-full min-h-screen">
      <div>
        <Spotlight width={1000} height={2000} />
        <div className="relative flex h-full min-h-screen w-full flex-col items-center justify-center gap-4 bg-transparent">
          <div
            className={cn(
              "absolute inset-0 opacity-15",
              "[background-size:100px_100px]",
              "[background-image:linear-gradient(to_right,#e4e4e7_2px,transparent_2px),linear-gradient(to_bottom,#e4e4e7_2px,transparent_2px)]",
            )}
          />
          <div className="bg-black-100 pointer-events-none absolute inset-0 flex items-center justify-center [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)]"></div>
          <h2 className="font-heading w-[80%] text-center text-lg text-white/60 uppercase">
            Dynamic Web With Next.js
          </h2>
          <TextGenerateEffect
            className="font-heading w-[80%] text-center font-bold text-white md:text-6xl"
            words="Transforming Concepts into Seamless User Experiences"
          />
        </div>
      </div>
    </div>
  );
};

export default Hero;
