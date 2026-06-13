import { BentoGrid, BentoGridItem } from "@/shared/components/BentoGrid";
import { cn } from "@/lib/cn";
import Image from "next/image";
import { BackgroundGradientAnimation } from "@/shared/components/BackgroundGradient";
import MagicButton from "@/shared/components/MagicButton";
import { Copy } from "lucide-react";
import { GridGlobe } from "@/shared/components/GridGlobe";

export default function Grid() {
  return (
    <section className="section">
      <BentoGrid className="mx-auto mb-4 flex w-[90%] flex-col md:grid md:w-[85%] md:grid-cols-[1fr_0.7fr]">
        {items.slice(0, 3).map((item, i) => (
          <BentoGridItem
            key={i}
            title={item.title}
            header={item.header}
            className={cn(
              i === 0 ? "md:row-span-2" : "",
              "font-body overflow-hidden",
            )}
          />
        ))}
      </BentoGrid>
      <BentoGrid className="mx-auto flex w-[90%] flex-col md:grid md:w-[85%] md:grid-cols-[0.7fr_1fr]">
        {items.slice(3, 6).map((item, i) => (
          <BentoGridItem
            key={i}
            title={item.title}
            header={item.header}
            className={cn(
              i === 1 ? "md:row-span-2" : "",
              "font-body overflow-hidden",
            )}
          />
        ))}
      </BentoGrid>
    </section>
  );
}

const items = [
  {
    title: (
      <p className="bg-black-100/40 hover:bg-black-100 absolute bottom-0 left-0 m-4 w-[80%] rounded-2xl p-2 text-sm backdrop-blur-sm transition-colors duration-300 md:m-8 md:p-4 md:text-4xl">
        Transforming ideas into impactful solutions.
      </p>
    ),
    header: (
      <Image
        width="600"
        height="1000"
        alt="Pangantara"
        src="/pangantara.svg"
        className="h-full w-full rounded-2xl object-cover brightness-50 duration-200 hover:scale-105 hover:brightness-100"
      />
    ),
  },
  {
    header: <GridGlobe />,
  },
  {
    title: (
      <div className="flex flex-col justify-center gap-4 rounded-2xl p-4">
        <div>
          <p className="text-sm tracking-[0.3em] uppercase">Always evolving</p>
          <p className="text-xl md:text-2xl">and refining my craft.</p>
        </div>

        <div className="flex w-full flex-col gap-4 text-center text-sm md:text-lg">
          <div className="flex gap-4">
            {["Java", "JavaScript", "TypeScript", "Python"].map((item) => (
              <p
                key={item}
                className="w-full rounded-2xl border border-violet-500/20 bg-violet-500/5 py-2"
              >
                {item}
              </p>
            ))}
          </div>

          <div className="flex gap-4">
            {["React", "Next.js", "Three.js", "Motion"].map((item) => (
              <p
                key={item}
                className="w-full rounded-2xl border border-violet-500/20 bg-violet-500/5 py-2"
              >
                {item}
              </p>
            ))}
          </div>
        </div>
      </div>
    ),
  },
  {
    title: (
      <div className="absolute bottom-0 left-6 mx-auto flex h-50 w-[90%] flex-col items-center justify-center gap-4 overflow-hidden p-4 text-center text-lg md:bottom-8 md:left-12 md:h-auto md:w-[80%] md:text-2xl">
        <p>Developer at heart with a passion for technology.</p>
        <p className="text-sm md:text-lg">
          Bridging the gap between clean code and intuitive design.
        </p>
      </div>
    ),
    header: <div className="h-50"></div>,
  },
  {
    title: (
      <div className="bg-black-100/40 hover:bg-black-100 absolute bottom-0 left-0 m-4 w-[80%] rounded-2xl p-2 text-sm backdrop-blur-sm transition-colors duration-300 md:m-8 md:p-4 md:text-4xl">
        <p className="mb-2 text-sm tracking-[0.3em] uppercase md:mb-4 md:text-lg">
          Current Focus
        </p>
        <p>Developing a modern platform for faculty events.</p>
      </div>
    ),
    header: (
      <Image
        width="600"
        height="1000"
        alt="FilkomEvent"
        src="/filkomevent.svg"
        className="h-full w-full rounded-2xl object-cover brightness-50 duration-200 hover:scale-105 hover:brightness-100"
      />
    ),
  },
  {
    title: (
      <div className="absolute bottom-4 left-4 flex w-[90%] flex-col items-center justify-center gap-4 rounded-2xl p-4 text-center text-xl backdrop-blur-sm transition-colors duration-300 md:bottom-8 md:left-12 md:w-[80%] md:text-2xl">
        <p>Have a project in mind? Let's make it happen.</p>
        <MagicButton
          title="Copy my email address"
          icon={<Copy className="h-4 w-4" />}
          position="left"
          className="gap-2"
        />
      </div>
    ),
    header: <BackgroundGradientAnimation />,
  },
];
