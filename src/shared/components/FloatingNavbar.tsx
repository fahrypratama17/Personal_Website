"use client";
import React, { JSX, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { cn } from "@/lib/cn";

gsap.registerPlugin(useGSAP, ScrollTrigger);

type NavItem = {
  name: string;
  link: string;
  icon?: JSX.Element;
};

const sectionId = (link: string) => link.split("#")[1];

const Label = ({ item }: { item: NavItem }) => (
  <>
    <span className="block sm:hidden [&_svg]:size-5">{item.icon}</span>
    <span className="hidden sm:block">{item.name}</span>
  </>
);

export const FloatingNav = ({
  navItems,
  className,
}: {
  navItems: NavItem[];
  className?: string;
}) => {
  const root = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const nav = root.current;
      const list = nav?.querySelector<HTMLElement>("[data-nav=list]");
      const highlight = nav?.querySelector<HTMLElement>("[data-nav=highlight]");
      if (!nav || !list || !highlight) return;

      const links = gsap.utils.toArray<HTMLAnchorElement>("[data-nav=link]");
      const reduce = window.matchMedia(
        "(prefers-reduced-motion: reduce)",
      ).matches;

      let active = 0;
      const moveTo = (i: number, instant = false) => {
        const link = links[i];
        if (!link) return;
        gsap.to(highlight, {
          x: link.offsetLeft,
          width: link.offsetWidth,
          autoAlpha: 1,
          duration: instant || reduce ? 0 : 0.6,
          ease: "elastic.out(1, 0.75)",
          overwrite: true,
        });
      };
      const setActive = (i: number) => {
        if (i === active) return;
        active = i;
        links.forEach((link, idx) => {
          link.dataset.active = String(idx === i);
          if (idx === i) link.setAttribute("aria-current", "true");
          else link.removeAttribute("aria-current");
        });
        moveTo(i);
      };
      links[0]?.setAttribute("aria-current", "true");
      moveTo(0, true);

      const show = gsap.fromTo(
        nav,
        { yPercent: -200, autoAlpha: 0 },
        {
          yPercent: 0,
          autoAlpha: 1,
          duration: reduce ? 0 : 0.45,
          ease: "power3.out",
          paused: true,
        },
      );

      if (reduce) {
        show.progress(1);
      } else {
        gsap
          .timeline({ delay: 1.2, onStart: () => void show.play() })
          .from("[data-nav=pill]", {
            clipPath: "inset(0% 42% 0% 42% round 999px)",
            duration: 0.9,
            ease: "expo.inOut",
          })
          .from(
            "[data-nav=label]",
            {
              yPercent: 120,
              autoAlpha: 0,
              duration: 0.6,
              stagger: 0.06,
              ease: "back.out(2)",
            },
            "-=0.45",
          )
          .add(() => moveTo(active), "-=0.3");
      }

      ScrollTrigger.create({
        start: 0,
        end: "max",
        onUpdate: (self) => {
          if (self.scroll() < 120 || self.direction === -1) show.play();
          else show.reverse();
        },
      });

      gsap.fromTo(
        "[data-nav=progress]",
        { scaleX: 0 },
        {
          scaleX: 1,
          ease: "none",
          scrollTrigger: { start: 0, end: "max", scrub: 0.3 },
        },
      );

      const sections = navItems.map((item) => {
        const id = sectionId(item.link);
        return id ? document.getElementById(id) : null;
      });
      const firstSection = sections.find(Boolean);
      navItems.forEach((item, i) => {
        const section = sections[i];
        if (section) {
          ScrollTrigger.create({
            trigger: section,
            start: "top center",
            end: "bottom center",
            refreshPriority: -1,
            onToggle: (self) => self.isActive && setActive(i),
          });
        } else if (!sectionId(item.link) && firstSection) {
          ScrollTrigger.create({
            start: 0,
            endTrigger: firstSection,
            end: "top center",
            refreshPriority: -1,
            onToggle: (self) => self.isActive && setActive(i),
          });
        }
      });

      const cleanups: (() => void)[] = [];
      links.forEach((link, i) => {
        const roll = gsap.to(link.querySelectorAll("[data-nav=roll]"), {
          yPercent: -100,
          duration: 0.35,
          ease: "power3.out",
          paused: true,
        });
        const enter = () => {
          moveTo(i);
          if (!reduce) roll.play();
        };
        const leave = () => roll.reverse();
        link.addEventListener("pointerenter", enter);
        link.addEventListener("pointerleave", leave);
        cleanups.push(() => {
          link.removeEventListener("pointerenter", enter);
          link.removeEventListener("pointerleave", leave);
        });
      });
      const onListLeave = () => moveTo(active);
      list.addEventListener("pointerleave", onListLeave);

      const onRefresh = () => moveTo(active, true);
      ScrollTrigger.addEventListener("refresh", onRefresh);

      return () => {
        cleanups.forEach((fn) => fn());
        list.removeEventListener("pointerleave", onListLeave);
        ScrollTrigger.removeEventListener("refresh", onRefresh);
      };
    },
    { scope: root },
  );

  const handleClick = (e: React.MouseEvent, link: string) => {
    const id = sectionId(link);
    if (window.location.pathname !== "/") return;
    e.preventDefault();
    if (id) {
      document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    } else {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  return (
    <div
      ref={root}
      className={cn(
        "invisible fixed inset-x-0 top-6 z-5000 mx-auto flex max-w-fit items-center justify-center md:top-10",
        className,
      )}
    >
      <nav
        data-nav="pill"
        aria-label="Main"
        className="bg-black-100/70 font-heading relative overflow-hidden rounded-full border border-white/10 px-2 py-1.5 shadow-lg shadow-violet-500/10 backdrop-blur-md"
      >
        <div data-nav="list" className="relative flex items-center gap-1">
          <span
            data-nav="highlight"
            aria-hidden
            className="invisible absolute top-0 left-0 h-full rounded-full border border-violet-300/20 bg-linear-to-r from-violet-500/25 to-sky-500/25"
          />
          {navItems.map((navItem, idx) => (
            <a
              key={navItem.link}
              data-nav="link"
              data-active={idx === 0}
              href={navItem.link}
              onClick={(e) => handleClick(e, navItem.link)}
              className="relative flex items-center rounded-full px-4 py-2 text-lg font-medium text-white/60 transition-colors duration-300 hover:text-white data-[active=true]:text-white md:text-xl"
            >
              <span className="sr-only">{navItem.name}</span>
              <span
                data-nav="label"
                className="relative block overflow-hidden"
                aria-hidden
              >
                <span data-nav="roll" className="flex items-center">
                  <Label item={navItem} />
                </span>
                <span
                  data-nav="roll"
                  className="absolute inset-x-0 top-full flex items-center text-violet-200"
                >
                  <Label item={navItem} />
                </span>
              </span>
            </a>
          ))}
        </div>
        <span
          aria-hidden
          className="absolute inset-x-6 bottom-0 h-px overflow-hidden rounded-full bg-white/5"
        >
          <span
            data-nav="progress"
            className="block h-full w-full origin-left bg-linear-to-r from-violet-400 to-sky-400"
          />
        </span>
      </nav>
    </div>
  );
};
