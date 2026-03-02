"use client";

import { ContactForm } from "@/components/contact-form";
import { ThemeToggle } from "@/components/theme-toggle";
import { AnimatedReveal } from "@/components/animated-reveal";
import { TypingAnimation } from "@/components/typing-animation";
import { Card3D } from "@/components/3d-card";
import { SkillProgress } from "@/components/skill-progress";
import { ParticleBackground } from "@/components/particle-background";
import { ProfileImage } from "@/components/profile-image";
import { CodeSnippet } from "@/components/code-snippet";
import { ThemeSuggestions } from "@/components/theme-suggestions";
import { ScrollToTop } from "@/components/scroll-to-top";
import { useState } from "react";

const skills = [
  { name: "Java", level: 85 },
  { name: "Python", level: 80 },
  { name: "C#", level: 75 },
  { name: "MongoDB", level: 70 },
  { name: "Express", level: 85 },
  { name: "React", level: 90 },
  { name: "Node.js", level: 85 },
];

const typingTexts = [
  "Building calm, modern experiences",
  "Creating elegant solutions",
  "Developing innovative apps",
  "Crafting clean code",
];

const timeline = [
  {
    title: "BS in Information Technology",
    org: "STI College Surigao",
    detail:
      "Focused on software development, networking, and building real-world applications.",
  },
  {
    title: "Senior High School",
    org: "Siargao National Science High School",
    detail:
      "Strengthened foundations in STEM and leadership through school activities.",
  },
];

const certificates = [
  {
    title: "MERN Stack Workshop",
    detail: "Hands-on workshop covering full-stack web development.",
  },
  {
    title: "CODEFEST",
    detail: "Programming event highlighting problem-solving and teamwork.",
  },
];

const projects = [
  {
    title: "Portfolio Website",
    detail:
      "Aesthetic, responsive portfolio built with Next.js and Tailwind CSS.",
    challenges: [
      "Implementing smooth 3D card animations with proper performance optimization",
      "Creating responsive particle background that works across all devices",
      "Integrating dark theme with system preference detection",
    ],
    codeSnippet: {
      language: "typescript",
      code: `// Optimized particle background with performance throttling
const ParticleBackground = () => {
  const [particles, setParticles] = useState<Particle[]>([]);
  const animationRef = useRef<number>();
  const lastTimeRef = useRef<number>(0);
  
  const throttle = (callback: Function, limit: number) => {
    let inThrottle: boolean;
    return function(this: any) {
      const args = arguments;
      const context = this;
      if (!inThrottle) {
        callback.apply(context, args);
        inThrottle = true;
        setTimeout(() => inThrottle = false, limit);
      }
    };
  };
  
  const animate = throttle((currentTime: number) => {
    if (currentTime - lastTimeRef.current > 16) { // ~60fps
      updateParticles();
      lastTimeRef.current = currentTime;
    }
    animationRef.current = requestAnimationFrame(animate);
  }, 16);
};`,
      description: "Performance-optimized particle animation system",
    },
  },
  {
    title: "Full-Stack Practice Project",
    detail: "A sample application to demonstrate API + UI integration.",
    challenges: [
      "Implementing secure JWT authentication with refresh tokens",
      "Building real-time chat with Socket.io and Redis pub/sub",
      "Creating responsive data tables with virtual scrolling",
    ],
    codeSnippet: {
      language: "typescript",
      code: `// Secure JWT middleware with automatic token refresh
export const authenticateToken = async (req: Request, res: Response, next: NextFunction) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];
  
  if (!token) {
    return res.sendStatus(401);
  }
  
  try {
    const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET!) as any;
    req.user = decoded;
    
    // Check if token is about to expire (within 5 minutes)
    if (decoded.exp - Date.now() / 1000 < 300) {
      const refreshToken = await getRefreshToken(decoded.userId);
      if (refreshToken) {
        const newAccessToken = generateAccessToken(decoded.userId);
        res.setHeader('X-New-Token', newAccessToken);
      }
    }
    
    next();
  } catch (error) {
    return res.sendStatus(403);
  }
};`,
      description: "Secure JWT authentication with automatic refresh",
    },
  },
];

