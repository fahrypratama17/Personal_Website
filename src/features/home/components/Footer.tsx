"use client";
import { Fragment, useRef, useState } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { Check, Copy, MoveUpRight } from "lucide-react";
import MagicButton from "@/shared/components/MagicButton";
import { copyText } from "@/lib/clipboard";
import { EMAIL, socialMedia } from "@/features/home/data/data";

gsap.registerPlugin(useGSAP, ScrollTrigger);

const HEADING = "Have an idea worth turning into reality together?".split(" ");
const ACCENT_WORD = "idea";
const WORDMARK = "FAHRY".split("");

const socialName = (img: string) =>
  img.replace(/^\/|\.svg$/g, "").replace(/^\w/, (c) => c.toUpperCase());

const SleepyBulby = () => (
  <svg viewBox="0 0 64 80" className="size-14 overflow-visible md:size-20">
    <path
      d="M32 6c13 0 23 10 23 23 0 8-4 13-8 17-3 3-4 6-4 9H21c0-3-1-6-4-9-4-4-8-9-8-17C9 16 19 6 32 6z"
      fill="#e9d5ff"
    />
    <rect x="21" y="57" width="22" height="5" rx="2" fill="#94a3b8" />
    <rect x="22" y="63" width="20" height="5" rx="2" fill="#64748b" />
    <rect x="26" y="69" width="12" height="4" rx="2" fill="#475569" />
    <ellipse cx="21" cy="36" rx="3.5" ry="2" fill="#f9a8d4" opacity=".8" />
    <ellipse cx="43" cy="36" rx="3.5" ry="2" fill="#f9a8d4" opacity=".8" />
    <g data-f="eyes-closed" stroke="#000319" strokeWidth="2" fill="none">
      <path d="M21 29q4 3 8 0" strokeLinecap="round" />
      <path d="M35 29q4 3 8 0" strokeLinecap="round" />
    </g>
    <g data-f="eyes-open" opacity="0">
      <ellipse cx="25" cy="28" rx="3" ry="4" fill="#000319" />
      <ellipse cx="39" cy="28" rx="3" ry="4" fill="#000319" />
      <circle cx="26" cy="26.5" r="1.1" fill="#fff" />
      <circle cx="40" cy="26.5" r="1.1" fill="#fff" />
    </g>
    <path
      data-f="mouth"
      d="M29 37q3 2 6 0"
      stroke="#000319"
      strokeWidth="2"
      fill="none"
      strokeLinecap="round"
    />
  </svg>
);

