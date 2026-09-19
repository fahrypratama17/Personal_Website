"use client";
import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { MoveUpRight } from "lucide-react";
import { cn } from "@/lib/cn";
import MagicButton from "@/shared/components/MagicButton";

gsap.registerPlugin(useGSAP, ScrollTrigger);

const HEADLINE = "Crafting Digital Products From Concept to Code".split(" ");
const ACCENT_FROM = 3;

const Hero = () => {
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const el = root.current;
      if (!el) return;

      gsap.set(el, { autoAlpha: 1 });
      gsap.set("[data-hero=orb]", { xPercent: -50, yPercent: -50 });

      const mm = gsap.matchMedia();

      mm.add(
        {
          motion: "(prefers-reduced-motion: no-preference)",
          finePointer: "(pointer: fine)",
        },
        (ctx) => {
          const { motion, finePointer } = ctx.conditions as {
            motion: boolean;
            finePointer: boolean;
          };
          if (!motion) return;

          let inView = true;
          const intro = gsap.timeline({
            defaults: { ease: "expo.out" },
            onComplete: () => {
              if (inView) ambient.play();
            },
          });
          intro
            .from("[data-hero=grid]", { autoAlpha: 0, scale: 1.1, duration: 2 })
            .from(
              "[data-hero=orb]",
              { autoAlpha: 0, scale: 0.6, duration: 2, stagger: 0.2 },
              0,
            )
            .from(
              "[data-hero=badge]",
              { y: 24, autoAlpha: 0, duration: 1 },
              0.2,
            )
            .from(
              "[data-hero=word]",
              {
                yPercent: 120,
                rotate: 8,
                autoAlpha: 0,
                duration: 1.2,
                stagger: 0.07,
              },
              0.35,
            )
            .from(
              "[data-hero=subtitle]",
              { y: 24, autoAlpha: 0, duration: 1 },
              "-=0.8",
            )
            .from(
              "[data-hero=underline]",
              { scaleX: 0, duration: 0.9, ease: "power3.inOut" },
              "-=0.5",
            )
            .from(
              "[data-hero=cta]",
              { y: 20, scale: 0.9, autoAlpha: 0, duration: 1 },
              "-=0.7",
            )
            .from(
              "[data-hero=scroll]",
              { y: -12, autoAlpha: 0, duration: 0.8 },
              "-=0.5",
            );

          const ambient = gsap.timeline({
            repeat: -1,
            yoyo: true,
            paused: true,
          });
          ambient
            .to("[data-hero=orb]", {
              x: (i) => (i % 2 ? -80 : 80),
              y: (i) => (i % 2 ? 50 : -40),
              scale: (i) => (i % 2 ? 1.15 : 0.9),
              duration: 8,
              ease: "sine.inOut",
            })
            .to(
              "[data-hero=accent]",
              {
                backgroundPosition: "200% 50%",
                duration: 8,
                ease: "none",
              },
              0,
            );

          const scrollDot = gsap.to("[data-hero=scroll-dot]", {
            y: 10,
            autoAlpha: 0,
            duration: 1.4,
            ease: "power2.in",
            repeat: -1,
          });

          ScrollTrigger.create({
            trigger: el,
            start: "top bottom",
            end: "bottom top",
            onToggle: ({ isActive }) => {
              inView = isActive;
              if (intro.isActive()) return;
              ambient.paused(!isActive);
              scrollDot.paused(!isActive);
            },
          });

          gsap.to("[data-hero=content]", {
            y: -120,
            scale: 0.95,
            autoAlpha: 0,
            ease: "none",
            scrollTrigger: {
              trigger: el,
              start: "top top",
              end: "bottom top",
              scrub: true,
            },
          });
          gsap.to("[data-hero=bg]", {
            yPercent: 25,
            ease: "none",
            scrollTrigger: {
              trigger: el,
              start: "top top",
              end: "bottom top",
              scrub: true,
            },
          });

          if (!finePointer) return;

          const layers = gsap.utils
            .toArray<HTMLElement>("[data-depth]")
            .map((layer) => ({
              depth: Number(layer.dataset.depth),
              x: gsap.quickTo(layer, "x", { duration: 1, ease: "power3" }),
              y: gsap.quickTo(layer, "y", { duration: 1, ease: "power3" }),
            }));

          const onMove = (e: PointerEvent) => {
            const nx = e.clientX / window.innerWidth - 0.5;
            const ny = e.clientY / window.innerHeight - 0.5;
            layers.forEach(({ depth, x, y }) => {
              x(nx * depth);
              y(ny * depth);
            });
          };

          const cta = el.querySelector<HTMLElement>("[data-hero=magnet]");
          const ctaX =
            cta && gsap.quickTo(cta, "x", { duration: 0.5, ease: "power3" });
          const ctaY =
            cta && gsap.quickTo(cta, "y", { duration: 0.5, ease: "power3" });

          const onCtaMove = (e: PointerEvent) => {
            if (!cta || !ctaX || !ctaY) return;
            const rect = cta.getBoundingClientRect();
            ctaX((e.clientX - rect.left - rect.width / 2) * 0.35);
            ctaY((e.clientY - rect.top - rect.height / 2) * 0.35);
          };
          const onCtaLeave = () => {
            ctaX?.(0);
            ctaY?.(0);
          };

          el.addEventListener("pointermove", onMove);
          cta?.addEventListener("pointermove", onCtaMove);
          cta?.addEventListener("pointerleave", onCtaLeave);

          return () => {
            el.removeEventListener("pointermove", onMove);
            cta?.removeEventListener("pointermove", onCtaMove);
            cta?.removeEventListener("pointerleave", onCtaLeave);
          };
        },
        el,
      );
    },
    { scope: root },
  );

  const scrollToProjects = () => {
    document.getElementById("project")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section
      ref={root}
      className="invisible relative flex min-h-screen w-full items-center justify-center overflow-hidden"
    >
      <div
        data-hero="bg"
        aria-hidden
        className="pointer-events-none absolute inset-0"
      >
        <div data-depth="-20" className="absolute inset-0">
          <div
            data-hero="grid"
            className={cn(
              "absolute inset-0 opacity-[0.07]",
              "bg-size-[100px_100px]",
              "bg-[linear-gradient(to_right,#e4e4e7_2px,transparent_2px),linear-gradient(to_bottom,#e4e4e7_2px,transparent_2px)]",
              "mask-[radial-gradient(ellipse_at_center,black_10%,transparent_70%)]",
            )}
          />
        </div>
        <div data-depth="60" className="absolute inset-0">
          <div
            data-hero="orb"
            className="absolute top-[30%] left-[35%] size-144 rounded-full bg-[radial-gradient(circle,rgba(139,92,246,.22)_0%,transparent_65%)] will-change-transform md:size-192"
          />
          <div
            data-hero="orb"
            className="absolute top-[65%] left-[68%] size-120 rounded-full bg-[radial-gradient(circle,rgba(59,130,246,.18)_0%,transparent_65%)] will-change-transform md:size-160"
          />
        </div>
      </div>

      <div
        data-hero="content"
        className="relative z-10 flex w-full flex-col items-center gap-4 px-4 md:gap-6"
      >
        <div
          data-hero="badge"
          className="font-heading flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-1.5 text-xs tracking-widest text-white/70 uppercase backdrop-blur-sm md:text-sm"
        >
          <span className="relative flex size-2">
            <span className="absolute inline-flex size-full animate-ping rounded-full bg-violet-400 opacity-60" />
            <span className="relative inline-flex size-2 rounded-full bg-violet-400" />
          </span>
          Building Modern Web Application
        </div>

        <h1 className="font-heading w-full text-center text-4xl leading-tight font-bold tracking-wide text-white md:w-[70%] md:text-7xl">
          {HEADLINE.map((word, idx) => (
            <span
              key={word + idx}
              className="inline-block overflow-hidden pb-2 align-bottom"
            >
              <span
                data-hero="word"
                className="inline-block will-change-transform"
              >
                {idx >= ACCENT_FROM ? (
                  <span
                    data-hero="accent"
                    className="bg-linear-to-r from-violet-300 via-sky-300 to-violet-300 bg-size-[200%_auto] bg-clip-text text-transparent"
                  >
                    {word}
                  </span>
                ) : (
                  word
                )}
              </span>
              {idx < HEADLINE.length - 1 && " "}
            </span>
          ))}
        </h1>

        <p
          data-hero="subtitle"
          className="font-body mb-4 w-[90%] text-center text-lg text-white/80 md:w-full md:text-2xl"
        >
          Hi, I&apos;m{" "}
          <span className="relative inline-block font-semibold text-white">
            Fahry
            <span
              data-hero="underline"
              className="absolute -bottom-1 left-0 h-0.5 w-full origin-left rounded-full bg-linear-to-r from-violet-400 to-sky-400"
            />
          </span>
          , a Full Stack Developer based in Indonesia
        </p>

        <div data-hero="cta">
          <div data-hero="magnet" className="p-4">
            <MagicButton
              title="Explore My Work"
              position="right"
              icon={<MoveUpRight className="h-4 w-4" />}
              className="gap-2"
              handleClick={scrollToProjects}
            />
          </div>
        </div>
      </div>

      <div
        data-hero="scroll"
        aria-hidden
        className="absolute bottom-8 left-1/2 flex -translate-x-1/2 flex-col items-center gap-2 text-[10px] tracking-[0.3em] text-white/40 uppercase"
      >
        <div className="flex h-9 w-5 justify-center rounded-full border border-white/20 pt-2">
          <span
            data-hero="scroll-dot"
            className="size-1 rounded-full bg-white/70"
          />
        </div>
        Scroll
      </div>
    </section>
  );
};

export default Hero;
