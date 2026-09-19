"use client";
import { Fragment, useRef, useState, useSyncExternalStore } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { Check, Copy, MapPin } from "lucide-react";
import { cn } from "@/lib/cn";
import MagicButton from "@/shared/components/MagicButton";
import { GridGlobe } from "@/shared/components/GridGlobe";

gsap.registerPlugin(useGSAP, ScrollTrigger);

const EMAIL = "m.fahry.pratama.putra@gmail.com";
const HEADING = "Turning Ideas Into Thoughtful Digital Experiences".split(" ");
const ACCENT_FROM = 3;
const BURST_COUNT = 12;

type Tech = { name: string; icon?: string; mono?: string };

const TECH_ROWS: Tech[][] = [
  [
    { name: "Java", icon: "/java.svg" },
    { name: "JavaScript", mono: "JS" },
    { name: "TypeScript", mono: "TS" },
    { name: "Python", icon: "/python.svg" },
    { name: "Dart", icon: "/dart.svg" },
    { name: "HTML5", icon: "/html5.svg" },
    { name: "React", icon: "/react.svg" },
    { name: "Next.js", icon: "/nextjs.svg" },
    { name: "Tailwind CSS", icon: "/tailwind-css.svg" },
  ],
  [
    { name: "Laravel", icon: "/laravel.svg" },
    { name: "Flask", icon: "/flask.svg" },
    { name: "Flutter", icon: "/flutter.svg" },
    { name: "PostgreSQL", icon: "/postgresql.svg" },
    { name: "Supabase", icon: "/supabase.svg" },
    { name: "Three.js", mono: "3D" },
    { name: "Motion", mono: "M" },
    { name: "GSAP", mono: "GS" },
  ],
];
const TECH_COUNT = TECH_ROWS.flat().length;

const CODE: { text: string; color: string }[][] = [
  [
    { text: "const ", color: "text-violet-300" },
    { text: "fahry", color: "text-sky-300" },
    { text: " = {", color: "text-white/70" },
  ],
  [
    { text: "  role: ", color: "text-white/50" },
    { text: '"Full Stack Developer"', color: "text-emerald-300" },
    { text: ",", color: "text-white/70" },
  ],
  [
    { text: "  loves: ", color: "text-white/50" },
    { text: '["clean code", "intuitive UI"]', color: "text-emerald-300" },
    { text: ",", color: "text-white/70" },
  ],
  [
    { text: "  basedIn: ", color: "text-white/50" },
    { text: '"Indonesia"', color: "text-emerald-300" },
    { text: ",", color: "text-white/70" },
  ],
  [{ text: "};", color: "text-white/70" }],
];

const timeFormat = new Intl.DateTimeFormat("en-GB", {
  hour: "2-digit",
  minute: "2-digit",
  timeZone: "Asia/Jakarta",
});
const subscribeClock = (cb: () => void) => {
  const id = setInterval(cb, 15_000);
  return () => clearInterval(id);
};

const LocalTime = () => {
  const time = useSyncExternalStore(
    subscribeClock,
    () => timeFormat.format(new Date()),
    () => "--:--",
  );
  return <>{time} WIB</>;
};

const copyText = async (text: string) => {
  if (navigator.clipboard && window.isSecureContext) {
    return navigator.clipboard.writeText(text);
  }
  const ta = document.createElement("textarea");
  ta.value = text;
  ta.style.position = "fixed";
  ta.style.opacity = "0";
  document.body.appendChild(ta);
  ta.select();
  document.execCommand("copy");
  ta.remove();
};

const TechPill = ({ tech, hidden }: { tech: Tech; hidden?: boolean }) => (
  <div className="pr-3" aria-hidden={hidden}>
    <span className="flex items-center gap-2 rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-sm whitespace-nowrap text-white/80 transition-colors duration-300 hover:border-violet-400/50 hover:bg-violet-500/10 hover:text-white">
      {tech.icon ? (
        <Image
          src={tech.icon}
          alt=""
          width={20}
          height={20}
          className="size-5"
        />
      ) : (
        <span className="text-black-100 grid size-5 place-items-center rounded-md bg-linear-to-br from-violet-300 to-sky-300 text-[9px] font-bold">
          {tech.mono}
        </span>
      )}
      {tech.name}
    </span>
  </div>
);

