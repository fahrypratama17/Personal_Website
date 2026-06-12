import { MoveUpRight } from "lucide-react";
import MagicButton from "@/shared/components/MagicButton";
import { socialMedia } from "@/features/home/data/data";

const Footer = () => {
  return (
    <footer className="w-full pt-40 pb-10" id="contact">
      <div className="absolute -bottom-72 left-0 min-h-96 w-full">
        <img
          src="/footer-grid.svg"
          alt="grid"
          className="h-full w-full opacity-50"
        />
      </div>

      <div className="mx-auto flex w-[85%] flex-col items-center">
        <h1 className="heading font-heading text-white lg:max-w-[45vw]">
          Ready to take <span className="text-violet-300">your</span> digital
          presence to the next level?
        </h1>
        <p className="font-heading my-5 text-center text-white md:mt-10">
          Reach out to me today and let&apos;s discuss how I can help you
          achieve your goals.
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
      <div className="font-body mx-auto mt-16 flex w-[80%] flex-col items-center justify-between md:flex-row">
        <p className="text-sm font-light text-white md:text-base md:font-normal">
          Copyright &copy; {new Date().getFullYear()} Muhamad Fahry Pratama
          Putra
        </p>

        <div className="flex items-center gap-6 md:gap-3">
          {socialMedia.map((info) => (
            <div
              key={info.id}
              className="bg-opacity-75 bg-black-200 border-black-300 flex h-10 w-10 cursor-pointer items-center justify-center rounded-lg border saturate-180 backdrop-blur-lg backdrop-filter"
            >
              <img src={info.img} alt="icons" width={20} height={20} />
            </div>
          ))}
        </div>
      </div>
    </footer>
  );
};

export default Footer;
