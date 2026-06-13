import { workExperience } from "@/features/home/data/data";
import { Button } from "@/shared/components/MovingBorder";

const Journey = () => {
  return (
    <section className="section" id="journey">
      <h1 className="font-heading heading text-6xl text-white">
        My Career <span className="text-violet-300">Journey</span>
      </h1>
      <div className="mx-auto mt-20 grid w-[85%] grid-cols-2 items-center justify-center gap-x-20 gap-y-12 py-12">
        {workExperience.map(({ id, title, desc, thumbnail }) => (
          <Button
            className="font-body grid w-full grid-cols-[0.3fr_1fr] gap-4 p-4"
            key={id}
          >
            <img src={thumbnail} alt={title} className="h-30 w-30" />
            <div className="flex flex-col gap-4 text-start">
              <h3 className="font-heading text-3xl font-bold">{title}</h3>

              <p className="font-heading">{desc}</p>
            </div>
          </Button>
        ))}
      </div>
    </section>
  );
};

export default Journey;