const Tile = ({
  className,
  children,
  ...rest
}: React.ComponentProps<"div">) => (
  <div
    data-card
    className={cn(
      "group bg-black-100 relative overflow-hidden rounded-3xl border border-white/10 transition-colors duration-300 will-change-transform hover:border-violet-400/30",
      className,
    )}
    {...rest}
  >
    {children}
    <div
      aria-hidden
      className="pointer-events-none absolute inset-0 z-50 rounded-3xl bg-[radial-gradient(500px_circle_at_var(--mx,50%)_var(--my,50%),rgba(139,92,246,0.14),transparent_45%)] opacity-0 transition-opacity duration-300 group-hover:opacity-100"
    />
  </div>
);

const Chip = ({ children }: { children: React.ReactNode }) => (
  <span className="font-heading bg-black-100/60 inline-flex items-center gap-2 rounded-full border border-white/10 px-3 py-1 text-[10px] tracking-[0.25em] text-white/70 uppercase backdrop-blur-sm md:text-xs">
    {children}
  </span>
);

const PulseDot = () => (
  <span className="relative flex size-2">
    <span className="absolute inline-flex size-full animate-ping rounded-full bg-violet-400 opacity-60" />
    <span className="relative inline-flex size-2 rounded-full bg-violet-400" />
  </span>
);

