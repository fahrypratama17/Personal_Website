"use client";
import { Fragment, useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { ArrowUpRight } from "lucide-react";
import { projects } from "@/features/home/data/data";
import MagicButton from "@/shared/components/MagicButton";

gsap.registerPlugin(useGSAP, ScrollTrigger);

const HEADING = ["Featured", "Projects"];
const GITHUB_URL = "https://github.com/fahrypratama17";

const pad = (n: number) => String(n).padStart(2, "0");
const techName = (path: string) =>
  path.replace(/^\/|\.svg$/g, "").replace(/-/g, " ");

const Project = () => {
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const el = root.current;
      if (!el) return;

      const mm = gsap.matchMedia();

      mm.add(
        {
          motion: "(prefers-reduced-motion: no-preference)",
          desktop: "(min-width: 768px)",
        },
        (ctx) => {
          const { motion, desktop } = ctx.conditions as {
            motion: boolean;
            desktop: boolean;
          };
          if (!motion) return;

          gsap
            .timeline({
              defaults: { ease: "expo.out" },
              scrollTrigger: {
                trigger: "[data-proj=header]",
                start: "top 85%",
              },
            })
            .from("[data-proj=badge]", { y: 24, autoAlpha: 0, duration: 1 })
            .from(
              "[data-proj=word]",
              {
                yPercent: 120,
                rotate: 8,
                autoAlpha: 0,
                duration: 1.2,
                stagger: 0.1,
              },
              0.15,
            )
            .from(
              "[data-proj=lead]",
              { y: 20, autoAlpha: 0, duration: 1 },
              "-=0.9",
            );

          gsap.fromTo(
            "[data-proj=ghost]",
            { xPercent: 0 },
            {
              xPercent: -35,
              ease: "none",
              scrollTrigger: {
                trigger: el,
                start: "top bottom",
                end: "bottom top",
                scrub: true,
              },
            },
          );

          const cards = gsap.utils.toArray<HTMLElement>("[data-proj=card]");
          const counter = el.querySelector<HTMLElement>("[data-proj=current]");
          let currentIdx = 0;
          const setCounter = (progress: number) => {
            const idx = Math.min(
              projects.length - 1,
              Math.floor(progress * projects.length),
            );
            if (idx === currentIdx || !counter) return;
            currentIdx = idx;
            gsap
              .timeline()
              .to(counter, { yPercent: -100, autoAlpha: 0, duration: 0.15 })
              .call(() => {
                counter.textContent = pad(idx + 1);
              })
              .fromTo(
                counter,
                { yPercent: 100, autoAlpha: 0 },
                { yPercent: 0, autoAlpha: 1, duration: 0.25 },
              );
          };

          const revealContent = (
            card: HTMLElement,
            trigger: ScrollTrigger.Vars,
          ) => {
            gsap
              .timeline({
                defaults: { ease: "expo.out" },
                scrollTrigger: {
                  trigger: card,
                  toggleActions: "play none none reverse",
                  ...trigger,
                },
              })
              .from(card.querySelectorAll("[data-proj=reveal]"), {
                y: 30,
                autoAlpha: 0,
                duration: 0.9,
                stagger: 0.08,
              })
              .from(
                card.querySelectorAll("[data-proj=icon]"),
                {
                  scale: 0,
                  rotate: -90,
                  duration: 0.6,
                  stagger: 0.06,
                  ease: "back.out(2)",
                },
                0.2,
              )
              .from(
                card.querySelectorAll("[data-proj=line]"),
                { scaleX: 0, duration: 0.8, ease: "power3.inOut" },
                0.1,
              );
          };

          if (!desktop) {
            cards.forEach((card) => {
              const media = card.querySelector("[data-proj=media]");
              const img = card.querySelector("[data-proj=img]");

              gsap
                .timeline({
                  scrollTrigger: {
                    trigger: card,
                    start: "top bottom",
                    end: "top 35%",
                    scrub: 0.5,
                  },
                })
                .fromTo(
                  card,
                  { y: 60, autoAlpha: 0.3 },
                  { y: 0, autoAlpha: 1, ease: "none" },
                )
                .fromTo(
                  media,
                  { clipPath: "inset(12% 10% 12% 10% round 24px)" },
                  { clipPath: "inset(0% 0% 0% 0% round 0px)", ease: "none" },
                  0,
                )
                .fromTo(img, { scale: 1.35 }, { scale: 1.1, ease: "none" }, 0);

              revealContent(card, { start: "top 70%" });
            });
            return;
          }

          const viewport = el.querySelector<HTMLElement>(
            "[data-proj=viewport]",
          );
          const track = el.querySelector<HTMLElement>("[data-proj=track]");
          if (!viewport || !track) return;

          gsap.set(viewport, { overflow: "hidden" });
          const distance = () => track.scrollWidth - viewport.clientWidth;

          const progressBar = gsap.quickSetter(
            "[data-proj=progress]",
            "scaleX",
          );
          progressBar(0);

          const horizontal = gsap.to(track, {
            x: () => -distance(),
            ease: "none",
            scrollTrigger: {
              trigger: "[data-proj=pin]",
              pin: true,
              scrub: 1,
              start: "top top",
              end: () => `+=${distance()}`,
              invalidateOnRefresh: true,
              anticipatePin: 1,
              onUpdate: (self) => {
                progressBar(self.progress);
                setCounter(self.progress);
              },
            },
          });

          const panels = gsap.utils.toArray<HTMLElement>("[data-proj=panel]");
          panels.forEach((panel) => {
            const img = panel.querySelector("[data-proj=img]");
            const num = panel.querySelector("[data-proj=num]");
            gsap.set(panel, { transformPerspective: 1400 });

            const tl = gsap.timeline({
              defaults: { ease: "none" },
              scrollTrigger: {
                trigger: panel,
                containerAnimation: horizontal,
                start: "left right",
                end: "right left",
                scrub: true,
              },
            });
            tl.fromTo(
              panel,
              { scale: 0.82, rotationY: -14, autoAlpha: 0.35 },
              { scale: 1, rotationY: 0, autoAlpha: 1, duration: 0.4 },
            )
              .to(panel, { scale: 1, duration: 0.2 })
              .to(panel, {
                scale: 0.88,
                rotationY: 12,
                autoAlpha: 0.35,
                duration: 0.4,
              });
            if (img) {
              tl.fromTo(img, { xPercent: -8 }, { xPercent: 8, duration: 1 }, 0);
            }
            if (num) {
              tl.fromTo(
                num,
                { xPercent: 60 },
                { xPercent: -60, duration: 1 },
                0,
              );
            }
          });

          cards.forEach((card) =>
            revealContent(card, {
              containerAnimation: horizontal,
              start: "left 75%",
            }),
          );
        },
        el,
      );
    },
    { scope: root },
  );

  return (
    <section ref={root} id="project" className="section relative isolate">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-1/3 -z-10 overflow-hidden"
      >
        <p
          data-proj="ghost"
          className="font-heading text-[18vw] leading-none font-bold whitespace-nowrap text-transparent [-webkit-text-stroke:1px_rgba(255,255,255,0.06)]"
        >
          Selected Work — Selected Work — Selected Work
        </p>
      </div>

      <div
        data-proj="pin"
        className="flex flex-col justify-center gap-8 md:h-screen md:gap-10"
      >
        <header
          data-proj="header"
          className="mx-auto flex w-[90%] flex-col items-center gap-4 text-center md:w-[85%] md:flex-row md:items-end md:justify-between md:text-left"
        >
          <div className="flex flex-col items-center gap-4 md:items-start">
            <div
              data-proj="badge"
              className="font-heading flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-1.5 text-xs tracking-widest text-white/70 uppercase backdrop-blur-sm md:text-sm"
            >
              <span className="relative flex size-2">
                <span className="absolute inline-flex size-full animate-ping rounded-full bg-violet-400 opacity-60" />
                <span className="relative inline-flex size-2 rounded-full bg-violet-400" />
              </span>
              Selected Work
            </div>
            <h2 className="font-heading text-4xl leading-tight font-bold tracking-wide text-white md:text-6xl">
              {HEADING.map((word, idx) => (
                <Fragment key={word}>
                  <span className="inline-block overflow-hidden pb-2 align-bottom">
                    <span
                      data-proj="word"
                      className={
                        idx === 1
                          ? "inline-block bg-linear-to-r from-violet-300 to-sky-300 bg-clip-text text-transparent"
                          : "inline-block"
                      }
                    >
                      {word}
                    </span>
                  </span>
                  {idx < HEADING.length - 1 && " "}
                </Fragment>
              ))}
            </h2>
          </div>
          <p
            data-proj="lead"
            className="font-body max-w-sm text-base text-white/60 md:text-right md:text-lg"
          >
            A selection of things I&apos;ve built, from desktop apps to
            AI-powered platforms.
          </p>
        </header>

        <div
          data-proj="viewport"
          className="w-full md:snap-x md:snap-mandatory md:overflow-x-auto"
        >
          <div
            data-proj="track"
            className="mx-auto flex w-[90%] flex-col gap-10 md:mx-0 md:w-max md:flex-row md:gap-10 md:px-[7.5vw]"
          >
            {projects.map(({ id, title, desc, img, iconLists, link }, idx) => {
              const isRepo = link.includes("github.com");
              return (
                <div
                  key={id}
                  data-proj="panel"
                  className="md:w-[78vw] md:shrink-0 md:snap-center lg:w-[64vw] xl:w-[58vw]"
                >
                  <article
                    data-proj="card"
                    className="group bg-black-100 relative flex flex-col overflow-hidden rounded-3xl border border-white/10 transition-colors duration-300 hover:border-violet-400/30 md:grid md:h-[min(60vh,540px)] md:grid-cols-[1.35fr_1fr]"
                  >
                    <div
                      data-proj="media"
                      className="relative h-56 overflow-hidden sm:h-72 md:h-full"
                    >
                      <Image
                        data-proj="img"
                        fill
                        src={img}
                        alt={title}
                        sizes="(min-width: 768px) 45vw, 90vw"
                        className="scale-110 object-cover brightness-75 transition-[filter,scale] duration-700 group-hover:scale-125 group-hover:brightness-100"
                      />
                      <div className="from-black-100 absolute inset-0 bg-linear-to-t via-transparent to-transparent md:bg-linear-to-l" />
                    </div>

                    <div className="relative flex flex-col justify-between gap-6 overflow-hidden p-6 md:p-8">
                      <span
                        data-proj="num"
                        aria-hidden
                        className="font-heading pointer-events-none absolute -top-4 right-2 text-8xl leading-none font-bold text-transparent [-webkit-text-stroke:1px_rgba(196,181,253,0.25)] md:text-9xl"
                      >
                        {pad(idx + 1)}
                      </span>

                      <div className="relative flex flex-col gap-4">
                        <p
                          data-proj="reveal"
                          className="font-heading text-xs tracking-[0.3em] text-violet-300 uppercase"
                        >
                          Project {pad(idx + 1)}
                        </p>
                        <h3
                          data-proj="reveal"
                          className="font-heading text-2xl font-bold text-white md:text-3xl lg:text-4xl"
                        >
                          {title}
                        </h3>
                        <span
                          data-proj="line"
                          className="h-px w-16 origin-left bg-linear-to-r from-violet-400 to-sky-400"
                        />
                        <p
                          data-proj="reveal"
                          className="font-body text-base text-white/70 md:text-lg"
                        >
                          {desc}
                        </p>
                      </div>

                      <div className="relative flex flex-wrap items-center justify-between gap-4">
                        <div className="flex items-center">
                          {iconLists.map((icon, i) => (
                            <div
                              key={icon}
                              data-proj="icon"
                              title={techName(icon)}
                              className="bg-black-100 -ml-2 flex size-10 items-center justify-center rounded-full border border-white/20 first:ml-0"
                              style={{ zIndex: iconLists.length - i }}
                            >
                              <Image
                                src={icon}
                                alt={techName(icon)}
                                width={24}
                                height={24}
                                className="size-6 object-contain"
                              />
                            </div>
                          ))}
                        </div>
                        <a
                          data-proj="reveal"
                          href={link}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="group/link font-body flex items-center gap-2 text-base font-bold text-violet-300 transition-colors duration-200 hover:text-white md:text-lg"
                        >
                          {isRepo ? "View Source" : "Check Live Site"}
                          <span className="grid size-8 place-items-center rounded-full border border-violet-300/40 transition-transform duration-300 group-hover/link:rotate-45">
                            <ArrowUpRight className="size-4" />
                          </span>
                        </a>
                      </div>
                    </div>
                  </article>
                </div>
              );
            })}

            <div
              data-proj="panel"
              className="md:w-[60vw] md:shrink-0 md:snap-center lg:w-[40vw]"
            >
              <div className="relative flex h-full min-h-64 flex-col items-center justify-center gap-6 overflow-hidden rounded-3xl border border-dashed border-white/15 p-8 text-center md:h-[min(60vh,540px)]">
                <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_50%_60%,rgba(139,92,246,.18),transparent_60%)]" />
                <p className="font-heading text-3xl font-bold text-white md:text-4xl">
                  Want to see more?
                </p>
                <p className="font-body max-w-xs text-white/60">
                  More experiments and source code live on my GitHub.
                </p>
                <MagicButton
                  title="Visit GitHub"
                  position="left"
                  icon={
                    <Image
                      src="/github.svg"
                      alt=""
                      width={16}
                      height={16}
                      className="size-4"
                    />
                  }
                  className="gap-2"
                  handleClick={() =>
                    window.open(GITHUB_URL, "_blank", "noopener,noreferrer")
                  }
                />
              </div>
            </div>
          </div>
        </div>

        <div
          aria-hidden
          className="mx-auto hidden w-[85%] items-center gap-4 md:flex"
        >
          <div className="font-heading flex items-center gap-1 text-sm text-white/60 tabular-nums">
            <span className="inline-block overflow-hidden">
              <span data-proj="current" className="inline-block text-white">
                01
              </span>
            </span>
            <span>/ {pad(projects.length)}</span>
          </div>
          <div className="h-px flex-1 bg-white/10">
            <div
              data-proj="progress"
              className="h-full origin-left bg-linear-to-r from-violet-400 to-sky-400"
            />
          </div>
          <span className="font-heading text-xs tracking-[0.3em] text-white/40 uppercase">
            Scroll
          </span>
        </div>
      </div>
    </section>
  );
};

export default Project;
