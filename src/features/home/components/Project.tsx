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
      <div className="mx-auto mt-20 grid w-[85%] grid-cols-2 items-center justify-center gap-x-20 gap-y-12 py-12">
        {projects.map(({ id, title, desc, img, iconLists, link }) => (
          <Card
            key={id}
            className="h-full rounded-2xl border bg-transparent p-0 text-white"
          >
            <CardHeader className="p-0">
              <img
                src={img}
                alt="Projects"
                className="h-80 w-full overflow-hidden object-cover"
              />
              <h3 className="font-heading mt-6 px-8 text-3xl font-bold">
                {title}
              </h3>
            </CardHeader>
            <CardContent className="px-8">
              <p className="font-body text-2xl text-white/80">{desc}</p>
            </CardContent>
            <CardFooter className="font-body my-auto mb-8 flex items-center justify-between border-0 bg-transparent">
              <div className="flex items-center px-4">
                {iconLists.map((icon, index) => (
                  <div
                    key={index}
                    className="flex h-10 w-10 items-center justify-center rounded-full border border-white/80 bg-transparent"
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
                className="flex items-center gap-2 text-2xl font-bold text-violet-300 transition-colors duration-200 hover:text-violet-600"
              >
                Check Live Site <ArrowUpRight className="h-8 w-8" />
              </a>
            </CardFooter>
          </Card>
        ))}
      </div>
    </section>
  );
};

export default Project;