export default function Home() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navItems = [
    { href: "#about", label: "About" },
    { href: "#skills", label: "Skills" },
    { href: "#themes", label: "Themes" },
    { href: "#timeline", label: "Timeline" },
    { href: "#leadership", label: "Leadership" },
    { href: "#certificates", label: "Certificates" },
    { href: "#contact", label: "Contact" },
  ];

  return (
    <div className="min-h-screen bg-background text-foreground relative overflow-hidden">
      <ParticleBackground />
      <header className="sticky top-0 z-20 border-b border-border/40 bg-background/95 backdrop-blur-md backdrop-saturate-150">
        <div className="mx-auto flex w-full max-w-screen-2xl items-center justify-between px-6 py-4">
          <a
            href="#top"
            className="group font-semibold tracking-tight text-xl sm:text-2xl transition-colors hover:text-accent"
          >
            <span className="bg-gradient-to-r from-accent to-accent/60 bg-clip-text text-transparent">
              Kim G. Cañedo
            </span>
          </a>

          {/* Desktop Navigation */}
          <nav className="hidden items-center gap-8 text-base sm:text-lg font-medium text-muted/80 md:flex">
            {navItems.map(({ href, label }) => (
              <a
                key={href}
                className="relative transition-colors hover:text-foreground after:absolute after:-bottom-1 after:left-0 after:h-px after:w-0 after:bg-accent after:transition-all hover:after:w-full"
                href={href}
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {label}
              </a>
            ))}
          </nav>

          {/* Mobile Menu Button */}
          <button
            type="button"
            className="md:hidden relative inline-flex items-center justify-center rounded-lg p-2 text-muted/80 transition-colors hover:text-foreground hover:bg-surface/50"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="Toggle navigation menu"
          >
            <div className="w-6 h-5 relative flex flex-col justify-center">
              <span
                className={`absolute h-0.5 w-6 bg-current transition-all duration-300 ${
                  isMobileMenuOpen
                    ? "rotate-45 translate-y-0"
                    : "-translate-y-2"
                }`}
              />
              <span
                className={`h-0.5 w-6 bg-current transition-all duration-300 ${
                  isMobileMenuOpen ? "opacity-0" : "opacity-100"
                }`}
              />
              <span
                className={`absolute h-0.5 w-6 bg-current transition-all duration-300 ${
                  isMobileMenuOpen
                    ? "-rotate-45 translate-y-0"
                    : "translate-y-2"
                }`}
              />
            </div>
          </button>

          <div className="hidden md:block">
            <ThemeToggle />
          </div>
        </div>

        {/* Mobile Navigation Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden border-t border-border/40 bg-background/95 backdrop-blur-md">
            <div className="mx-auto w-full max-w-screen-2xl px-6 py-4">
              <nav className="flex flex-col gap-4 text-sm font-medium text-muted/80">
                {navItems.map(({ href, label }) => (
                  <a
                    key={href}
                    className="relative transition-colors hover:text-foreground py-2"
                    href={href}
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    {label}
                  </a>
                ))}
                <div className="pt-4 border-t border-border/20">
                  <ThemeToggle />
                </div>
              </nav>
            </div>
          </div>
        )}
      </header>

      <main id="top" className="mx-auto w-full max-w-screen-2xl px-6">
        <AnimatedReveal>
          <section className="grid gap-12 py-20 md:grid-cols-12 md:gap-16 md:py-32">
            <div className="md:col-span-7 space-y-8">
              <div className="flex items-center gap-6">
                <ProfileImage />
                <div>
                  <div className="inline-flex items-center rounded-full border border-border/40 bg-surface/50 px-4 py-2 text-sm font-medium text-muted backdrop-blur-sm">
                    <span className="mr-2 h-2 w-2 rounded-full bg-gradient-to-r from-accent to-accent/60 animate-pulse" />
                    IT student · developer · leader
                  </div>
                </div>
              </div>
              <h1 className="mt-6 text-balance text-4xl font-semibold tracking-tight sm:text-5xl md:text-7xl lg:text-8xl leading-tight">
                <span className="text-foreground block">
                  <TypingAnimation
                    texts={typingTexts}
                    className="inline-block"
                    speed={60}
                    deleteSpeed={30}
                    pauseDuration={2000}
                  />
                </span>
                <span className="text-foreground/90 block">
                  with clean code.
                </span>
              </h1>
              <p className="mt-6 max-w-prose text-pretty text-base leading-7 text-muted/80 sm:text-lg md:text-xl">
                A responsive portfolio showcasing my journey as an IT student,
                developer, and leader — designed with clean typography, smooth
                transitions, and a gentle-on-the-eyes dark theme.
              </p>

              <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:gap-3 sm:mt-10">
                <a
                  href="#contact"
                  className="group relative inline-flex h-14 sm:h-12 items-center justify-center rounded-xl bg-gradient-to-r from-accent to-accent/80 px-6 text-sm font-semibold text-black transition-all hover:scale-105 hover:shadow-lg hover:shadow-accent/25 w-full sm:w-auto"
                >
                  <span className="relative z-10">Contact me</span>
                  <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-accent to-accent/80 opacity-0 transition-opacity group-hover:opacity-100" />
                </a>
                <a
                  href="#projects"
                  className="group inline-flex h-14 sm:h-12 items-center justify-center rounded-xl border border-border/40 bg-surface/50 px-6 text-sm font-semibold text-foreground/90 backdrop-blur-sm transition-all hover:border-accent/50 hover:bg-surface/70 hover:scale-105 w-full sm:w-auto"
                >
                  View projects
                  <svg
                    className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M13 7l5 5m0 0l-5 5m5-5H6"
                    />
                  </svg>
                </a>
              </div>
            </div>

            <div className="md:col-span-5">
              <div className="group relative rounded-2xl border border-border/40 bg-gradient-to-br from-surface/50 to-surface/30 p-8 backdrop-blur-sm transition-all hover:border-accent/30 hover:shadow-lg hover:shadow-accent/10">
                <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-accent/5 to-transparent opacity-0 transition-opacity group-hover:opacity-100" />
                <div className="relative">
                  <div className="flex items-center gap-2">
                    <div className="h-6 w-6 rounded-lg bg-gradient-to-br from-accent to-accent/60" />
                    <h2 className="text-lg font-semibold text-foreground">
                      Tech Stack
                    </h2>
                  </div>
                  <p className="mt-3 text-sm text-muted/80">
                    Modern technologies I work with
                  </p>

                  <div className="mt-6 space-y-3">
                    {skills.map((skill, index) => (
                      <SkillProgress
                        key={skill.name}
                        skill={skill.name}
                        level={skill.level}
                        delay={index * 0.1}
                      />
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </section>
        </AnimatedReveal>

        <AnimatedReveal delay={0.2}>
          <section className="grid gap-6 py-12 sm:gap-8 sm:py-16 md:grid-cols-12">
            <div className="md:col-span-4">
              <div className="sticky top-20 md:top-24">
                <h2 className="text-xl font-semibold tracking-tight sm:text-2xl">
                  About
                </h2>
                <p className="mt-2 text-sm text-muted/80">A short intro.</p>
              </div>
            </div>
            <div className="md:col-span-8">
              <div className="group relative rounded-2xl border border-border/40 bg-gradient-to-br from-surface/50 to-surface/30 p-6 sm:p-8 backdrop-blur-sm transition-all hover:border-accent/30 hover:shadow-lg hover:shadow-accent/10">
                <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-accent/5 to-transparent opacity-0 transition-opacity group-hover:opacity-100" />
                <div className="relative">
                  <div className="flex items-start gap-4">
                    <div className="mt-1 h-8 w-8 rounded-lg bg-gradient-to-br from-accent to-accent/60 flex-shrink-0" />
                    <div>
                      <p className="leading-7 text-muted/90 text-base sm:text-lg">
                        I&apos;m{" "}
                        <span className="font-semibold text-foreground">
                          Kim G. Cañedo
                        </span>{" "}
                        — an IT student with a passion for innovation, building
                        practical applications, and contributing through
                        leadership and teamwork.
                      </p>
                      <div className="mt-6 flex flex-wrap gap-2">
                        <span className="inline-flex items-center rounded-full border border-border/40 bg-background/50 px-3 py-1 text-xs font-medium text-muted/80 backdrop-blur-sm">
                          🚀 Innovation
                        </span>
                        <span className="inline-flex items-center rounded-full border border-border/40 bg-background/50 px-3 py-1 text-xs font-medium text-muted/80 backdrop-blur-sm">
                          💻 Development
                        </span>
                        <span className="inline-flex items-center rounded-full border border-border/40 bg-background/50 px-3 py-1 text-xs font-medium text-muted/80 backdrop-blur-sm">
                          👥 Leadership
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </AnimatedReveal>

        <section
          id="skills"
          className="grid gap-6 py-12 sm:gap-8 sm:py-16 md:grid-cols-12"
        >
          <div className="md:col-span-4">
            <div className="sticky top-20 md:top-24">
              <h2 className="text-xl font-semibold tracking-tight sm:text-2xl">
                Skills
              </h2>
              <p className="mt-2 text-sm text-muted/80">
                Programming · Web · Networking
              </p>
            </div>
          </div>
          <div className="grid gap-6 md:col-span-8">
            <div className="group relative rounded-2xl border border-border/40 bg-gradient-to-br from-surface/50 to-surface/30 p-6 backdrop-blur-sm transition-all hover:border-accent/30 hover:shadow-lg hover:shadow-accent/10">
              <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-accent/5 to-transparent opacity-0 transition-opacity group-hover:opacity-100" />
              <div className="relative">
                <div className="flex items-center gap-3">
                  <div className="h-10 w-10 rounded-lg bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center text-white font-bold">
                    P
                  </div>
                  <div>
                    <h3 className="text-base font-semibold text-foreground">
                      Programming
                    </h3>
                    <p className="text-sm text-muted/80">
                      Core languages and frameworks
                    </p>
                  </div>
                </div>
                <div className="mt-4 flex flex-wrap gap-2">
                  {["Java", "Python", "C#"].map((skill) => (
                    <span
                      key={skill}
                      className="inline-flex items-center rounded-lg border border-border/40 bg-background/50 px-3 py-1.5 text-sm font-medium text-foreground/90 backdrop-blur-sm"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            </div>
            <div className="group relative rounded-2xl border border-border/40 bg-gradient-to-br from-surface/50 to-surface/30 p-6 backdrop-blur-sm transition-all hover:border-accent/30 hover:shadow-lg hover:shadow-accent/10">
              <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-accent/5 to-transparent opacity-0 transition-opacity group-hover:opacity-100" />
              <div className="relative">
                <div className="flex items-center gap-3">
                  <div className="h-10 w-10 rounded-lg bg-gradient-to-br from-green-500 to-green-600 flex items-center justify-center text-white font-bold">
                    W
                  </div>
                  <div>
                    <h3 className="text-base font-semibold text-foreground">
                      Web Development
                    </h3>
                    <p className="text-sm text-muted/80">
                      Full-stack technologies
                    </p>
                  </div>
                </div>
                <div className="mt-4 flex flex-wrap gap-2">
                  {["MongoDB", "Express", "React", "Node.js"].map((skill) => (
                    <span
                      key={skill}
                      className="inline-flex items-center rounded-lg border border-border/40 bg-background/50 px-3 py-1.5 text-sm font-medium text-foreground/90 backdrop-blur-sm"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            </div>
            <div className="group relative rounded-2xl border border-border/40 bg-gradient-to-br from-surface/50 to-surface/30 p-6 backdrop-blur-sm transition-all hover:border-accent/30 hover:shadow-lg hover:shadow-accent/10">
              <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-accent/5 to-transparent opacity-0 transition-opacity group-hover:opacity-100" />
              <div className="relative">
                <div className="flex items-center gap-3">
                  <div className="h-10 w-10 rounded-lg bg-gradient-to-br from-purple-500 to-purple-600 flex items-center justify-center text-white font-bold">
                    N
                  </div>
                  <div>
                    <h3 className="text-base font-semibold text-foreground">
                      Networking
                    </h3>
                    <p className="text-sm text-muted/80">
                      Infrastructure and systems
                    </p>
                  </div>
                </div>
                <div className="mt-4">
                  <p className="text-sm text-muted/90">
                    Fundamentals, troubleshooting, and system basics.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section
          id="themes"
          className="grid gap-6 py-12 sm:gap-8 sm:py-16 md:grid-cols-12"
        >
          <div className="md:col-span-4">
            <div className="sticky top-20 md:top-24">
              <h2 className="text-xl font-semibold tracking-tight sm:text-2xl">
                Theme Gallery
              </h2>
              <p className="mt-2 text-sm text-muted/80">
                Curated color combinations.
              </p>
            </div>
          </div>
          <div className="md:col-span-8">
            <ThemeSuggestions />
          </div>
        </section>

        <section
          id="projects"
          className="grid gap-6 py-12 sm:gap-8 sm:py-16 md:grid-cols-12"
        >
          <div className="md:col-span-4">
            <div className="sticky top-20 md:top-24">
              <h2 className="text-xl font-semibold tracking-tight sm:text-2xl">
                Projects
              </h2>
              <p className="mt-2 text-sm text-muted/80">Selected work.</p>
            </div>
          </div>
          <div className="grid gap-6 md:col-span-8 sm:grid-cols-1 lg:grid-cols-2">
            {projects.map((p) => (
              <Card3D
                key={p.title}
                intensity={10}
                className="group relative rounded-2xl border border-border/40 bg-gradient-to-br from-surface/50 to-surface/30 p-6 backdrop-blur-sm transition-all hover:border-accent/30 hover:shadow-lg hover:shadow-accent/10"
              >
                <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-accent/5 to-transparent opacity-0 transition-opacity group-hover:opacity-100" />
                <div className="relative">
                  <div className="flex items-start justify-between">
                    <div className="h-12 w-12 rounded-lg bg-gradient-to-br from-accent to-accent/60 flex items-center justify-center text-white font-bold text-lg">
                      {p.title.charAt(0)}
                    </div>
                    <div className="h-6 w-6 rounded-full bg-accent/20 flex items-center justify-center">
                      <svg
                        className="h-3 w-3 text-accent"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M13 7l5 5m0 0l-5 5m5-5H6"
                        />
                      </svg>
                    </div>
                  </div>
                  <h3 className="mt-4 text-base font-semibold text-foreground">
                    {p.title}
                  </h3>
                  <p className="mt-2 text-sm leading-6 text-muted/90">
                    {p.detail}
                  </p>

                  {/* Challenges Section */}
                  <div className="mt-4">
                    <h4 className="text-sm font-semibold text-foreground mb-2 flex items-center gap-2">
                      <span className="h-2 w-2 rounded-full bg-accent animate-pulse" />
                      Challenges
                    </h4>
                    <ul className="space-y-1">
                      {p.challenges.map((challenge, challengeIndex) => (
                        <li
                          key={challengeIndex}
                          className="text-xs text-muted/80 flex items-start gap-2"
                        >
                          <span className="text-accent/60 mt-0.5">•</span>
                          <span>{challenge}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Code Snippet Toggle */}
                  <CodeSnippet
                    language={p.codeSnippet.language}
                    code={p.codeSnippet.code}
                    description={p.codeSnippet.description}
                  />
                </div>
              </Card3D>
            ))}
          </div>
        </section>

        <section
          id="timeline"
          className="grid gap-6 py-12 sm:gap-8 sm:py-16 md:grid-cols-12"
        >
          <div className="md:col-span-4">
            <div className="sticky top-20 md:top-24">
              <h2 className="text-xl font-semibold tracking-tight sm:text-2xl">
                Timeline
              </h2>
              <p className="mt-2 text-sm text-muted/80">
                Education highlights.
              </p>
            </div>
          </div>
          <div className="grid gap-6 md:col-span-8">
            {timeline.map((item, index) => (
              <div
                key={item.title}
                className="group relative rounded-2xl border border-border/40 bg-gradient-to-br from-surface/50 to-surface/30 p-6 backdrop-blur-sm transition-all hover:border-accent/30 hover:shadow-lg hover:shadow-accent/10"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-accent/5 to-transparent opacity-0 transition-opacity group-hover:opacity-100" />
                <div className="relative">
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-3">
                        <div className="h-10 w-10 rounded-lg bg-gradient-to-br from-accent to-accent/60 flex items-center justify-center text-white font-bold">
                          {item.title.charAt(0)}
                        </div>
                        <div>
                          <h3 className="text-base font-semibold text-foreground">
                            {item.title}
                          </h3>
                          <p className="mt-1 text-sm text-muted/80">
                            {item.org}
                          </p>
                        </div>
                      </div>
                      <p className="mt-4 text-sm leading-6 text-muted/90">
                        {item.detail}
                      </p>
                    </div>
                    <div className="mt-2 h-3 w-3 rounded-full bg-gradient-to-r from-accent to-accent/60 animate-pulse" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section
          id="leadership"
          className="grid gap-6 py-12 sm:gap-8 sm:py-16 md:grid-cols-12"
        >
          <div className="md:col-span-4">
            <div className="sticky top-20 md:top-24">
              <h2 className="text-xl font-semibold tracking-tight sm:text-2xl">
                Leadership
              </h2>
              <p className="mt-2 text-sm text-muted/80">Treasurer spotlight.</p>
            </div>
          </div>
          <div className="md:col-span-8">
            <div className="group relative rounded-2xl border border-border/40 bg-gradient-to-br from-surface/50 to-surface/30 p-8 backdrop-blur-sm transition-all hover:border-accent/30 hover:shadow-lg hover:shadow-accent/10">
              <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-accent/5 to-transparent opacity-0 transition-opacity group-hover:opacity-100" />
              <div className="relative">
                <div className="flex items-start gap-4">
                  <div className="mt-1 h-12 w-12 rounded-lg bg-gradient-to-br from-purple-500 to-purple-600 flex items-center justify-center text-white font-bold text-lg flex-shrink-0">
                    👔
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-foreground">
                      School Treasurer
                    </h3>
                    <p className="mt-3 text-sm leading-7 text-muted/90">
                      Managed finances responsibly, supported planning for
                      activities, and helped ensure transparency in budgeting
                      and reporting.
                    </p>
                    <div className="mt-6 flex flex-wrap gap-2">
                      <span className="inline-flex items-center rounded-full border border-border/40 bg-background/50 px-3 py-1 text-xs font-medium text-muted/80 backdrop-blur-sm">
                        💰 Financial Management
                      </span>
                      <span className="inline-flex items-center rounded-full border border-border/40 bg-background/50 px-3 py-1 text-xs font-medium text-muted/80 backdrop-blur-sm">
                        📊 Transparency
                      </span>
                      <span className="inline-flex items-center rounded-full border border-border/40 bg-background/50 px-3 py-1 text-xs font-medium text-muted/80 backdrop-blur-sm">
                        🎯 Planning
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="grid gap-6 py-12 sm:gap-8 sm:py-16 md:grid-cols-12">
          <div className="md:col-span-4">
            <div className="sticky top-20 md:top-24">
              <h2 className="text-xl font-semibold tracking-tight sm:text-2xl">
                Certificates
              </h2>
              <p className="mt-2 text-sm text-muted/80">Achievement gallery.</p>
            </div>
          </div>
          <div className="grid gap-6 md:col-span-8 sm:grid-cols-1 lg:grid-cols-2">
            {certificates.map((c, index) => (
              <div
                key={c.title}
                className="group relative rounded-2xl border border-border/40 bg-gradient-to-br from-surface/50 to-surface/30 p-6 backdrop-blur-sm transition-all hover:border-accent/30 hover:shadow-lg hover:shadow-accent/10 hover:scale-105"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-accent/5 to-transparent opacity-0 transition-opacity group-hover:opacity-100" />
                <div className="relative">
                  <div className="flex items-start justify-between">
                    <div className="h-12 w-12 rounded-lg bg-gradient-to-br from-yellow-500 to-yellow-600 flex items-center justify-center text-white font-bold text-lg">
                      🏆
                    </div>
                    <div className="h-6 w-6 rounded-full bg-yellow-500/20 flex items-center justify-center">
                      <svg
                        className="h-3 w-3 text-yellow-500"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    </div>
                  </div>
                  <h3 className="mt-4 text-base font-semibold text-foreground">
                    {c.title}
                  </h3>
                  <p className="mt-2 text-sm leading-6 text-muted/90">
                    {c.detail}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section
          id="contact"
          className="grid gap-6 py-12 sm:gap-8 sm:py-16 md:grid-cols-12"
        >
          <div className="md:col-span-4">
            <div className="sticky top-20 md:top-24">
              <h2 className="text-xl font-semibold tracking-tight sm:text-2xl">
                Contact
              </h2>
              <div className="mt-4 space-y-3">
                <a
                  href="mailto:kimcanedo@gmail.com"
                  className="group flex items-center gap-3 text-sm text-muted/80 transition-colors hover:text-foreground"
                >
                  <div className="h-8 w-8 rounded-lg bg-gradient-to-br from-accent to-accent/60 flex items-center justify-center text-white text-sm">
                    ✉
                  </div>
                  <span>kimcanedo@gmail.com</span>
                  <svg
                    className="ml-auto h-4 w-4 transition-transform group-hover:translate-x-1"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M13 7l5 5m0 0l-5 5m5-5H6"
                    />
                  </svg>
                </a>
                <a
                  href="tel:+639517931373"
                  className="group flex items-center gap-3 text-sm text-muted/80 transition-colors hover:text-foreground"
                >
                  <div className="h-8 w-8 rounded-lg bg-gradient-to-br from-green-500 to-green-600 flex items-center justify-center text-white text-sm">
                    📱
                  </div>
                  <span>+63 951 793 1373</span>
                  <svg
                    className="ml-auto h-4 w-4 transition-transform group-hover:translate-x-1"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M13 7l5 5m0 0l-5 5m5-5H6"
                    />
                  </svg>
                </a>
              </div>
            </div>
          </div>
          <div className="md:col-span-8">
            <div className="group relative rounded-2xl border border-border/40 bg-gradient-to-br from-surface/50 to-surface/30 p-8 backdrop-blur-sm transition-all hover:border-accent/30 hover:shadow-lg hover:shadow-accent/10">
              <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-accent/5 to-transparent opacity-0 transition-opacity group-hover:opacity-100" />
              <div className="relative">
                <ContactForm />
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer className="border-t border-border/40 bg-surface/30 backdrop-blur-sm py-12">
        <div className="mx-auto w-full max-w-6xl px-6">
          <div className="flex flex-col items-center gap-4 text-center">
            <div className="flex items-center gap-2">
              <div className="h-6 w-6 rounded-lg bg-gradient-to-br from-accent to-accent/60" />
              <span className="text-sm font-medium text-foreground">
                Kim G. Cañedo
              </span>
            </div>
            <p className="text-sm text-muted/80">
              Created with passion and modern web technologies • 2026
            </p>
            <div className="flex gap-4">
              <a
                href="#top"
                className="text-sm text-muted/60 transition-colors hover:text-foreground"
              >
                Back to top ↑
              </a>
            </div>
          </div>
        </div>
      </footer>
      <ScrollToTop />
    </div>
  );
}
