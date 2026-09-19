"use client";
import { Fragment, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { Cog, Rocket, Search, Sparkle } from "lucide-react";
import { cn } from "@/lib/cn";

gsap.registerPlugin(useGSAP, ScrollTrigger);

const HEADING = "How I Turn Ideas into Reality".split(" ");
const ACCENT_FROM = 4;
const CONFETTI = ["✨", "💡", "🎉", "⭐", "💛", "🚀", "🌟", "💜"];
const BULB_DIM = "#e9d5ff";
const BULB_LIT = "#fde047";

const PHASES = [
  {
    order: "Phase 1",
    emoji: "🔍",
    title: "Research & Strategy",
    desc: "I begin by understanding the project's goals, target users, and technical requirements. This phase lays the foundation for building meaningful and effective digital solutions.",
    say: "Hmm, what do users need? 🤔",
    hex: "#34d399",
    scene: "from-emerald-500/25 to-emerald-900/10",
    text: "text-emerald-300",
  },
  {
    order: "Phase 2",
    emoji: "🛠️",
    title: "Build & Iterate",
    desc: "Turning concepts into reality, I develop features incrementally while continuously refining the user experience, code quality, and overall system architecture.",
    say: "Let's build it! 🔨",
    hex: "#f472b6",
    scene: "from-pink-500/25 to-pink-900/10",
    text: "text-pink-300",
  },
  {
    order: "Phase 3",
    emoji: "🚀",
    title: "Launch & Improve",
    desc: "After rigorous testing and optimization, I deploy the application and monitor its performance, making improvements to ensure long-term scalability and success.",
    say: "Ready for launch! 🚀",
    hex: "#38bdf8",
    scene: "from-sky-500/25 to-sky-900/10",
    text: "text-sky-300",
  },
];

const ResearchScene = () => (
  <>
    {[
      "left-[18%] top-[22%] -rotate-6 bg-yellow-200",
      "left-[42%] top-[48%] rotate-3 bg-pink-200",
      "left-[64%] top-[18%] rotate-6 bg-sky-200",
    ].map((cls) => (
      <div key={cls} className={cn("absolute size-12 rounded-md", cls)}>
        <div data-r="note" className="flex h-full flex-col gap-1.5 p-2">
          <span className="h-1 w-full rounded-full bg-black/20" />
          <span className="h-1 w-2/3 rounded-full bg-black/20" />
          <span className="h-1 w-3/4 rounded-full bg-black/20" />
        </div>
      </div>
    ))}
    <div className="absolute top-1/2 left-1/2 -translate-1/2">
      <Search
        data-r="glass"
        className="size-14 text-white drop-shadow-[0_4px_12px_rgba(0,0,0,0.5)]"
        strokeWidth={2.5}
      />
    </div>
  </>
);

const BuildScene = () => (
  <>
    <div className="absolute top-[18%] left-[14%]">
      <Cog data-r="gear" className="size-16 text-pink-200" />
    </div>
    <div className="absolute top-[50%] left-[32%]">
      <Cog data-r="gear" className="size-10 text-pink-300" />
    </div>
    <div className="absolute top-1/2 right-[12%] flex w-[40%] -translate-y-1/2 flex-col gap-2 rounded-xl border border-white/10 bg-black/30 p-3">
      {["w-full", "w-3/4", "w-5/6", "w-1/2"].map((w, i) => (
        <span
          key={w}
          data-r="bar"
          className={cn(
            "h-1.5 origin-left rounded-full",
            w,
            i % 2 ? "bg-pink-300/80" : "bg-white/60",
          )}
        />
      ))}
    </div>
  </>
);

const LaunchScene = () => (
  <>
    {[
      "left-[15%] top-[20%]",
      "left-[80%] top-[30%]",
      "left-[25%] top-[70%]",
      "left-[72%] top-[72%]",
    ].map((pos) => (
      <div key={pos} className={cn("absolute", pos)}>
        <Sparkle data-r="star" className="size-4 fill-sky-100 text-sky-100" />
      </div>
    ))}
    <div className="absolute top-[40%] left-1/2 -translate-1/2">
      {[0, 1, 2, 3].map((i) => (
        <span
          key={i}
          data-r="puff"
          className="absolute top-10 left-1/2 size-5 -translate-x-1/2 rounded-full bg-white/70"
        />
      ))}
      <div data-r="rocket">
        <Rocket className="size-14 -rotate-45 fill-sky-300/40 text-white" />
      </div>
    </div>
  </>
);

const SCENES = [ResearchScene, BuildScene, LaunchScene];

const Bulby = () => (
  <div
    data-r="bulb"
    aria-hidden
    className="pointer-events-none absolute bottom-0 left-0 z-20"
  >
    <span className="pointer-events-none absolute top-[40%] left-1/2">
      {CONFETTI.map((c) => (
        <span
          key={c}
          data-r="confetti"
          className="invisible absolute -translate-1/2 text-lg"
        >
          {c}
        </span>
      ))}
    </span>
    <div
      data-r="glow"
      className="invisible absolute top-[38%] left-1/2 size-40 -translate-1/2 rounded-full bg-[radial-gradient(circle,rgba(253,224,71,.45),transparent_65%)]"
    />
    <div data-r="float">
      <div data-r="hop" className="relative">
        <div
          data-r="bubble"
          className="font-heading text-black-100 absolute bottom-full left-1/2 z-10 mb-2 -translate-x-1/2 rounded-2xl rounded-bl-sm bg-white px-3 py-1.5 text-xs font-bold whitespace-nowrap shadow-lg shadow-violet-500/30"
        >
          <span data-r="bubble-text" />
        </div>
        <svg
          data-r="body"
          viewBox="0 0 64 80"
          className="relative size-20 overflow-visible drop-shadow-[0_8px_18px_rgba(139,92,246,0.45)]"
        >
          <g
            data-r="rays"
            stroke="#fde047"
            strokeWidth="3"
            strokeLinecap="round"
          >
            {Array.from({ length: 8 }, (_, i) => {
              const a = (i / 8) * Math.PI * 2;
              return (
                <line
                  key={i}
                  x1={32 + Math.cos(a) * 30}
                  y1={30 + Math.sin(a) * 30}
                  x2={32 + Math.cos(a) * 38}
                  y2={30 + Math.sin(a) * 38}
                />
              );
            })}
          </g>
          <path
            data-r="glass-fill"
            d="M32 6c13 0 23 10 23 23 0 8-4 13-8 17-3 3-4 6-4 9H21c0-3-1-6-4-9-4-4-8-9-8-17C9 16 19 6 32 6z"
            fill={BULB_DIM}
          />
          <rect x="21" y="57" width="22" height="5" rx="2" fill="#94a3b8" />
          <rect x="22" y="63" width="20" height="5" rx="2" fill="#64748b" />
          <rect x="26" y="69" width="12" height="4" rx="2" fill="#475569" />
          <ellipse
            cx="21"
            cy="36"
            rx="3.5"
            ry="2"
            fill="#f9a8d4"
            opacity=".8"
          />
          <ellipse
            cx="43"
            cy="36"
            rx="3.5"
            ry="2"
            fill="#f9a8d4"
            opacity=".8"
          />
          <g data-r="eyes">
            <ellipse cx="25" cy="28" rx="3" ry="4" fill="#000319" />
            <ellipse cx="39" cy="28" rx="3" ry="4" fill="#000319" />
            <circle cx="26" cy="26.5" r="1.1" fill="#fff" />
            <circle cx="40" cy="26.5" r="1.1" fill="#fff" />
          </g>
          <path
            d="M28 36q4 4 8 0"
            stroke="#000319"
            strokeWidth="2"
            fill="none"
            strokeLinecap="round"
          />
        </svg>
      </div>
    </div>
  </div>
);

const Reality = () => {
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
              scrollTrigger: { trigger: "[data-r=header]", start: "top 85%" },
            })
            .from("[data-r=badge]", { y: 24, autoAlpha: 0, duration: 1 })
            .from(
              "[data-r=word]",
              {
                yPercent: 120,
                rotate: 8,
                autoAlpha: 0,
                duration: 1.2,
                stagger: 0.07,
              },
              0.15,
            )
            .from(
              "[data-r=lead]",
              { y: 20, autoAlpha: 0, duration: 1 },
              "-=0.9",
            );

          gsap.from("[data-r=enter]", {
            y: 80,
            rotation: (i) => [-8, 0, 8][i % 3],
            autoAlpha: 0,
            duration: 1,
            stagger: 0.12,
            ease: "back.out(1.6)",
            scrollTrigger: { trigger: "[data-r=stage]", start: "top 80%" },
          });

          const cards = gsap.utils.toArray<HTMLElement>("[data-r=card]");
          const scenes = cards.map((card) => gsap.utils.selector(card));

          const loops = [
            (() => {
              const q = scenes[0];
              return gsap
                .timeline({ repeat: -1, paused: true })
                .to(q("[data-r=glass]"), {
                  keyframes: [
                    { x: -55, y: -18, rotation: -10 },
                    { x: 5, y: 18, rotation: 8 },
                    { x: 60, y: -22, rotation: -6 },
                    { x: 0, y: 0, rotation: 0 },
                  ],
                  duration: 2.8,
                  ease: "sine.inOut",
                })
                .to(
                  q("[data-r=note]"),
                  {
                    y: -6,
                    rotation: 6,
                    duration: 0.25,
                    stagger: 0.7,
                    yoyo: true,
                    repeat: 1,
                    ease: "power2.out",
                  },
                  0.4,
                );
            })(),
            (() => {
              const q = scenes[1];
              return gsap
                .timeline({ repeat: -1, paused: true })
                .to(
                  q("[data-r=gear]"),
                  {
                    rotation: (i) => (i ? -540 : 360),
                    duration: 3,
                    ease: "none",
                  },
                  0,
                )
                .fromTo(
                  q("[data-r=bar]"),
                  { scaleX: 0.15 },
                  {
                    scaleX: 1,
                    duration: 0.6,
                    stagger: 0.25,
                    ease: "steps(8)",
                    yoyo: true,
                    repeat: 1,
                  },
                  0,
                );
            })(),
            (() => {
              const q = scenes[2];
              return gsap
                .timeline({ repeat: -1, paused: true })
                .to(
                  q("[data-r=rocket]"),
                  {
                    keyframes: [
                      { x: -2, y: -4 },
                      { x: 2, y: -8 },
                      { x: -1, y: -4 },
                      { x: 0, y: 0 },
                    ],
                    duration: 1.6,
                    ease: "sine.inOut",
                  },
                  0,
                )
                .fromTo(
                  q("[data-r=puff]"),
                  { y: 0, scale: 0.4, autoAlpha: 0.9 },
                  {
                    y: 46,
                    x: (i) => [-14, 10, -6, 16][i % 4],
                    scale: 1.6,
                    autoAlpha: 0,
                    duration: 1.2,
                    stagger: 0.3,
                    ease: "power1.out",
                  },
                  0,
                )
                .fromTo(
                  q("[data-r=star]"),
                  { scale: 0.4, autoAlpha: 0.3 },
                  {
                    scale: 1.2,
                    autoAlpha: 1,
                    duration: 0.4,
                    stagger: 0.2,
                    yoyo: true,
                    repeat: 1,
                  },
                  0,
                );
            })(),
          ];

          const bulb = el.querySelector<HTMLElement>("[data-r=bulb]");
          const bubble = el.querySelector("[data-r=bubble]");
          const bubbleText = el.querySelector("[data-r=bubble-text]");
          const track = el.querySelector<HTMLElement>("[data-r=track]");

          let hideBubble: gsap.core.Tween | undefined;
          const say = (text: string) => {
            if (!desktop || !bubble || !bubbleText) return;
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
              delay: 2,
              ease: "back.in(2)",
            });
          };

          let inView = false;
          let phase = -1;
          const setPhase = (i: number, speak = true) => {
            if (i === phase) return;
            phase = i;
            cards.forEach((card, idx) => {
              const on = idx === i;
              gsap.to(card, {
                y: on ? -10 : 0,
                scale: on ? 1.03 : 0.96,
                opacity: on ? 1 : 0.5,
                duration: 0.6,
                ease: "back.out(2)",
                overwrite: "auto",
              });
              gsap.to(card.querySelector("[data-r=frame]"), {
                borderColor: on ? PHASES[idx].hex : "rgba(255,255,255,0.1)",
                boxShadow: on
                  ? `0 24px 60px -24px ${PHASES[idx].hex}`
                  : "0 0px 0px 0px rgba(0,0,0,0)",
                duration: 0.6,
              });
            });
            loops.forEach((loop, idx) => loop.paused(!(idx === i && inView)));
            if (speak) say(PHASES[i].say);
          };

          ScrollTrigger.create({
            trigger: el,
            start: "top bottom",
            end: "bottom top",
            onToggle: ({ isActive }) => {
              inView = isActive;
              loops.forEach((loop, idx) =>
                loop.paused(!(idx === phase && isActive)),
              );
            },
          });

          if (!desktop || !bulb || !track || !bubble) {
            cards.forEach((card, i) => {
              ScrollTrigger.create({
                trigger: card,
                start: "top 60%",
                end: "bottom 40%",
                onToggle: (self) => self.isActive && setPhase(i),
              });
            });
            return;
          }

          setPhase(0, false);
          gsap.set(bubble, {
            scale: 0,
            autoAlpha: 0,
            transformOrigin: "20% 100%",
          });
          gsap.set("[data-r=rays]", {
            autoAlpha: 0,
            scale: 0.6,
            svgOrigin: "32 30",
          });

          const pos = (i: number) => {
            const card = cards[i];
            const t = track.getBoundingClientRect();
            const c = card.getBoundingClientRect();
            return c.left + c.width / 2 - t.left - bulb.offsetWidth / 2;
          };

          const idle = [
            gsap.to("[data-r=float]", {
              y: -6,
              duration: 1.2,
              ease: "sine.inOut",
              repeat: -1,
              yoyo: true,
            }),
            gsap.to("[data-r=eyes]", {
              scaleY: 0.1,
              transformOrigin: "50% 50%",
              duration: 0.08,
              repeat: -1,
              yoyo: true,
              repeatDelay: 2.4,
            }),
          ];
          const raysSpin = gsap.to("[data-r=rays]", {
            rotation: 360,
            svgOrigin: "32 30",
            duration: 6,
            ease: "none",
            repeat: -1,
            paused: true,
          });

          let lit = false;
          const light = (on: boolean) => {
            if (on === lit) return;
            lit = on;
            gsap.to("[data-r=glass-fill]", {
              attr: { fill: on ? BULB_LIT : BULB_DIM },
              duration: 0.4,
            });
            gsap.to("[data-r=glow]", {
              autoAlpha: on ? 1 : 0,
              scale: on ? 1 : 0.5,
              duration: 0.5,
              ease: "back.out(2)",
            });
            gsap.to("[data-r=rays]", {
              autoAlpha: on ? 1 : 0,
              scale: on ? 1 : 0.6,
              duration: 0.5,
              ease: "back.out(3)",
            });
            raysSpin.paused(!on);
            if (!on) return;

            const confetti = el.querySelectorAll("[data-r=confetti]");
            gsap
              .timeline()
              .fromTo(
                confetti,
                { x: 0, y: 0, scale: 0, rotation: 0, autoAlpha: 1 },
                {
                  x: (i) =>
                    Math.cos((i / confetti.length) * Math.PI * 2) *
                    gsap.utils.random(60, 110),
                  y: (i) =>
                    Math.sin((i / confetti.length) * Math.PI * 2) *
                      gsap.utils.random(50, 90) -
                    30,
                  rotation: () => gsap.utils.random(-90, 90),
                  scale: 1.3,
                  duration: 0.9,
                  ease: "expo.out",
                },
              )
              .to(confetti, { autoAlpha: 0, scale: 0.4, duration: 0.4 }, 0.6);
            gsap
              .timeline()
              .to("[data-r=hop]", {
                y: -30,
                duration: 0.25,
                ease: "power2.out",
              })
              .to("[data-r=hop]", { y: 0, duration: 0.7, ease: "bounce.out" });
            say("It's alive! ✨");
          };

          const HOLD = 0.6;
          const MOVE = 1;
          const total = HOLD * 3 + MOVE * 2;
          const thresholds = [
            (HOLD + MOVE / 2) / total,
            (HOLD * 2 + MOVE * 1.5) / total,
          ];

          const tl = gsap.timeline({
            defaults: { ease: "none" },
            scrollTrigger: {
              trigger: "[data-r=stage]",
              start: "center center",
              end: "+=1600",
              pin: true,
              scrub: 1,
              invalidateOnRefresh: true,
              onUpdate: (self) => {
                const p = self.progress;
                setPhase(p < thresholds[0] ? 0 : p < thresholds[1] ? 1 : 2);
                light(p > 0.96);
              },
            },
          });

          tl.to({}, { duration: HOLD });
          [1, 2].forEach((i) => {
            tl.fromTo(
              bulb,
              { x: () => pos(i - 1) },
              { x: () => pos(i), duration: MOVE, ease: "power1.inOut" },
            )
              .to(
                "[data-r=hop]",
                { keyframes: { y: [0, -70, 0] }, duration: MOVE },
                "<",
              )
              .to(
                "[data-r=body]",
                {
                  rotation: 360 * i,
                  transformOrigin: "50% 55%",
                  duration: MOVE,
                  ease: "power2.inOut",
                },
                "<",
              )
              .to({}, { duration: HOLD });
          });

          tl.fromTo(
            "[data-r=path]",
            { scaleX: 0 },
            { scaleX: 1, duration: MOVE * 2 + HOLD, ease: "none" },
            HOLD,
          );

          ScrollTrigger.create({
            trigger: el,
            start: "top bottom",
            end: "bottom top",
            onToggle: ({ isActive }) => {
              idle.forEach((t) => t.paused(!isActive));
              raysSpin.paused(!(isActive && lit));
            },
          });
        },
        el,
      );
    },
    { scope: root },
  );

  return (
    <section ref={root} className="section relative isolate" id="process">
      <header
        data-r="header"
        className="mx-auto mb-10 flex w-[90%] flex-col items-center gap-4 text-center md:mb-12 md:w-[70%]"
      >
        <div
          data-r="badge"
          className="font-heading flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-1.5 text-xs tracking-widest text-white/70 uppercase backdrop-blur-sm md:text-sm"
        >
          <span className="relative flex size-2">
            <span className="absolute inline-flex size-full animate-ping rounded-full bg-violet-400 opacity-60" />
            <span className="relative inline-flex size-2 rounded-full bg-violet-400" />
          </span>
          My Process
        </div>
        <h2 className="font-heading text-4xl leading-tight font-bold tracking-wide text-white md:text-6xl">
          {HEADING.map((word, idx) => (
            <Fragment key={word + idx}>
              <span className="inline-block overflow-hidden pb-2 align-bottom">
                <span
                  data-r="word"
                  className={
                    idx >= ACCENT_FROM
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
          data-r="lead"
          className="font-body max-w-xl text-base text-white/60 md:text-lg"
        >
          Meet Bulby, a tiny idea with big dreams. Scroll along and watch it go
          from thought to launch!
        </p>
      </header>

      <div data-r="stage" className="mx-auto w-[90%] md:w-[85%]">
        <div data-r="track" className="relative hidden h-36 md:block">
          <span
            aria-hidden
            className="absolute inset-x-[16.6%] bottom-3 border-t-2 border-dashed border-white/10"
          />
          <span
            aria-hidden
            data-r="path"
            className="absolute inset-x-[16.6%] bottom-3 h-0.5 origin-left -translate-y-px bg-linear-to-r from-emerald-400 via-pink-400 to-sky-400"
          />
          <Bulby />
        </div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-3 md:gap-8">
          {PHASES.map((phase, i) => {
            const Scene = SCENES[i];
            return (
              <div key={phase.title} data-r="enter">
                <article data-r="card" className="h-full">
                  <div
                    data-r="frame"
                    className="flex h-full flex-col gap-4 rounded-3xl border border-white/10 bg-white/3 p-5 backdrop-blur-md md:p-6"
                  >
                    <div
                      aria-hidden
                      className={cn(
                        "relative h-36 overflow-hidden rounded-2xl bg-linear-to-br",
                        phase.scene,
                      )}
                    >
                      <Scene />
                    </div>
                    <div className="flex items-center justify-between">
                      <span
                        className={cn(
                          "font-heading text-xs tracking-[0.3em] uppercase",
                          phase.text,
                        )}
                      >
                        {phase.order}
                      </span>
                      <span className="text-xl">{phase.emoji}</span>
                    </div>
                    <h3 className="font-heading text-2xl font-bold text-white">
                      {phase.title}
                    </h3>
                    <p className="font-body text-sm leading-relaxed text-white/70 md:text-base">
                      {phase.desc}
                    </p>
                  </div>
                </article>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Reality;
