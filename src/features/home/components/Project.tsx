import { projects } from "@/features/home/data/data";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/shared/components/Card";
import { ArrowUpRight } from "lucide-react";

const Project = () => {
  return (
    <section className="section" id="project">
      <h1 className="font-heading heading text-6xl text-white">
        Featured <span className="text-violet-300">Projects</span>
      </h1>
      <div className="mx-auto mt-8 grid w-[90%] grid-cols-1 items-center justify-center gap-x-20 gap-y-6 py-12 md:mt-20 md:w-[85%] md:grid-cols-2 md:gap-y-12">
        {projects.map(({ id, title, desc, img, iconLists, link }) => (
          <Card
            key={id}
            className="h-full rounded-2xl border bg-transparent p-0 text-white"
          >
            <CardHeader className="p-0">
              <img
                src={img}
                alt="Projects"
                className="h-40 w-full overflow-hidden object-cover md:h-80"
              />
              <h3 className="font-heading mt-3 px-4 text-xl font-bold md:mt-6 md:px-8 md:text-3xl">
                {title}
              </h3>
            </CardHeader>
            <CardContent className="px-4 md:px-8">
              <p className="font-body text-sm text-white/80 md:text-2xl">
                {desc}
              </p>
            </CardContent>
            <CardFooter className="font-body my-auto mb-4 flex items-center justify-between border-0 bg-transparent md:mb-8">
              <div className="flex items-center md:px-4">
                {iconLists.map((icon, index) => (
                  <div
                    key={index}
                    className="flex h-8 w-8 items-center justify-center rounded-full border border-white/80 bg-transparent md:h-10 md:w-10"
                  >
                    <img
                      src={icon}
                      alt="tech stack"
                      className="h-6 w-6 object-contain"
                    />
                  </div>
                ))}
              </div>
              <a
                href={link}
                target="_blank"
                className="flex items-center gap-2 text-lg font-bold text-violet-300 transition-colors duration-200 hover:text-violet-600 md:text-2xl"
              >
                Check Live Site{" "}
                <ArrowUpRight className="h-6 w-6 md:h-8 md:w-8" />
              </a>
            </CardFooter>
          </Card>
        ))}
      </div>
    </section>
  );
};

export default Project;
