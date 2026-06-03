import { BentoGrid, BentoGridItem } from "@/shared/components/BentoGrid";
import { cn } from "@/lib/cn";
import Image from "next/image";
import { BackgroundGradientAnimation } from "@/shared/components/BackgroundGradient";
import MagicButton from "@/shared/components/MagicButton";
import { Copy } from "lucide-react";
import { GridGlobe } from "@/shared/components/GridGlobe";

export default function Grid() {
  return (
    <section id="project" className="section">
      <BentoGrid className="mx-auto mb-4 max-w-7xl md:grid-cols-[1fr_0.7fr]">
        {items.slice(0, 3).map((item, i) => (
          <BentoGridItem
            key={i}
            title={item.title}
            description={item.description}
            header={item.header}
            className={cn(i === 0 ? "md:row-span-2" : "", "font-body")}
          />
        ))}
      </BentoGrid>
      <BentoGrid className="mx-auto max-w-7xl md:grid-cols-[0.7fr_1fr]">
        {items.slice(3, 6).map((item, i) => (
          <BentoGridItem
            key={i}
            title={item.title}
            description={item.description}
            header={item.header}
            className={cn(i === 1 ? "md:row-span-2" : "", "font-body")}
          />
        ))}
      </BentoGrid>
    </section>
  );
}

const items = [
  {
    title: (
      <p className="bg-black-100/40 hover:bg-black-100 absolute bottom-0 left-0 m-8 w-[80%] rounded-2xl p-4 text-4xl backdrop-blur-sm transition-colors duration-300">
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
    title: "The Digital Revolutison",
    description: "Dive into the transformative power of technology.",
    header: <GridGlobe />,
  },
  {
    title: "The Art of Design",
    description: "Discover the beauty of thoughtful and functional design.",
    header: <></>,
  },
  {
    title: "The Power of Communication",
    description:
      "Understand the impact of effective communication in our lives.",
    header: <></>,
  },
  {
    title: (
      <div className="bg-black-100/40 hover:bg-black-100 absolute bottom-0 left-0 m-8 w-[80%] rounded-2xl p-4 text-4xl backdrop-blur-sm transition-colors duration-300">
        <p className="mb-4 text-lg tracking-[0.3em] uppercase">Current Focus</p>
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
      <div className="absolute bottom-8 left-12 flex w-[80%] flex-col items-center justify-center gap-4 rounded-2xl p-4 text-center text-2xl backdrop-blur-sm transition-colors duration-300">
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
