import { Folder, Home, Phone, Route } from "lucide-react";

export const navItems = [
  { name: "Home", link: "/", icon: <Home /> },
  { name: "Project", link: "/#project", icon: <Folder /> },
  { name: "Journey", link: "/#journey", icon: <Route /> },
  { name: "Contact", link: "/#contact", icon: <Phone /> },
];

export const projects = [
  {
    id: 1,
    title: "Library System Management",
    desc: "Library management desktop application developed using Java, Swing GUI, and OOP principles.",
    img: "/library_management.svg",
    iconLists: ["/java.svg"],
    link: "https://github.com/HUB37T/Projek-Akhir",
  },
  {
    id: 2,
    title: "Senandika",
    desc: "AI-powered self-expression platform built with Next.js, React, and conversational AI.",
    img: "/senandika.svg",
    iconLists: ["/nextjs.svg", "/react.svg"],
    link: "https://senandika-seven.vercel.app/",
  },
  {
    id: 3,
    title: "Pangantara",
    desc: "Next.js-based platform streamlining ingredient procurement between SPPG and suppliers.",
    img: "/pangantara.svg",
    iconLists: ["/nextjs.svg", "/postgresql.svg"],
    link: "https://pangantara.vercel.app/",
  },
  {
    id: 4,
    title: "FilkomEvent",
    desc: "University event management platform built with Laravel for discovery, registration, and participant management.",
    img: "/filkomevent.svg",
    iconLists: [
      "/html5.svg",
      "/tailwind-css.svg",
      "/laravel.svg",
      "/postgresql.svg",
    ],
    link: "https://filkomevent-production.up.railway.app/",
  },
  {
    id: 5,
    title: "Pendar",
    desc: "Cross-platform mental health app using Flutter and XGBoost for burnout prediction.",
    img: "/pendar.svg",
    iconLists: [
      "/flutter.svg",
      "/dart.svg",
      "/python.svg",
      "/flask.svg",
      "/supabase.svg",
    ],
    link: "https://github.com/fahrypratama17/Pendar",
  },
];

export const workExperience = [
  {
    id: 1,
    title: "HMDTIF - Front End",
    desc: "Collaborated on developing and maintaining the official website of the Informatics Engineering Student Association, Universitas Brawijaya.",
    thumbnail: "/hmdtif.svg",
  },
  {
    id: 2,
    title: "Intrivia - Front End",
    desc: "Collaborated on building and maintaining the official onboarding website for incoming Informatics Engineering students at Universitas Brawijaya.",
    thumbnail: "/intrivia.svg",
  },
];

export const socialMedia = [
  {
    id: 1,
    img: "/github.svg",
    link: "https://github.com/fahrypratama17",
  },
  {
    id: 2,
    img: "/instagram.svg",
    link: "https://instagram.com/fahrypp",
  },
  {
    id: 3,
    img: "/linkedin.svg",
    link: "https://www.linkedin.com/in/muhamad-fahry-pratama-putra-05a2a8322/",
  },
];
