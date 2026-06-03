import { Spotlight } from "@/shared/components/SpotlightNew";
import { cn } from "@/lib/utils";
import { TextGenerateEffect } from "@/shared/components/TextGenerateEffect";
import MagicButton from "@/shared/components/MagicButton";
import { MoveUpRight } from "lucide-react";

const Hero = () => {
  return (
    <div className="h-full min-h-screen">
      <div>
        <Spotlight
          width={800}
          height={1200}
          gradientFirst="radial-gradient(68.54% 68.72% at 55.02% 31.46%, rgba(96,165,250,.14) 0%, rgba(59,130,246,.08) 40%, transparent 100%)"
          gradientSecond="radial-gradient(50% 50% at 50% 50%, rgba(147,197,253,.12) 0%, rgba(59,130,246,.05) 70%, transparent 100%)"
          gradientThird="radial-gradient(50% 50% at 50% 50%, rgba(168,85,247,.18) 0%, rgba(147,51,234,.06) 70%, transparent 100%)"
        />
        <div className="relative flex h-full min-h-screen w-full flex-col items-center justify-center gap-4 bg-transparent">
          <div
            className={cn(
              "absolute inset-0 opacity-5",
              "bg-size-[100px_100px]",
              "bg-[linear-gradient(to_right,#e4e4e7_2.5px,transparent_2.5px),linear-gradient(to_bottom,#e4e4e7_2.5px,transparent_2.5px)]",
            )}
          />
          <div className="bg-black-100 pointer-events-none absolute inset-0 flex items-center justify-center mask-[radial-gradient(ellipse_at_center,transparent_5%,black)]"></div>
          <h2 className="font-heading w-[80%] text-center text-sm tracking-widest text-white/60 uppercase">
            Dynamic Web Magic With Next.js
          </h2>
          <TextGenerateEffect
            className="font-heading w-[60%] text-center font-bold text-white md:text-6xl"
            words="Transforming Concepts into Seamless User Experiences"
          />
          <p className="font-heading mb-6 w-full text-center text-3xl text-white">
            Hi, I&apos;m Fahry, a Full{" "}
            <span className="text-white/80">Stack Developer</span> based on
            Indonesia
          </p>
          <MagicButton
            title="Show my work"
            position="right"
            icon={<MoveUpRight className="h-4 w-4" />}
            className="gap-2"
          />
        </div>
      </div>
    </div>
  );
};

export default Hero;
