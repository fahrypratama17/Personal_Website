import { MoveUpRight } from "lucide-react";
import MagicButton from "@/shared/components/MagicButton";
import { socialMedia } from "@/features/home/data/data";

const Footer = () => {
  return (
    <footer
      className="relative flex h-[80vh] w-full flex-col justify-between pt-20 pb-30 md:min-h-screen md:pt-40"
      id="contact"
    >
      <div className="absolute left-0 min-h-96 w-full md:-bottom-18">
        <img
          src="/footer-grid.svg"
          alt="grid"
          className="h-full w-full opacity-50"
        />
      </div>

      <div className="mx-auto flex w-[85%] flex-col items-center gap-4">
        <h1 className="font-heading text-center text-2xl leading-tight font-bold text-white md:text-5xl lg:max-w-[45vw]">
          Have an <span className="text-violet-300">idea</span> worth turning
          into reality together?
        </h1>
        <p className="font-heading my-5 text-center text-sm text-white md:mt-10 md:text-lg">
          Reach out today and let&apos;s talk about how we can bring your ideas
          to life.
        </p>
        <a href="mailto:contact@m.fahry.pratama.putra@gmail.com">
          <MagicButton
            title="Let's get in touch"
            position="right"
            icon={<MoveUpRight className="h-4 w-4" />}
            className="gap-2"
          />
        </a>
      </div>
      <div className="font-body mx-auto flex w-[80%] flex-col items-center justify-between md:flex-row">
        <p className="text-sm font-light text-white md:text-base md:font-normal">
          Copyright &copy; {new Date().getFullYear()} Muhamad Fahry Pratama
          Putra
        </p>

        <div className="mt-12 flex items-center gap-6 md:mt-0 md:gap-3">
          {socialMedia.map((info) => (
            <a
              key={info.id}
              href={info.link}
              target="_blank"
              className="bg-opacity-75 bg-black-200 border-black-300 flex h-10 w-10 cursor-pointer items-center justify-center rounded-lg border saturate-180 backdrop-blur-lg backdrop-filter"
            >
              <img src={info.img} alt="icons" width={20} height={20} />
            </a>
          ))}
        </div>
      </div>
    </footer>
  );
};

export default Footer;