export default function Grid() {
  const root = useRef<HTMLElement>(null);
  const [showGlobe, setShowGlobe] = useState(false);
  const [copied, setCopied] = useState(false);

  const { contextSafe } = useGSAP(
    () => {
      const el = root.current;
      if (!el) return;

      ScrollTrigger.create({
        trigger: "[data-grid=globe]",
        start: "top bottom+=300",
        once: true,
        onEnter: () => setShowGlobe(true),
      });

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

          gsap.from("[data-grid=connector]", {
            scaleY: 0,
            ease: "none",
            scrollTrigger: {
              trigger: el,
              start: "top bottom",
              end: "top 45%",
              scrub: true,
            },
          });

          gsap
            .timeline({
              defaults: { ease: "expo.out" },
              scrollTrigger: {
                trigger: "[data-grid=header]",
                start: "top 80%",
              },
            })
            .from("[data-grid=badge]", { y: 24, autoAlpha: 0, duration: 1 })
            .from(
              "[data-grid=word]",
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
              "[data-grid=lead]",
              { y: 20, autoAlpha: 0, duration: 1 },
              "-=0.9",
            );

          gsap.set("[data-card]", { y: 80, scale: 0.96, autoAlpha: 0 });
          ScrollTrigger.batch("[data-card]", {
            start: "top 90%",
            once: true,
            onEnter: (batch) =>
              gsap.to(batch, {
                y: 0,
                scale: 1,
                autoAlpha: 1,
                duration: 1.1,
                stagger: 0.12,
                ease: "expo.out",
              }),
          });

          gsap.utils.toArray<HTMLElement>("[data-parallax]").forEach((img) => {
            gsap.fromTo(
              img,
              { yPercent: -6 },
              {
                yPercent: 6,
                ease: "none",
                scrollTrigger: {
                  trigger: img.parentElement,
                  start: "top bottom",
                  end: "bottom top",
                  scrub: true,
                },
              },
            );
          });

          gsap.to("[data-grid=bg]", {
            yPercent: -15,
            ease: "none",
            scrollTrigger: {
              trigger: el,
              start: "top bottom",
              end: "bottom top",
              scrub: true,
            },
          });

          gsap
            .timeline({
              scrollTrigger: { trigger: "[data-grid=code]", start: "top 85%" },
            })
            .from("[data-grid=code-line]", {
              clipPath: "inset(0 100% 0 0)",
              duration: 0.6,
              ease: "steps(20)",
              stagger: 0.45,
            });

          gsap.from("[data-grid=count]", {
            textContent: 0,
            snap: { textContent: 1 },
            duration: 1.6,
            ease: "power2.out",
            scrollTrigger: { trigger: "[data-grid=count]", start: "top 90%" },
          });

          const speed = { boost: 1, hover: 1 };
          const marquees = gsap.utils
            .toArray<HTMLElement>("[data-grid=marquee]")
            .map((track, i) =>
              gsap.fromTo(
                track,
                { xPercent: i % 2 ? -50 : 0 },
                {
                  xPercent: i % 2 ? 0 : -50,
                  duration: 30 + i * 6,
                  ease: "none",
                  repeat: -1,
                },
              ),
            );
          const applySpeed = () =>
            marquees.forEach((t) => t.timeScale(speed.boost * speed.hover));

          const techCard = el.querySelector<HTMLElement>("[data-grid=tech]");
          const onTechEnter = () =>
            gsap.to(speed, { hover: 0.2, duration: 0.6, onUpdate: applySpeed });
          const onTechLeave = () =>
            gsap.to(speed, { hover: 1, duration: 0.6, onUpdate: applySpeed });

          const ambient = gsap.timeline({ repeat: -1, yoyo: true });
          ambient
            .to("[data-grid=blob]", {
              x: (i) => [60, -70, 40][i % 3],
              y: (i) => [-30, 40, 30][i % 3],
              scale: (i) => [1.2, 0.85, 1.1][i % 3],
              duration: 6,
              ease: "sine.inOut",
            })
            .to(
              "[data-grid=accent]",
              { backgroundPosition: "200% 50%", duration: 6, ease: "none" },
              0,
            );

          const cursor = gsap.to("[data-grid=cursor]", {
            autoAlpha: 0,
            duration: 0.5,
            ease: "steps(1)",
            repeat: -1,
            yoyo: true,
          });

          const pulse = gsap.fromTo(
            "[data-grid=connector-dot]",
            { y: 0, autoAlpha: 1 },
            {
              y: () =>
                el.querySelector<HTMLElement>("[data-grid=connector]")
                  ?.offsetHeight ?? 0,
              autoAlpha: 0,
              duration: 1.8,
              ease: "power1.in",
              repeat: -1,
            },
          );

          const loops = [...marquees, ambient, cursor, pulse];

          ScrollTrigger.create({
            trigger: el,
            start: "top bottom",
            end: "bottom top",
            onToggle: ({ isActive }) =>
              loops.forEach((t) => t.paused(!isActive)),
            onUpdate: (self) => {
              const boost = gsap.utils.clamp(
                1,
                5,
                1 + Math.abs(self.getVelocity()) / 600,
              );
              if (boost <= speed.boost) return;
              gsap.to(speed, {
                boost,
                duration: 0.2,
                overwrite: true,
                onUpdate: applySpeed,
                onComplete: () => {
                  gsap.to(speed, {
                    boost: 1,
                    duration: 1.2,
                    ease: "power2.out",
                    onUpdate: applySpeed,
                  });
                },
              });
            },
          });

          techCard?.addEventListener("pointerenter", onTechEnter);
          techCard?.addEventListener("pointerleave", onTechLeave);

          const cleanups = [
            () => {
              techCard?.removeEventListener("pointerenter", onTechEnter);
              techCard?.removeEventListener("pointerleave", onTechLeave);
            },
          ];

          if (finePointer) {
            gsap.utils.toArray<HTMLElement>("[data-card]").forEach((card) => {
              gsap.set(card, { transformPerspective: 1200 });
              const rx = gsap.quickTo(card, "rotationX", {
                duration: 0.6,
                ease: "power3",
              });
              const ry = gsap.quickTo(card, "rotationY", {
                duration: 0.6,
                ease: "power3",
              });

              const onMove = (e: PointerEvent) => {
                const r = card.getBoundingClientRect();
                const px = (e.clientX - r.left) / r.width;
                const py = (e.clientY - r.top) / r.height;
                card.style.setProperty("--mx", `${px * 100}%`);
                card.style.setProperty("--my", `${py * 100}%`);
                ry((px - 0.5) * 5);
                rx((0.5 - py) * 5);
              };
              const onLeave = () => {
                rx(0);
                ry(0);
              };

              card.addEventListener("pointermove", onMove);
              card.addEventListener("pointerleave", onLeave);
              cleanups.push(() => {
                card.removeEventListener("pointermove", onMove);
                card.removeEventListener("pointerleave", onLeave);
              });
            });
          }

          return () => cleanups.forEach((fn) => fn());
        },
        el,
      );
    },
    { scope: root },
  );

  const celebrate = contextSafe!(() => {
    setCopied(true);
    if (!window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      gsap.fromTo(
        "[data-grid=burst]",
        { x: 0, y: 0, scale: 1, autoAlpha: 1 },
        {
          x: (i) =>
            Math.cos((i / BURST_COUNT) * Math.PI * 2) *
            gsap.utils.random(60, 110),
          y: (i) =>
            Math.sin((i / BURST_COUNT) * Math.PI * 2) *
            gsap.utils.random(40, 70),
          scale: 0,
          autoAlpha: 0,
          duration: 0.9,
          ease: "expo.out",
        },
      );
      gsap.fromTo(
        "[data-grid=copy-btn]",
        { scale: 0.92 },
        { scale: 1, duration: 0.6, ease: "elastic.out(1, 0.4)" },
      );
    }
    gsap.delayedCall(2.2, () => setCopied(false));
  });

  const copyEmail = () => {
    copyText(EMAIL)
      .then(celebrate)
      .catch(() => {});
  };

  return (
    <section ref={root} id="about" className="section relative isolate">
      <div
        data-grid="bg"
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10"
      >
        <div
          className={cn(
            "absolute inset-0 opacity-[0.05]",
            "bg-size-[100px_100px]",
            "bg-[linear-gradient(to_right,#e4e4e7_2px,transparent_2px),linear-gradient(to_bottom,#e4e4e7_2px,transparent_2px)]",
            "mask-[radial-gradient(ellipse_at_center,black_10%,transparent_70%)]",
          )}
        />
        <div className="absolute top-[20%] left-[10%] size-120 rounded-full bg-[radial-gradient(circle,rgba(139,92,246,.14)_0%,transparent_65%)]" />
        <div className="absolute top-[60%] right-[5%] size-120 rounded-full bg-[radial-gradient(circle,rgba(59,130,246,.12)_0%,transparent_65%)]" />
      </div>

      <div
        aria-hidden
        data-grid="connector"
        className="relative mx-auto -mt-16 mb-6 h-28 w-px origin-top bg-linear-to-b from-white/0 via-violet-400/60 to-violet-400/10 md:-mt-20"
      >
        <span
          data-grid="connector-dot"
          className="absolute -top-1 -left-0.75 size-1.75 rounded-full bg-violet-300 shadow-[0_0_12px_2px_rgba(167,139,250,0.8)]"
        />
      </div>

      <header
        data-grid="header"
        className="mx-auto mb-10 flex w-[90%] flex-col items-center gap-4 text-center md:mb-14 md:w-[70%]"
      >
        <div
          data-grid="badge"
          className="font-heading flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-1.5 text-xs tracking-widest text-white/70 uppercase backdrop-blur-sm md:text-sm"
        >
          <PulseDot />
          About Me
        </div>
        <h2 className="font-heading text-3xl leading-tight font-bold tracking-wide text-white md:text-5xl">
          {HEADING.map((word, idx) => (
            <Fragment key={word + idx}>
              <span className="inline-block overflow-hidden pb-2 align-bottom">
                <span data-grid="word" className="inline-block">
                  {idx >= ACCENT_FROM ? (
                    <span
                      data-grid="accent"
                      className="bg-linear-to-r from-violet-300 via-sky-300 to-violet-300 bg-size-[200%_auto] bg-clip-text text-transparent"
                    >
                      {word}
                    </span>
                  ) : (
                    word
                  )}
                </span>
              </span>
              {idx < HEADING.length - 1 && " "}
            </Fragment>
          ))}
        </h2>
        <p
          data-grid="lead"
          className="font-body max-w-2xl text-base text-white/60 md:text-lg"
        >
          From the first sketch to production, I care about how things work and
          how they feel.
        </p>
      </header>

      <div className="font-body mx-auto grid w-[90%] grid-cols-1 gap-4 md:w-[85%] md:auto-rows-[16rem] md:grid-cols-5">
        <Tile className="min-h-80 md:col-span-3 md:row-span-2">
          <Image
            data-parallax
            fill
            src="/pangantara.svg"
            alt="Pangantara"
            sizes="(min-width: 768px) 50vw, 90vw"
            className="scale-115 object-cover brightness-50 transition-[filter] duration-500 group-hover:brightness-90"
          />
          <div className="from-black-100 via-black-100/40 absolute inset-0 bg-linear-to-t to-transparent" />
          <div className="absolute inset-x-0 bottom-0 z-10 flex flex-col gap-3 p-5 transition-transform duration-500 group-hover:-translate-y-1 md:p-8">
            <Chip>Featured Project</Chip>
            <p className="font-heading text-2xl font-bold text-white md:text-4xl">
              Transforming ideas into impactful solutions.
            </p>
            <p className="max-w-lg text-sm text-white/60 md:text-base">
              Pangantara streamlines ingredient procurement between SPPG and
              suppliers.
            </p>
          </div>
        </Tile>

        <Tile data-grid="globe" className="h-80 md:col-span-2 md:h-auto">
          {showGlobe ? (
            <GridGlobe />
          ) : (
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_80%,rgba(59,130,246,.2),transparent_60%)]" />
          )}
          <div className="absolute bottom-4 left-4 z-50">
            <Chip>
              <MapPin className="size-3" />
              Indonesia · <LocalTime />
            </Chip>
          </div>
        </Tile>

        <Tile
          data-grid="tech"
          className="flex flex-col justify-between gap-5 py-5 md:col-span-2"
        >
          <div className="flex items-start justify-between gap-4 px-5">
            <div>
              <p className="text-xs tracking-[0.3em] text-white/50 uppercase">
                Always evolving
              </p>
              <p className="font-heading text-xl font-bold text-white md:text-2xl">
                and refining my craft.
              </p>
            </div>
            <div className="text-right">
              <p className="font-heading bg-linear-to-br from-violet-300 to-sky-300 bg-clip-text text-3xl font-bold text-transparent md:text-4xl">
                <span data-grid="count">{TECH_COUNT}</span>+
              </p>
              <p className="text-[10px] tracking-widest text-white/40 uppercase">
                tools
              </p>
            </div>
          </div>
          <div className="flex flex-col gap-3">
            {TECH_ROWS.map((row, i) => (
              <div
                key={i}
                className="overflow-hidden mask-[linear-gradient(to_right,transparent,black_12%,black_88%,transparent)]"
              >
                <div data-grid="marquee" className="flex w-max">
                  {[...row, ...row].map((tech, j) => (
                    <TechPill
                      key={tech.name + j}
                      tech={tech}
                      hidden={j >= row.length}
                    />
                  ))}
                </div>
              </div>
            ))}
          </div>
        </Tile>

        <Tile className="flex flex-col gap-3 p-5 md:col-span-2">
          <div>
            <p className="font-heading text-lg font-bold text-white md:text-xl">
              Developer at heart with a passion for technology.
            </p>
            <p className="text-sm text-white/50">
              Bridging the gap between clean code and intuitive design.
            </p>
          </div>
          <div
            data-grid="code"
            className="flex-1 overflow-hidden rounded-xl border border-white/10 bg-white/3"
          >
            <div className="flex gap-1.5 border-b border-white/10 px-3 py-2">
              <span className="size-2 rounded-full bg-red-400/70" />
              <span className="size-2 rounded-full bg-yellow-400/70" />
              <span className="size-2 rounded-full bg-green-400/70" />
            </div>
            <pre className="overflow-hidden px-3 py-2 font-mono text-[11px] leading-5 md:text-xs">
              {CODE.map((line, i) => (
                <div key={i} data-grid="code-line" className="w-max">
                  {line.map((token, j) => (
                    <span key={j} className={token.color}>
                      {token.text}
                    </span>
                  ))}
                  {i === CODE.length - 1 && (
                    <span
                      data-grid="cursor"
                      className="ml-0.5 inline-block h-3.5 w-1.5 translate-y-0.5 bg-violet-300"
                    />
                  )}
                </div>
              ))}
            </pre>
          </div>
        </Tile>

        <Tile className="min-h-80 md:col-span-3 md:row-span-2">
          <Image
            data-parallax
            fill
            src="/filkomevent.svg"
            alt="FilkomEvent"
            sizes="(min-width: 768px) 50vw, 90vw"
            className="scale-115 object-cover brightness-50 transition-[filter] duration-500 group-hover:brightness-90"
          />
          <div className="from-black-100 via-black-100/40 absolute inset-0 bg-linear-to-t to-transparent" />
          <div className="absolute inset-x-0 bottom-0 z-10 flex flex-col gap-3 p-5 transition-transform duration-500 group-hover:-translate-y-1 md:p-8">
            <Chip>
              <PulseDot />
              Current Focus
            </Chip>
            <p className="font-heading text-2xl font-bold text-white md:text-4xl">
              Developing a modern platform for faculty events.
            </p>
            <p className="max-w-lg text-sm text-white/60 md:text-base">
              FilkomEvent handles event discovery, registration, and participant
              management, built with Laravel.
            </p>
          </div>
        </Tile>

        <Tile className="flex flex-col items-center justify-center gap-3 p-6 text-center md:col-span-2">
          <div aria-hidden className="absolute inset-0 z-0 overflow-hidden">
            <div
              data-grid="blob"
              className="absolute -top-16 -left-10 size-64 rounded-full bg-[radial-gradient(circle,rgba(139,92,246,.35),transparent_65%)]"
            />
            <div
              data-grid="blob"
              className="absolute -right-12 -bottom-20 size-72 rounded-full bg-[radial-gradient(circle,rgba(59,130,246,.3),transparent_65%)]"
            />
            <div
              data-grid="blob"
              className="absolute top-1/3 left-1/3 size-40 rounded-full bg-[radial-gradient(circle,rgba(236,72,153,.18),transparent_65%)]"
            />
          </div>
          <div className="relative z-10 flex flex-col items-center gap-3">
            <p className="font-heading text-xl font-bold text-white md:text-2xl">
              Have a project in mind?
              <br />
              <span className="text-white/60">Let&apos;s make it happen.</span>
            </p>
            <div className="relative">
              <div
                aria-hidden
                className="pointer-events-none absolute top-1/2 left-1/2"
              >
                {Array.from({ length: BURST_COUNT }, (_, i) => (
                  <span
                    key={i}
                    data-grid="burst"
                    className={cn(
                      "invisible absolute size-1.5 -translate-1/2 rounded-full",
                      i % 3 === 0
                        ? "bg-violet-300"
                        : i % 3 === 1
                          ? "bg-sky-300"
                          : "bg-pink-300",
                    )}
                  />
                ))}
              </div>
              <div data-grid="copy-btn">
                <MagicButton
                  title={copied ? "Email copied!" : "Copy my email address"}
                  icon={
                    copied ? (
                      <Check className="h-4 w-4 text-emerald-300" />
                    ) : (
                      <Copy className="h-4 w-4" />
                    )
                  }
                  position="left"
                  className="gap-2"
                  handleClick={copyEmail}
                />
              </div>
            </div>
            <button
              type="button"
              onClick={copyEmail}
              className="font-mono text-xs break-all text-white/50 transition-colors hover:text-white"
            >
              {EMAIL}
            </button>
            <span className="sr-only" aria-live="polite">
              {copied ? "Email address copied to clipboard" : ""}
            </span>
          </div>
        </Tile>
      </div>
    </section>
  );
}
