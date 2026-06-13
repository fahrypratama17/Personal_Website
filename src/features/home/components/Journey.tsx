import { workExperience } from "@/features/home/data/data";
import { Button } from "@/shared/components/MovingBorder";

const Journey = () => {
  return (
    <section className="section" id="journey">
      <h1 className="font-heading heading text-6xl text-white">
        My Career <span className="text-violet-300">Journey</span>
      </h1>
      <div className="mx-auto mt-8 grid w-[90%] grid-cols-1 items-center justify-center gap-x-20 gap-y-6 py-12 md:mt-20 md:w-[85%] md:grid-cols-2 md:gap-y-12">
        {workExperience.map(({ id, title, desc, thumbnail }) => (
          <Button
            className="font-body flex w-full flex-col gap-4 p-4 md:grid md:grid-cols-[0.3fr_1fr]"
            key={id}
          >
            <img
              src={thumbnail}
              alt={title}
              className="h-20 w-20 md:h-30 md:w-30"
            />
            <div className="flex flex-col gap-4 text-center md:text-start">
              <h3 className="font-heading text-xl font-bold md:text-3xl">
                {title}
              </h3>

              <p className="font-heading text-sm">{desc}</p>
            </div>
          </Button>
        ))}
      </div>
    </section>
  );
};

export default Journey;
