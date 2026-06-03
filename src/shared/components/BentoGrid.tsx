import { cn } from "@/lib/cn";

export const BentoGrid = ({
  className,
  children,
}: {
  className?: string;
  children?: React.ReactNode;
}) => {
  return (
    <div
      className={cn("grid grid-cols-1 gap-4 md:auto-rows-[14rem]", className)}
    >
      {children}
    </div>
  );
};

export const BentoGridItem = ({
  className,
  title,
  description,
  header,
}: {
  className?: string;
  title?: string | React.ReactNode;
  description?: string | React.ReactNode;
  header?: React.ReactNode;
}) => {
  return (
    <div
      className={cn(
        "group/bento shadow-input bg-black-100 relative row-span-1 flex flex-col justify-between overflow-hidden rounded-3xl border border-neutral-200 transition duration-200 hover:shadow-lg",
        className,
      )}
    >
      {header}
      <div className="transition duration-200 group-hover/bento:translate-x-2">
        <div className="font-sans font-bold text-white">{title}</div>
        <div className="font-sans text-xs font-normal text-white">
          {description}
        </div>
      </div>
    </div>
  );
};
