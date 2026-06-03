import { BentoGrid, BentoGridItem } from "@/shared/components/BentoGrid";
import { Home } from "lucide-react";
import { cn } from "@/lib/utils";

export default function Grid() {
  return (
    <section className="section">
      <BentoGrid className="mx-auto mb-4 max-w-7xl md:grid-cols-[1fr_0.7fr]">
        {items.slice(0, 3).map((item, i) => (
          <BentoGridItem
            key={i}
            title={item.title}
            description={item.description}
            header={item.header}
            icon={item.icon}
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
            icon={item.icon}
            className={cn(i === 1 ? "md:row-span-2" : "", "font-body")}
          />
        ))}
      </BentoGrid>
    </section>
  );
}
const Skeleton = () => (
  <div className="flex h-full min-h-24 w-full flex-1 rounded-xl bg-linear-to-br from-neutral-200 to-neutral-100 dark:from-neutral-900 dark:to-neutral-800"></div>
);
const items = [
  {
    title: "The Dawn of Innovation",
    description: "Explore the birth of groundbreaking ideas and inventions.",
    header: <Skeleton />,
    icon: <Home className="h-4 w-4 text-neutral-500" />,
  },
  {
    title: "The Digital Revolution",
    description: "Dive into the transformative power of technology.",
    header: <Skeleton />,
    icon: <Home className="h-4 w-4 text-neutral-500" />,
  },
  {
    title: "The Art of Design",
    description: "Discover the beauty of thoughtful and functional design.",
    header: <Skeleton />,
    icon: <Home className="h-4 w-4 text-neutral-500" />,
  },
  {
    title: "The Power of Communication",
    description:
      "Understand the impact of effective communication in our lives.",
    header: <Skeleton />,
    icon: <Home className="h-4 w-4 text-neutral-500" />,
  },
  {
    title: "The Pursuit of Knowledge",
    description: "Join the quest for understanding and enlightenment.",
    header: <Skeleton />,
    icon: <Home className="h-4 w-4 text-neutral-500" />,
  },
  {
    title: "The Pursuit of Knowledge",
    description: "Join the quest for understanding and enlightenment.",
    header: <Skeleton />,
    icon: <Home className="h-4 w-4 text-neutral-500" />,
  },
];