const Footer = () => {
  const root = useRef<HTMLElement>(null);
  const [copied, setCopied] = useState(false);

  const { contextSafe } = useGSAP(
    () => {
      const el = root.current;
      if (!el) return;

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

          // CTA intro
          gsap
            .timeline({
              defaults: { ease: "expo.out" },
              scrollTrigger: { trigger: "[data-f=cta]", start: "top 80%" },
            })
            .from("[data-f=badge]", { y: 24, autoAlpha: 0, duration: 1 })
            .from(
              "[data-f=word]",
              {
                yPercent: 120,
                rotate: 8,
                autoAlpha: 0,
                duration: 1.2,
                stagger: 0.06,
              },
              0.15,
            )
            .from(
              "[data-f=spark]",
              {
                scale: 0,
                rotation: -180,
                duration: 0.8,
                ease: "back.out(3)",
              },
              "-=0.6",
            )
            .from(
              "[data-f=lead]",
              { y: 20, autoAlpha: 0, duration: 1 },
              "-=0.7",
            )
            .from(
              "[data-f=action]",
              {
                y: 30,
                scale: 0.9,
                autoAlpha: 0,
                duration: 0.9,
                stagger: 0.1,
                ease: "back.out(2)",
              },
              "-=0.7",
            );

          gsap.from("[data-f=social]", {
            scale: 0,
            rotation: -90,
            duration: 0.7,
            stagger: 0.08,
            ease: "back.out(2.5)",
            scrollTrigger: { trigger: "[data-f=bar]", start: "top 95%" },
          });

          gsap.fromTo(
            "[data-f=letter]",
            { yPercent: 105 },
            {
              yPercent: 0,
              ease: "power2.out",
              stagger: 0.08,
              scrollTrigger: {
                trigger: "[data-f=wordmark]",
                start: "top bottom",
                end: "bottom bottom",
                scrub: 1,
              },
            },
          );

          const bulby = el.querySelector<HTMLElement>("[data-f=bulby]");
          const hop = el.querySelector("[data-f=hop]");
          const bubble = el.querySelector("[data-f=bubble]");
          const bubbleText = el.querySelector("[data-f=bubble-text]");
          if (!bulby || !hop || !bubble || !bubbleText) return;

          gsap.set(bubble, {
            scale: 0,
            autoAlpha: 0,
            transformOrigin: "100% 100%",
          });
          gsap.from(bulby, {
            y: -260,
            autoAlpha: 0,
            duration: 1.1,
            ease: "bounce.out",
            scrollTrigger: {
              trigger: "[data-f=wordmark]",
              start: "top 75%",
              toggleActions: "play none none reverse",
            },
          });

          const loops = [
            gsap.to("[data-f=aurora]", {
              x: (i) => (i ? -120 : 120),
              y: (i) => (i ? 40 : -30),
              scale: (i) => (i ? 1.2 : 0.9),
              duration: 7,
              ease: "sine.inOut",
              repeat: -1,
              yoyo: true,
            }),
            gsap.to("[data-f=breath]", {
              scaleY: 1.05,
              scaleX: 0.97,
              transformOrigin: "50% 100%",
              duration: 1.4,
              ease: "sine.inOut",
              repeat: -1,
              yoyo: true,
            }),
          ];
          gsap.set("[data-f=z]", { autoAlpha: 0 });
          const zzz = gsap.to("[data-f=z]", {
            keyframes: {
              x: [0, 8, 2, 12],
              y: [0, -14, -28, -42],
              scale: [0.4, 0.9, 1.1, 1.2],
              autoAlpha: [0, 1, 1, 0],
            },
            duration: 2.4,
            stagger: 0.8,
            repeat: -1,
            ease: "none",
          });

          let awake = false;
          let inView = false;
          const syncLoops = () => {
            loops.forEach((t) => t.paused(!inView));
            zzz.paused(!inView || awake);
          };
          ScrollTrigger.create({
            trigger: el,
            start: "top bottom",
            end: "bottom top",
            onToggle: ({ isActive }) => {
              inView = isActive;
              syncLoops();
            },
          });

          let hideBubble: gsap.core.Tween | undefined;
          const say = (text: string) => {
            bubbleText.textContent = text;
            hideBubble?.kill();
            gsap.fromTo(
              bubble,
              { scale: 0, autoAlpha: 0, rotation: 10 },
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
              delay: 2.2,
              ease: "back.in(2)",
            });
          };

          const jump = (height = 26) =>
            gsap
              .timeline()
              .to(hop, { y: -height, duration: 0.25, ease: "power2.out" })
              .to(hop, { y: 0, duration: 0.6, ease: "bounce.out" });

          let sleepTimer: gsap.core.Tween | undefined;
          const wake = (text = "Oh, hi there! 👋") => {
            sleepTimer?.kill();
            if (!awake) {
              awake = true;
              gsap.to("[data-f=eyes-closed]", { autoAlpha: 0, duration: 0.1 });
              gsap.to("[data-f=eyes-open]", { autoAlpha: 1, duration: 0.1 });
              gsap.to("[data-f=mouth]", {
                attr: { d: "M28 36q4 4 8 0" },
                duration: 0.2,
              });
              gsap.to("[data-f=z]", { autoAlpha: 0, duration: 0.2 });
              syncLoops();
              jump();
            }
            say(text);
          };
          const sleep = () => {
            sleepTimer = gsap.delayedCall(2.6, () => {
              awake = false;
              gsap.to("[data-f=eyes-closed]", { autoAlpha: 1, duration: 0.2 });
              gsap.to("[data-f=eyes-open]", { autoAlpha: 0, duration: 0.2 });
              gsap.to("[data-f=mouth]", {
                attr: { d: "M29 37q3 2 6 0" },
                duration: 0.3,
              });
              syncLoops();
            });
          };

          const onBulbyClick = () => {
            wake("Back to top! 🚀");
            jump(60);
          };

          const zone = el.querySelector<HTMLElement>("[data-f=zone]");
          const onZoneEnter = () => wake();
          const onZoneLeave = () => sleep();
          zone?.addEventListener("pointerenter", onZoneEnter);
          zone?.addEventListener("pointerleave", onZoneLeave);
          bulby.addEventListener("click", onBulbyClick);

          const cleanups = [
            () => {
              zone?.removeEventListener("pointerenter", onZoneEnter);
              zone?.removeEventListener("pointerleave", onZoneLeave);
              bulby.removeEventListener("click", onBulbyClick);
            },
          ];

          const letters = gsap.utils.toArray<HTMLElement>("[data-f=jelly]");
          letters.forEach((letter) => {
            const onClick = () =>
              gsap.fromTo(
                letter,
                { rotationY: 0, transformPerspective: 800 },
                { rotationY: 360, duration: 0.9, ease: "back.out(1.6)" },
              );
            letter.addEventListener("click", onClick);
            cleanups.push(() => letter.removeEventListener("click", onClick));
          });

          if (finePointer) {
            const jelly = letters.map((letter) => ({
              letter,
              sy: gsap.quickTo(letter, "scaleY", {
                duration: 0.5,
                ease: "elastic.out(1, 0.4)",
              }),
              y: gsap.quickTo(letter, "y", {
                duration: 0.5,
                ease: "elastic.out(1, 0.4)",
              }),
            }));
            gsap.set(letters, { transformOrigin: "50% 100%" });

            const onZoneMove = (e: PointerEvent) => {
              jelly.forEach(({ letter, sy, y }) => {
                const r = letter.getBoundingClientRect();
                const d = Math.abs(e.clientX - (r.left + r.width / 2));
                const f = Math.max(0, 1 - d / (r.width * 1.4));
                sy(1 + f * 0.22);
                y(-f * 18);
              });
            };
            const onZoneReset = () =>
              jelly.forEach(({ sy, y }) => {
                sy(1);
                y(0);
              });
            zone?.addEventListener("pointermove", onZoneMove);
            zone?.addEventListener("pointerleave", onZoneReset);

            const magnets = gsap.utils.toArray<HTMLElement>("[data-f=magnet]");
            magnets.forEach((m) => {
              const x = gsap.quickTo(m, "x", { duration: 0.5, ease: "power3" });
              const y = gsap.quickTo(m, "y", { duration: 0.5, ease: "power3" });
              const move = (e: PointerEvent) => {
                const r = m.getBoundingClientRect();
                x((e.clientX - r.left - r.width / 2) * 0.4);
                y((e.clientY - r.top - r.height / 2) * 0.4);
              };
              const leave = () => {
                x(0);
                y(0);
              };
              m.addEventListener("pointermove", move);
              m.addEventListener("pointerleave", leave);
              cleanups.push(() => {
                m.removeEventListener("pointermove", move);
                m.removeEventListener("pointerleave", leave);
              });
            });

            cleanups.push(() => {
              zone?.removeEventListener("pointermove", onZoneMove);
              zone?.removeEventListener("pointerleave", onZoneReset);
            });
          }

          return () => cleanups.forEach((fn) => fn());
        },
        el,
      );
    },
    { scope: root },
  );

  const onCopied = contextSafe!(() => {
    setCopied(true);
    if (!window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      gsap.fromTo(
        "[data-f=copy-icon]",
        { scale: 0, rotation: -120 },
        { scale: 1, rotation: 0, duration: 0.6, ease: "back.out(3)" },
      );
    }
    gsap.delayedCall(2.2, () => setCopied(false));
  });

  const copyEmail = () => {
    copyText(EMAIL)
      .then(onCopied)
      .catch(() => {});
  };

  const scrollTop = () => window.scrollTo({ top: 0, behavior: "smooth" });

  return (
    <footer
      ref={root}
      id="contact"
      className="relative isolate flex w-full flex-col overflow-hidden pt-24 md:pt-40"
    >
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute inset-x-0 bottom-0 h-96">
          <Image
            src="/footer-grid.svg"
            alt=""
            fill
            sizes="100vw"
            className="object-cover opacity-40"
          />
        </div>
        <div
          data-f="aurora"
          className="absolute top-[35%] left-[15%] size-120 rounded-full bg-[radial-gradient(circle,rgba(139,92,246,.2),transparent_65%)]"
        />
        <div
          data-f="aurora"
          className="absolute top-[45%] right-[10%] size-120 rounded-full bg-[radial-gradient(circle,rgba(56,189,248,.16),transparent_65%)]"
        />
      </div>

      <div
        data-f="cta"
        className="mx-auto flex w-[90%] flex-col items-center gap-6 text-center md:w-[70%]"
      >
        <div
          data-f="badge"
          className="font-heading flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-1.5 text-xs tracking-widest text-white/70 uppercase backdrop-blur-sm md:text-sm"
        >
          <span className="relative flex size-2">
            <span className="absolute inline-flex size-full animate-ping rounded-full bg-emerald-400 opacity-60" />
            <span className="relative inline-flex size-2 rounded-full bg-emerald-400" />
          </span>
          Let&apos;s Talk
        </div>

        <h2 className="font-heading text-3xl leading-tight font-bold tracking-wide text-white md:text-6xl">
          {HEADING.map((word, idx) => (
            <Fragment key={word + idx}>
              <span className="inline-block overflow-hidden pb-2 align-bottom">
                <span
                  data-f="word"
                  className={
                    word === ACCENT_WORD
                      ? "inline-block bg-linear-to-r from-violet-300 to-sky-300 bg-clip-text text-transparent"
                      : "inline-block"
                  }
                >
                  {word}
                </span>
              </span>
              {word === ACCENT_WORD && (
                <span
                  data-f="spark"
                  aria-hidden
                  className="ml-1 inline-block align-top text-2xl md:text-4xl"
                >
                  💡
                </span>
              )}
              {idx < HEADING.length - 1 && " "}
            </Fragment>
          ))}
        </h2>

        <p
          data-f="lead"
          className="font-body max-w-xl text-base text-white/60 md:text-lg"
        >
          Reach out today and let&apos;s talk about how we can bring your ideas
          to life.
        </p>

        <div className="mt-2 flex flex-col items-center gap-4 sm:flex-row">
          <div data-f="action">
            <div data-f="magnet" className="p-2">
              <MagicButton
                title="Let's get in touch"
                position="right"
                icon={<MoveUpRight className="h-4 w-4" />}
                className="gap-2"
                handleClick={() => {
                  window.location.href = `mailto:${EMAIL}`;
                }}
              />
            </div>
          </div>
          <div data-f="action">
            <button
              type="button"
              onClick={copyEmail}
              className="font-body flex items-center gap-2 rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white/70 backdrop-blur-sm transition-colors hover:border-violet-400/40 hover:text-white"
            >
              <span data-f="copy-icon" className="inline-flex">
                {copied ? (
                  <Check className="size-4 text-emerald-300" />
                ) : (
                  <Copy className="size-4" />
                )}
              </span>
              <span className="font-mono text-xs break-all md:text-sm">
                {copied ? "Copied to clipboard!" : EMAIL}
              </span>
            </button>
            <span className="sr-only" aria-live="polite">
              {copied ? "Email address copied to clipboard" : ""}
            </span>
          </div>
        </div>
      </div>

      <div
        data-f="bar"
        className="font-body mx-auto mt-24 flex w-[90%] flex-col-reverse items-center justify-between gap-6 border-t border-white/10 pt-8 md:mt-32 md:w-[85%] md:flex-row"
      >
        <p className="text-center text-sm text-white/50 md:text-left">
          Copyright &copy; {new Date().getFullYear()} Muhamad Fahry Pratama
          Putra
        </p>
        <div className="flex items-center gap-3">
          {socialMedia.map((info) => {
            const name = socialName(info.img);
            return (
              <div key={info.id} data-f="social">
                <div data-f="magnet">
                  <a
                    href={info.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={name}
                    title={name}
                    className="grid size-11 place-items-center rounded-xl border border-white/10 bg-white/5 backdrop-blur-lg transition-colors hover:border-violet-400/50 hover:bg-violet-500/15"
                  >
                    <Image src={info.img} alt="" width={20} height={20} />
                  </a>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <div data-f="zone" className="relative mt-10 md:mt-16">
        <button
          type="button"
          data-f="bulby"
          onClick={scrollTop}
          aria-label="Back to top"
          className="absolute right-[7%] bottom-[89%] z-10 cursor-pointer md:right-[9%]"
        >
          <span
            data-f="bubble"
            className="font-heading text-black-100 absolute right-full bottom-1/2 mr-1 rounded-2xl rounded-br-sm bg-white px-3 py-1.5 text-xs font-bold whitespace-nowrap shadow-lg shadow-violet-500/30"
          >
            <span data-f="bubble-text" />
          </span>
          <span aria-hidden className="absolute -top-2 right-0">
            {[0, 1, 2].map((i) => (
              <span
                key={i}
                data-f="z"
                className="font-heading absolute text-sm font-bold text-violet-200"
              >
                z
              </span>
            ))}
          </span>
          <span data-f="hop" className="block">
            <span
              data-f="breath"
              className="block drop-shadow-[0_8px_18px_rgba(139,92,246,0.45)]"
            >
              <SleepyBulby />
            </span>
          </span>
        </button>

        <div
          data-f="wordmark"
          aria-label="Fahry"
          role="img"
          className="font-heading flex justify-center leading-[0.78] font-black select-none [clip-path:inset(-100%_0_0_0)]"
        >
          {WORDMARK.map((ch, i) => (
            <span key={i} data-f="letter" className="inline-block">
              <span
                data-f="jelly"
                aria-hidden
                className="inline-block cursor-pointer bg-linear-to-b from-white/80 via-violet-300/40 to-transparent bg-clip-text pb-[2vw] text-[26vw] text-transparent"
              >
                {ch}
              </span>
            </span>
          ))}
        </div>
      </div>
    </footer>
  );
};

export default Footer;
