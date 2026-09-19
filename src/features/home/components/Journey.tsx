"use client";
import { Fragment, useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { MotionPathPlugin } from "gsap/MotionPathPlugin";
import { DrawSVGPlugin } from "gsap/DrawSVGPlugin";
import { useGSAP } from "@gsap/react";
import { cn } from "@/lib/cn";
import { workExperience } from "@/features/home/data/data";

gsap.registerPlugin(useGSAP, ScrollTrigger, MotionPathPlugin, DrawSVGPlugin);

const HEADING = ["My", "Career", "Journey"];
const EMOJIS = ["✨", "🎉", "⭐", "💜", "🚀", "🌟"];
const CHEERS = [
  (org: string) => `Hi, ${org}! 👋`,
  (org: string) => `${org} unlocked! ✨`,
  (org: string) => `Level up at ${org}! 🚀`,
];
const FINISH_CHEER = "To be continued… 💜";

const pad = (n: number) => String(n).padStart(2, "0");
const splitTitle = (title: string) => {
  const [org, role] = title.split(" - ");
  return { org, role };
};

const Checkpoint = ({ label }: { label: string }) => (
  <div
    data-j="dot"
    className="absolute top-1/2 left-6 z-20 -translate-1/2 md:left-1/2"
  >
    <span
      data-j="ring"
      className="absolute inset-0 rounded-full border-2 border-violet-400"
    />
    <span className="bg-black-100 relative grid size-9 place-items-center rounded-full border-2 border-violet-400/60">
      <span
        data-j="dot-fill"
        className="absolute inset-1 rounded-full bg-linear-to-br from-violet-400 to-sky-400"
      />
      <span className="font-heading relative text-[10px] font-bold text-white">
        {label}
      </span>
    </span>
    <span aria-hidden className="pointer-events-none absolute top-1/2 left-1/2">
      {EMOJIS.map((emoji) => (
        <span
          key={emoji}
          data-j="emoji"
          className="invisible absolute -translate-1/2 text-lg"
        >
          {emoji}
        </span>
      ))}
    </span>
  </div>
);

const Buddy = () => (
  <div
    data-j="buddy"
    aria-hidden
    className="pointer-events-none invisible absolute top-0 left-0 z-30"
  >
    <div
      data-j="bubble"
      className="font-heading text-black-100 absolute bottom-full left-1/2 mb-2 -translate-x-1/2 rounded-2xl rounded-bl-sm bg-white px-3 py-1.5 text-xs font-bold whitespace-nowrap shadow-lg shadow-violet-500/30"
    >
      <span data-j="bubble-text" />
    </div>
    <div data-j="float">
      <div data-j="hop">
        <div data-j="body" className="origin-bottom">
          <svg
            data-j="face"
            viewBox="0 0 64 64"
            className="size-14 drop-shadow-[0_6px_16px_rgba(139,92,246,0.55)] md:size-16"
          >
            <defs>
              <linearGradient id="buddy-body" x1="0" y1="0" x2="1" y2="1">
                <stop offset="0%" stopColor="#c4b5fd" />
                <stop offset="100%" stopColor="#7dd3fc" />
              </linearGradient>
            </defs>
            <line
              x1="32"
              y1="12"
              x2="32"
              y2="4"
              stroke="#c4b5fd"
              strokeWidth="2.5"
              strokeLinecap="round"
            />
            <circle data-j="antenna" cx="32" cy="4" r="3.5" fill="#f9a8d4" />
            <path
              d="M32 12c14 0 24 10 24 24 0 13-9 22-24 22S8 49 8 36c0-14 10-24 24-24z"
              fill="url(#buddy-body)"
            />
            <ellipse
              cx="22"
              cy="42"
              rx="4"
              ry="2.5"
              fill="#f9a8d4"
              opacity=".7"
            />
            <ellipse
              cx="44"
              cy="42"
              rx="4"
              ry="2.5"
              fill="#f9a8d4"
              opacity=".7"
            />
            <g data-j="eyes">
              <ellipse cx="25" cy="33" rx="3.5" ry="4.5" fill="#000319" />
              <ellipse cx="41" cy="33" rx="3.5" ry="4.5" fill="#000319" />
              <circle cx="26.2" cy="31.5" r="1.3" fill="#fff" />
              <circle cx="42.2" cy="31.5" r="1.3" fill="#fff" />
            </g>
            <path
              d="M28 42q4 4 8 0"
              stroke="#000319"
              strokeWidth="2.2"
              fill="none"
              strokeLinecap="round"
            />
          </svg>
        </div>
      </div>
    </div>
  </div>
);

const Journey = () => {
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const el = root.current;
      const road = el?.querySelector<HTMLElement>("[data-j=road]");
      const svg = el?.querySelector<SVGSVGElement>("[data-j=svg]");
      if (!el || !road || !svg) return;

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

          const dots = gsap.utils.toArray<HTMLElement>("[data-j=dot]");
          const paths = gsap.utils.toArray<SVGPathElement>("[data-j~=path]");

          const buildRoad = () => {
            const r = road.getBoundingClientRect();
            const pts = dots.map((dot) => {
              const b = dot.getBoundingClientRect();
              return {
                x: b.left + b.width / 2 - r.left,
                y: b.top + b.height / 2 - r.top,
              };
            });
            const amp = desktop ? Math.min(r.width * 0.18, 140) : 18;
            let prev = { x: pts[0].x, y: 0 };
            let d = `M ${prev.x} ${prev.y}`;
            pts.forEach((p, i) => {
              const dy = p.y - prev.y;
              const a = i % 2 ? -amp : amp;
              d += ` C ${prev.x + a} ${prev.y + dy * 0.5}, ${p.x + a} ${p.y - dy * 0.5}, ${p.x} ${p.y}`;
              prev = p;
            });
            svg.setAttribute("viewBox", `0 0 ${r.width} ${r.height}`);
            paths.forEach((path) => path.setAttribute("d", d));
          };

          buildRoad();
          ScrollTrigger.addEventListener("refreshInit", buildRoad);
          const cleanup = () =>
            ScrollTrigger.removeEventListener("refreshInit", buildRoad);

          if (!motion) return cleanup;

          gsap
            .timeline({
              defaults: { ease: "expo.out" },
              scrollTrigger: { trigger: "[data-j=header]", start: "top 85%" },
            })
            .from("[data-j=badge]", { y: 24, autoAlpha: 0, duration: 1 })
            .from(
              "[data-j=word]",
              {
                yPercent: 120,
                rotate: 8,
                autoAlpha: 0,
                duration: 1.2,
                stagger: 0.08,
              },
              0.15,
            )
            .from(
              "[data-j=lead]",
              { y: 20, autoAlpha: 0, duration: 1 },
              "-=0.9",
            );

          const finish = dots[dots.length - 1];
          const roadScroll = {
            trigger: road,
            start: "top 60%",
            endTrigger: finish,
            end: "center 60%",
            scrub: 1,
            invalidateOnRefresh: true,
          };

          gsap.fromTo(
            "[data-j~=trail]",
            { drawSVG: "0%" },
            { drawSVG: "100%", ease: "none", scrollTrigger: roadScroll },
          );

          const buddy = el.querySelector<HTMLElement>("[data-j=buddy]");
          const body = el.querySelector("[data-j=body]");
          const face = el.querySelector("[data-j=face]");
          const hop = el.querySelector("[data-j=hop]");
          const bubble = el.querySelector("[data-j=bubble]");
          const bubbleText = el.querySelector("[data-j=bubble-text]");
          if (!buddy || !body || !face || !hop || !bubble || !bubbleText) {
            return cleanup;
          }

          gsap.set(buddy, { autoAlpha: 1 });
          gsap.set(bubble, {
            scale: 0,
            autoAlpha: 0,
            transformOrigin: "20% 100%",
          });

          const tilt = gsap.quickTo(body, "rotation", {
            duration: 0.4,
            ease: "power3",
          });
          const squashY = gsap.quickTo(body, "scaleY", {
            duration: 0.3,
            ease: "power3",
          });
          const squashX = gsap.quickTo(body, "scaleX", {
            duration: 0.3,
            ease: "power3",
          });
          const faceTo = gsap.quickTo(face, "scaleX", {
            duration: 0.35,
            ease: "back.out(3)",
          });

          const settle = gsap
            .delayedCall(0.15, () => {
              tilt(0);
              squashY(1);
              squashX(1);
            })
            .pause();

          let lastX = 0;
          gsap.to(buddy, {
            ease: "none",
            motionPath: {
              path: "[data-j~=trail]",
              align: "[data-j~=trail]",
              alignOrigin: [0.5, 0.5],
            },
            scrollTrigger: {
              ...roadScroll,
              onUpdate: (self) => {
                const v = gsap.utils.clamp(-1, 1, self.getVelocity() / 2500);
                tilt(v * 14);
                squashY(1 + Math.abs(v) * 0.22);
                squashX(1 - Math.abs(v) * 0.14);
                settle.restart(true);

                const x = Number(gsap.getProperty(buddy, "x"));
                if (Math.abs(x - lastX) > 1) faceTo(x > lastX ? 1 : -1);
                lastX = x;
              },
            },
          });

          const idle = [
            gsap.to("[data-j=float]", {
              y: -6,
              duration: 1.2,
              ease: "sine.inOut",
              repeat: -1,
              yoyo: true,
            }),
            gsap.to("[data-j=eyes]", {
              scaleY: 0.1,
              transformOrigin: "50% 50%",
              duration: 0.08,
              repeat: -1,
              yoyo: true,
              repeatDelay: 2.6,
            }),
            gsap.to("[data-j=antenna]", {
              x: 2,
              duration: 0.3,
              ease: "sine.inOut",
              repeat: -1,
              yoyo: true,
            }),
          ];
          ScrollTrigger.create({
            trigger: el,
            start: "top bottom",
            end: "bottom top",
            onToggle: ({ isActive }) =>
              idle.forEach((t) => t.paused(!isActive)),
          });

          let hideBubble: gsap.core.Tween | undefined;
          const say = (text: string) => {
            bubbleText.textContent = text;
            hideBubble?.kill();
            gsap.fromTo(
              bubble,
              { scale: 0, autoAlpha: 0, rotation: -10 },
              {
                scale: 1,
                autoAlpha: 1,
                rotation: 0,
                duration: 0.5,
                ease: "back.out(3)",
                overwrite: true,
              },
            );
            hideBubble = gsap.to(bubble, {
              scale: 0,
              autoAlpha: 0,
              duration: 0.3,
              delay: 1.8,
              ease: "back.in(2)",
            });
          };

          const celebrate = (dot: HTMLElement, text: string) => {
            gsap
              .timeline()
              .to(hop, { y: -22, duration: 0.25, ease: "power2.out" })
              .to(hop, { y: 0, duration: 0.6, ease: "bounce.out" });

            gsap.fromTo(
              dot.querySelector("[data-j=ring]"),
              { scale: 1, autoAlpha: 1 },
              { scale: 2.4, autoAlpha: 0, duration: 0.9, ease: "power2.out" },
            );

            const emojis = dot.querySelectorAll("[data-j=emoji]");
            gsap
              .timeline()
              .fromTo(
                emojis,
                { x: 0, y: 0, scale: 0, rotation: 0, autoAlpha: 1 },
                {
                  x: (i) =>
                    Math.cos((i / emojis.length) * Math.PI * 2 - 1.2) *
                    gsap.utils.random(40, 70),
                  y: (i) =>
                    Math.sin((i / emojis.length) * Math.PI * 2 - 1.2) *
                      gsap.utils.random(40, 70) -
                    20,
                  rotation: () => gsap.utils.random(-60, 60),
                  scale: 1.2,
                  duration: 0.8,
                  ease: "expo.out",
                },
              )
              .to(emojis, { autoAlpha: 0, scale: 0.4, duration: 0.4 }, 0.5);

            say(text);
          };

          dots.forEach((dot, i) => {
            const isFinish = i === dots.length - 1;
            const org = isFinish ? "" : splitTitle(workExperience[i].title).org;
            const text = isFinish
              ? FINISH_CHEER
              : CHEERS[i % CHEERS.length](org);

            gsap.fromTo(
              dot.querySelector("[data-j=dot-fill]"),
              { scale: 0 },
              {
                scale: 1,
                duration: 0.6,
                ease: "back.out(3)",
                scrollTrigger: {
                  trigger: dot,
                  start: "center 60%",
                  toggleActions: "play none none reverse",
                  onEnter: () => celebrate(dot, text),
                },
              },
            );
          });

          gsap.utils
            .toArray<HTMLElement>("[data-j=card]")
            .forEach((card, i) => {
              const side = desktop && i % 2 ? 1 : -1;
              gsap
                .timeline({
                  scrollTrigger: {
                    trigger: card,
                    start: "top 80%",
                    toggleActions: "play none none reverse",
                  },
                })
                .from(card, {
                  x: 80 * side,
                  y: 40,
                  rotation: 10 * side,
                  scale: 0.8,
                  autoAlpha: 0,
                  duration: 1,
                  ease: "elastic.out(1, 0.6)",
                })
                .from(
                  card.querySelector("[data-j=logo]"),
                  {
                    scale: 0,
                    rotation: -180,
                    duration: 0.8,
                    ease: "back.out(2)",
                  },
                  0.15,
                )
                .from(
                  card.querySelectorAll("[data-j=reveal]"),
                  { y: 20, autoAlpha: 0, duration: 0.6, stagger: 0.08 },
                  0.25,
                );
            });

          return cleanup;
        },
        el,
      );
    },
    { scope: root },
  );

  return (
    <section ref={root} className="section relative isolate" id="journey">
      <header
        data-j="header"
        className="mx-auto mb-12 flex w-[90%] flex-col items-center gap-4 text-center md:mb-16 md:w-[70%]"
      >
        <div
          data-j="badge"
          className="font-heading flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-1.5 text-xs tracking-widest text-white/70 uppercase backdrop-blur-sm md:text-sm"
        >
          <span className="relative flex size-2">
            <span className="absolute inline-flex size-full animate-ping rounded-full bg-violet-400 opacity-60" />
            <span className="relative inline-flex size-2 rounded-full bg-violet-400" />
          </span>
          Experience
        </div>
        <h2 className="font-heading text-4xl leading-tight font-bold tracking-wide text-white md:text-6xl">
          {HEADING.map((word, idx) => (
            <Fragment key={word}>
              <span className="inline-block overflow-hidden pb-2 align-bottom">
                <span
                  data-j="word"
                  className={
                    idx === HEADING.length - 1
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
        <p
          data-j="lead"
          className="font-body max-w-xl text-base text-white/60 md:text-lg"
        >
          Every chapter taught me something new. Scroll along and follow the
          little buddy!
        </p>
      </header>

      <div data-j="road" className="relative mx-auto w-[90%] md:w-[80%]">
        <svg
          data-j="svg"
          aria-hidden
          className="pointer-events-none absolute inset-0 h-full w-full overflow-visible"
        >
          <defs>
            <linearGradient id="journey-trail" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#a78bfa" />
              <stop offset="100%" stopColor="#7dd3fc" />
            </linearGradient>
          </defs>
          <path
            data-j="path"
            fill="none"
            stroke="rgba(255,255,255,0.12)"
            strokeWidth="3"
            strokeDasharray="2 12"
            strokeLinecap="round"
          />
          <path
            data-j="path trail"
            fill="none"
            stroke="url(#journey-trail)"
            strokeWidth="4"
            strokeLinecap="round"
          />
        </svg>

        <Buddy />

        {workExperience.map(({ id, title, desc, thumbnail }, i) => {
          const { org, role } = splitTitle(title);
          return (
            <div
              key={id}
              className="relative flex py-10 pl-14 md:py-16 md:pl-0"
            >
              <Checkpoint label={pad(i + 1)} />
              <div
                data-j="card"
                className={cn(
                  "relative z-10 w-full md:w-[calc(50%-3.5rem)]",
                  i % 2 && "md:ml-auto",
                )}
              >
                <article
                  className={cn(
                    "group rounded-3xl border border-white/10 bg-white/3 p-6 backdrop-blur-md transition-[rotate,border-color] duration-500 hover:rotate-0 hover:border-violet-400/40 md:p-8",
                    i % 2 ? "md:rotate-2" : "md:-rotate-2",
                  )}
                >
                  <div className="mb-5 flex items-center gap-4">
                    <div data-j="logo" className="shrink-0">
                      <div className="bg-black-100 grid size-16 place-items-center rounded-2xl border border-white/10 transition-transform duration-500 group-hover:scale-110 group-hover:-rotate-6 md:size-20">
                        <Image
                          src={thumbnail}
                          alt={org}
                          width={64}
                          height={64}
                          className="size-12 object-contain md:size-14"
                        />
                      </div>
                    </div>
                    <div className="flex flex-col gap-1">
                      <p
                        data-j="reveal"
                        className="font-heading text-[10px] tracking-[0.3em] text-violet-300 uppercase md:text-xs"
                      >
                        Chapter {pad(i + 1)}
                      </p>
                      <h3
                        data-j="reveal"
                        className="font-heading text-2xl font-bold text-white md:text-3xl"
                      >
                        {org}
                      </h3>
                    </div>
                  </div>
                  {role && (
                    <span
                      data-j="reveal"
                      className="font-body mb-3 inline-block rounded-full border border-sky-300/30 bg-sky-300/10 px-3 py-1 text-xs font-semibold text-sky-200"
                    >
                      {role}
                    </span>
                  )}
                  <p
                    data-j="reveal"
                    className="font-body text-sm leading-relaxed text-white/70 md:text-base"
                  >
                    {desc}
                  </p>
                </article>
              </div>
            </div>
          );
        })}

        <div className="relative flex py-14 pl-14 md:justify-center md:pt-24 md:pl-0">
          <Checkpoint label="🏁" />
          <p className="font-heading text-sm text-white/50 md:mt-16 md:text-base">
            …and the journey continues
          </p>
        </div>
      </div>
    </section>
  );
};

export default Journey;
