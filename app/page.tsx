"use client";

import React from "react";
import { motion } from "framer-motion";
import { Mail, Linkedin, Github } from "lucide-react";
import { PageTransition } from "@/components/PageTransition";
import { SystemVisualization } from "@/components/SystemVisualization";
import {
  profile,
  experience,
  projects,
  research,
  skills
} from "@/lib/portfolioData";

const sectionReveal = {
  initial: { opacity: 0, y: 8 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.4, ease: "circOut" as const }
};

function Typewriter({ text, delay }: { text: string; delay: number }) {
  const [currentText, setCurrentText] = React.useState("");
  const [isDeleting, setIsDeleting] = React.useState(false);
  const [started, setStarted] = React.useState(false);

  React.useEffect(() => {
    const timer = setTimeout(() => setStarted(true), delay);
    return () => clearTimeout(timer);
  }, [delay]);

  React.useEffect(() => {
    if (!started) return;

    const handleTyping = () => {
      if (!isDeleting) {
        if (currentText.length < text.length) {
          setCurrentText(text.substring(0, currentText.length + 1));
        } else {
          setTimeout(() => setIsDeleting(true), 2000);
          return;
        }
      } else {
        if (currentText.length > 0) {
          setCurrentText(text.substring(0, currentText.length - 1));
        } else {
          setIsDeleting(false);
          return;
        }
      }
    };

    const speed = isDeleting ? 40 : 80;
    const timeout = setTimeout(handleTyping, speed);

    return () => clearTimeout(timeout);
  }, [started, isDeleting, currentText, text]);

  return (
    <div className="flex items-center min-h-[1.5em]">
      <p className="text-lg md:text-2xl font-bold uppercase tracking-[0.2em] text-muted-foreground leading-none">
        {currentText}
      </p>
    </div>
  );
}

export default function PortfolioHome() {
  return (
    <PageTransition>
      <div className="w-full px-6 md:px-12 py-20 md:py-32 space-y-20 md:space-y-28">

        {/* --- IDENTITY HEADER (HERO) --- */}
        <section id="hero" className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-12 pt-8 md:pt-12 border-t border-border relative">
          <div className="md:col-span-1 border-r border-border hidden md:block">
            <span className="text-[11px] font-mono text-muted-foreground origin-top-left -rotate-90 block mt-24 whitespace-nowrap tracking-widest leading-none opacity-50 font-bold">OS_VER / STABLE</span>
          </div>

          <div className="md:col-span-6 space-y-8 md:space-y-12 relative">
            <div className="space-y-6">
              <div className="space-y-4">
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="flex items-center gap-2"
                >
                  <div className="w-2 h-2 bg-accent rounded-full shadow-[0_0_8px_#ff0037]" />
                  <span className="text-[11px] font-bold uppercase tracking-[0.3em] text-muted-foreground">Operational_Index</span>
                </motion.div>

                <div className="space-y-4 pb-8 border-b border-border/50">
                  <motion.h1
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="text-3xl md:text-4xl font-bold uppercase tracking-tighter text-foreground leading-none"
                  >
                    {profile.name}
                  </motion.h1>
                  <div className="h-6 md:h-8 flex items-center">
                    <Typewriter text="AI Developer" delay={1200} />
                  </div>
                </div>
              </div>

              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.2 }}
                className="text-sm md:text-base text-muted-foreground font-medium max-w-xl leading-relaxed uppercase tracking-tight"
              >
                Working on machine learning systems, interaction models and data-driven intelligence. Architecting scalable computational frameworks.
              </motion.p>
            </div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="flex items-center pt-6"
            >
              <a href="#contact" className="nothing-button scale-125 origin-left">Get in Touch</a>
            </motion.div>

            {/* AI Control Connector Line */}
            <div className="absolute top-1/2 -right-16 w-16 h-px bg-border hidden xl:block opacity-40" />
          </div>

          <div className="md:col-span-5 border border-border bg-background h-56 md:h-80 relative overflow-hidden group">
            <SystemVisualization />
          </div>
        </section>

        {/* --- SECTION: ABOUT --- */}
        <section id="about" className="space-y-12 md:space-y-20 pt-12">
          <div className="flex items-center justify-between border-b border-border pb-6 md:pb-8">
            <h2 className="text-sm md:text-lg font-bold uppercase tracking-[0.4em] md:tracking-[0.5em] text-foreground">Section 01 / About</h2>
            <span className="text-[10px] md:text-[12px] font-mono text-muted-foreground uppercase opacity-70 tracking-widest font-bold">Identity_Core</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-12 gap-12 md:gap-24">
            <div className="md:col-span-3">
              <span className="text-[11px] md:text-[12px] font-mono text-accent font-bold uppercase tracking-[0.3em]">Profile</span>
            </div>
            <div className="md:col-span-9 space-y-10 md:space-y-12">
              <div className="space-y-6 md:space-y-8">
                <p className="text-xl md:text-2xl font-bold text-foreground uppercase tracking-tight leading-relaxed max-w-4xl">
                  I am a Computer Science student with a focus on building intelligent systems through data, interaction and secure design.
                </p>
                <p className="text-base md:text-lg font-medium text-muted-foreground uppercase tracking-tight leading-relaxed max-w-4xl opacity-80">
                  My work involves developing machine learning solutions, exploring human-centered interaction models, and applying data analytics to real-world challenges.
                </p>
                <p className="text-base md:text-lg font-medium text-muted-foreground uppercase tracking-tight leading-relaxed max-w-4xl opacity-80">
                  I am interested in creating systems that are scalable, practical and grounded in research-driven thinking.
                </p>
              </div>
              <div className="pt-8 border-t border-border/30">
                <span className="text-[10px] md:text-[11px] font-mono text-muted-foreground/60 uppercase tracking-[0.4em] font-bold">
                  Based in Bangalore
                </span>
              </div>
            </div>
          </div>
        </section>

        {/* --- SECTION: PROJECTS --- */}
        <section id="projects" className="space-y-12 md:space-y-20 pt-12">
          <div className="flex items-center justify-between border-b border-border pb-6 md:pb-8">
            <h2 className="text-sm md:text-lg font-bold uppercase tracking-[0.4em] md:tracking-[0.5em] text-foreground">Section 02 / Project Build</h2>
            <span className="text-[10px] md:text-[12px] font-mono text-muted-foreground uppercase opacity-70 tracking-widest font-bold">Execution_Log</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-8">
            {[projects[1], projects[2], projects[0], projects[3]].map((proj, i) => {
              const isClickable = proj.title.includes("Cognitive") || proj.title.includes("Chaos");
              const CardContent = (
                <div className="space-y-8 md:space-y-12 h-full">
                  <div className="flex justify-between items-center text-[10px] md:text-[11px] font-mono text-muted-foreground font-bold tracking-widest uppercase">
                    <span>{proj.date}</span>
                    <span className={`${isClickable ? "group-hover:text-accent" : ""} transition-colors`}>{isClickable ? "RESEARCH_ACTIVE" : "STABLE_BUILD"}</span>
                  </div>
                  <div>
                    <h3 className={`text-xl md:text-3xl font-bold text-foreground uppercase mb-4 md:mb-6 transition-all duration-300 tracking-tight leading-tight ${isClickable ? "group-hover:underline decoration-1 underline-offset-8" : ""}`}>
                      {proj.title}
                    </h3>
                    <p className="text-[14px] md:text-[15px] text-muted-foreground font-medium leading-relaxed uppercase tracking-tight opacity-80 max-w-2xl">
                      {proj.desc}
                    </p>
                  </div>
                  <div className="flex gap-3 md:gap-4 mt-auto">
                    <div className={`w-2 md:w-2.5 h-2 md:h-2.5 bg-foreground transition-colors ${isClickable ? "group-hover:bg-accent" : ""}`} />
                    <div className="w-2 md:w-2.5 h-2 md:h-2.5 bg-border transition-colors" />
                    <div className="w-2 md:w-2.5 h-2 md:h-2.5 bg-border transition-colors opacity-30" />
                  </div>
                </div>
              );

              if (isClickable) {
                return (
                  <motion.a
                    key={proj.title}
                    href={proj.link || "#"}
                    target={proj.link ? "_blank" : undefined}
                    {...sectionReveal}
                    className="nothing-card group p-6 md:p-12 block cursor-pointer transition-all hover:border-foreground"
                  >
                    {CardContent}
                  </motion.a>
                );
              }

              return (
                <motion.div
                  key={proj.title}
                  {...sectionReveal}
                  className="nothing-card p-6 md:p-12 opacity-80"
                >
                  {CardContent}
                </motion.div>
              );
            })}
          </div>
        </section>

        {/* --- SECTION: PUBLICATIONS --- */}
        <section id="publications" className="space-y-12 md:space-y-20 pt-12">
          <div className="flex items-center justify-between border-b border-border pb-6 md:pb-8">
            <h2 className="text-sm md:text-lg font-bold uppercase tracking-[0.4em] md:tracking-[0.5em] text-foreground">Section 03 / Publications</h2>
            <span className="text-[10px] md:text-[12px] font-mono text-muted-foreground uppercase opacity-70 tracking-widest font-bold">Dissemination</span>
          </div>

          <div className="border border-border divide-y divide-border bg-background">
            {research.map((res, i) => (
              <motion.a
                key={res.title}
                href={res.url || "#"}
                target="_blank"
                rel="noopener noreferrer"
                {...sectionReveal}
                className="p-8 md:p-12 flex items-start gap-8 md:gap-16 group hover:bg-secondary transition-colors cursor-pointer block"
              >
                <span className="text-[12px] md:text-[14px] font-mono text-border group-hover:text-foreground transition-colors font-bold mt-1">0{i + 1}</span>
                <div className="space-y-3 md:space-y-4">
                  <p className="text-[10px] md:text-[11px] font-mono text-accent font-bold uppercase tracking-widest">{res.source}</p>
                  <h3 className="text-lg md:text-2xl font-bold text-foreground uppercase tracking-tight leading-tight max-w-4xl group-hover:underline decoration-1 underline-offset-4">{res.title}</h3>
                  <p className="text-[12px] md:text-[13px] text-muted-foreground font-medium uppercase tracking-tight opacity-70">
                    {res.desc}
                  </p>
                </div>
              </motion.a>
            ))}
          </div>
        </section>

        {/* --- SECTION: TIMELINE --- */}
        <section id="experience" className="space-y-12 md:space-y-20 pt-12">
          <div className="flex items-center justify-between border-b border-border pb-6 md:pb-8">
            <h2 className="text-sm md:text-lg font-bold uppercase tracking-[0.4em] md:tracking-[0.5em] text-foreground">Section 04 / Experience</h2>
            <span className="text-[10px] md:text-[12px] font-mono text-muted-foreground uppercase opacity-70 tracking-widest font-bold">Operational_Record</span>
          </div>

          <div className="border border-border divide-y divide-border">
            {experience.map((exp, i) => (
              <motion.div
                key={exp.company}
                {...sectionReveal}
                className="grid grid-cols-1 md:grid-cols-12 gap-6 md:gap-10 p-8 md:p-12 bg-background"
              >
                <div className="md:col-span-8">
                  <h3 className="text-xl md:text-2xl font-bold text-foreground uppercase tracking-tight leading-none">{exp.company}</h3>
                  <p className="text-[10px] md:text-[11px] uppercase tracking-[0.3em] md:tracking-[0.4em] text-accent font-bold mt-2 md:mt-3">{exp.role}</p>
                </div>
                <div className="md:col-span-4 md:text-right self-center">
                  <p className="text-[11px] md:text-[12px] font-mono text-muted-foreground font-bold uppercase tracking-widest">{exp.duration}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* --- SECTION: TOOLS --- */}
        <section id="tools" className="space-y-12 md:space-y-20 pt-12 pb-12 md:pb-24">
          <div className="flex items-center justify-between border-b border-border pb-6 md:pb-8">
            <h2 className="text-sm md:text-lg font-bold uppercase tracking-[0.4em] md:tracking-[0.5em] text-foreground">Section 05 / Tools</h2>
            <span className="text-[10px] md:text-[12px] font-mono text-muted-foreground uppercase opacity-70 tracking-widest font-bold">Inventory</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {skills.technical.map((tech, i) => (
              <motion.div
                key={tech.name}
                {...sectionReveal}
                transition={{ delay: i * 0.05 }}
                className="nothing-card p-8 md:p-10 space-y-8 md:space-y-10 group relative overflow-hidden"
              >
                {/* Visual Accent */}
                <div className="absolute top-0 right-0 p-4 opacity-5">
                  <span className="text-4xl font-bold font-mono">0{i + 1}</span>
                </div>

                <div className="flex justify-between items-end">
                  <div className="space-y-1">
                    <span className="text-[10px] font-mono text-muted-foreground uppercase tracking-widest font-bold">Module_{i + 1}</span>
                    <h3 className="text-xl md:text-2xl font-bold text-foreground uppercase tracking-tight">{tech.name}</h3>
                  </div>
                  <span className="text-[12px] font-mono text-accent font-bold">{tech.level}%</span>
                </div>

                {/* Technical Progress Bar */}
                <div className="space-y-3">
                  <div className="h-1.5 w-full bg-secondary overflow-hidden relative">
                    <motion.div
                      initial={{ width: 0 }}
                      whileInView={{ width: `${tech.level}%` }}
                      transition={{ duration: 1, delay: 0.5 }}
                      className="absolute inset-y-0 left-0 bg-accent"
                    />
                    {/* Segment Lines */}
                    <div className="absolute inset-0 flex justify-between px-1">
                      {[...Array(10)].map((_, j) => (
                        <div key={j} className="h-full w-px bg-background/20" />
                      ))}
                    </div>
                  </div>
                  <div className="flex justify-between text-[9px] font-mono text-muted-foreground/50 uppercase tracking-widest font-bold">
                    <span>Diagnostic_Stable</span>
                    <span>Peak_Load</span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Core Competencies (Soft Skills) */}
          <div className="pt-12 md:pt-20 border-t border-border/30 text-center">
            <div className="mb-10 md:mb-12">
              <span className="text-[11px] font-mono text-accent font-bold uppercase tracking-[0.4em]">Core_Competencies</span>
            </div>
            <div className="flex flex-wrap justify-center gap-4 md:gap-6">
              {skills.soft.map((skill) => (
                <div key={skill} className="px-5 md:px-6 py-2 border border-border/50 text-[11px] md:text-[12px] font-bold uppercase tracking-widest text-muted-foreground hover:border-accent hover:text-accent transition-all duration-300">
                  {skill}
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* --- CONTACT SECTION (A QUIET INVITATION) --- */}
        <section id="contact" className="pt-12 md:pt-20 max-w-4xl mx-auto">
          <div className="text-center space-y-16 md:space-y-24">
            {/* Header */}
            <div className="space-y-6 md:space-y-8">
              <h3 className="text-2xl md:text-4xl font-bold tracking-tight text-foreground uppercase">Get in Touch</h3>
              <p className="text-[13px] md:text-[15px] text-muted-foreground uppercase tracking-tight leading-relaxed max-w-xl mx-auto font-medium">
                If you&apos;d like to collaborate, discuss ideas, or explore opportunities — feel free to reach out.
              </p>
            </div>

            {/* Methods */}
            <div className="flex justify-center flex-wrap gap-8 md:gap-16">
              {[
                { label: "Email", icon: Mail, href: `https://mail.google.com/mail/?view=cm&fs=1&to=aaronshyjan2019@gmail.com` },
                { label: "LinkedIn", icon: Linkedin, href: profile.social.linkedin },
                { label: "GitHub", icon: Github, href: profile.social.github }
              ].map((item, i) => (
                <a
                  key={item.label}
                  href={item.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group relative"
                >
                  <div className="w-20 h-20 flex items-center justify-center border border-border bg-background group-hover:border-accent transition-all duration-500">
                    <item.icon size={28} strokeWidth={1} className="text-muted-foreground group-hover:text-accent group-hover:scale-110 transition-all duration-300" />

                    {/* Status Red Dot */}
                    <div className="absolute top-2 right-2 flex items-center justify-center">
                      <div className="w-1.5 h-1.5 bg-accent rounded-full animate-pulse shadow-[0_0_8px_#ff0037]" />
                    </div>
                  </div>
                  {/* Subtle focus underline */}
                  <div className="absolute -bottom-2 left-0 right-0 h-px bg-accent scale-x-0 group-hover:scale-x-100 transition-transform duration-500" />
                </a>
              ))}
            </div>

            {/* Note */}
            <div className="pt-12 md:pt-20">
              <span className="text-[10px] md:text-[11px] font-mono font-bold text-muted-foreground/40 uppercase tracking-[0.4em]">
                Explore collaborative_growth
              </span>
            </div>
          </div>
        </section>

      </div>
    </PageTransition>
  );
}
