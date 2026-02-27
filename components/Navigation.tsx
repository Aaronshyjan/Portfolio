"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { profile } from "@/lib/portfolioData";
import { ThemeToggle } from "./ThemeToggle";
import { SnakePuzzle } from "./SnakePuzzle";
import { Mail, Linkedin, Github, ExternalLink, ShieldCheck, Globe, Cpu, Menu, X } from "lucide-react";

export function Navbar() {
    const [activeSection, setActiveSection] = React.useState("");
    const [isMenuOpen, setIsMenuOpen] = React.useState(false);

    const navItems = [
        { name: "About", href: "#about" },
        { name: "Projects", href: "#projects" },
        { name: "Publications", href: "#publications" },
        { name: "Experience", href: "#experience" },
        { name: "Tools", href: "#tools" },
        { name: "Contact", href: "#contact" },
    ];

    React.useEffect(() => {
        const observerOptions = {
            root: null,
            rootMargin: "-20% 0px -70% 0px",
            threshold: 0,
        };

        const observerCallback = (entries: IntersectionObserverEntry[]) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    setActiveSection(entry.target.id);
                }
            });
        };

        const observer = new IntersectionObserver(observerCallback, observerOptions);

        navItems.forEach((item) => {
            const element = document.getElementById(item.href.replace("#", ""));
            if (element) observer.observe(element);
        });

        return () => observer.disconnect();
    }, []);

    const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
    const closeMenu = () => setIsMenuOpen(false);

    return (
        <nav className="fixed top-0 left-0 right-0 z-50 border-b border-border bg-background/80 backdrop-blur-md">
            <div className="w-full px-6 md:px-12 h-16 flex items-center justify-between lg:grid lg:grid-cols-3">
                {/* Left: Identity */}
                <div className="flex items-center gap-4">
                    <button
                        onClick={toggleMenu}
                        className="lg:hidden p-2 -ml-2 text-foreground hover:text-accent transition-colors"
                        aria-label="Toggle Menu"
                    >
                        {isMenuOpen ? <X size={20} /> : <Menu size={20} />}
                    </button>
                    <Link href="/" className="font-bold text-sm md:text-base tracking-tight uppercase transition-all hover:tracking-widest whitespace-nowrap">
                        {profile.name} <span className="text-accent font-black tracking-widest">_</span>
                    </Link>
                </div>

                {/* Center: Navigation (Hidden on mobile) */}
                <div className="hidden lg:flex items-center justify-center gap-10 text-[11px] uppercase tracking-[0.4em] font-bold text-muted-foreground">
                    {navItems.map((item) => (
                        <Link
                            key={item.href}
                            href={item.href}
                            onClick={() => setActiveSection(item.href.replace("#", ""))}
                            className={`transition-colors relative group ${activeSection === item.href.replace("#", "") ? "text-accent" : "hover:text-foreground"
                                }`}
                        >
                            <motion.span
                                whileTap={{ color: "#ff0037" }}
                                className="inline-block"
                            >
                                {item.name}
                            </motion.span>
                            {activeSection === item.href.replace("#", "") && (
                                <motion.div
                                    layoutId="activeNav"
                                    className="absolute -bottom-1 left-0 right-0 h-[1px] bg-accent"
                                    transition={{ type: "spring", stiffness: 380, damping: 30 }}
                                />
                            )}
                        </Link>
                    ))}
                </div>

                {/* Right: Actions */}
                <div className="flex items-center justify-end">
                    <ThemeToggle />
                </div>
            </div>

            {/* Mobile Navigation Backdrop */}
            {isMenuOpen && (
                <div
                    className="lg:hidden fixed inset-0 bg-background/60 backdrop-blur-sm z-[-1]"
                    onClick={closeMenu}
                />
            )}

            {/* Mobile Navigation Drawer */}
            <motion.div
                initial={false}
                animate={isMenuOpen ? { height: "auto", opacity: 1 } : { height: 0, opacity: 0 }}
                className="lg:hidden overflow-hidden bg-background border-t border-border"
            >
                <div className="px-6 py-8 flex flex-col gap-6 font-bold uppercase tracking-[0.3em] text-[10px]">
                    {navItems.map((item) => (
                        <Link
                            key={item.href}
                            href={item.href}
                            onClick={() => {
                                closeMenu();
                                setActiveSection(item.href.replace("#", ""));
                            }}
                            className={`transition-colors ${activeSection === item.href.replace("#", "") ? "text-accent" : "text-muted-foreground"}`}
                        >
                            {item.name}
                        </Link>
                    ))}
                </div>
            </motion.div>
        </nav>
    );
}

export function Footer() {
    return (
        <footer className="border-t border-border bg-background pt-24 pb-12 mt-40">
            <div className="w-full px-6 md:px-12">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-8">
                    {/* Column 1: Identity & Meta (4 cols) */}
                    <div className="lg:col-span-4 space-y-10">
                        <div className="space-y-4">
                            <h2 className="text-xl font-bold tracking-tighter uppercase">
                                {profile.name}
                            </h2>
                            <p className="text-[11px] font-medium text-muted-foreground uppercase tracking-widest leading-loose max-w-xs">
                                Computer Science Student focused on building intelligent computational systems and secure technical infrastructure.
                            </p>
                        </div>

                        <div className="space-y-2 pt-4">
                            <div className="flex items-center gap-2 text-[10px] font-mono text-muted-foreground font-bold uppercase tracking-widest">
                                <ShieldCheck size={12} className="text-accent" />
                                Secure_Encryption_Active
                            </div>
                            <div className="flex items-center gap-2 text-[10px] font-mono text-muted-foreground font-bold uppercase tracking-widest">
                                <Globe size={12} className="text-accent" />
                                {profile.location}
                            </div>
                        </div>
                    </div>

                    {/* Column 2: Activity Visual (4 cols) */}
                    <div className="lg:col-span-4 border-l lg:border-x border-border/50 lg:px-8">
                        <SnakePuzzle />
                    </div>

                    {/* Column 3: Communication & Links (4 cols) */}
                    <div className="lg:col-span-4 flex flex-col md:grid md:grid-cols-2 lg:flex lg:flex-col gap-12 lg:pl-12">


                        <div className="space-y-6">
                            <p className="text-[10px] font-mono font-bold uppercase tracking-[0.4em] text-accent">Collaboration</p>
                            <div className="flex items-center gap-4">
                                <a href="https://mail.google.com/mail/?view=cm&fs=1&to=aaronshyjan2019@gmail.com" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-foreground transition-colors p-2.5 border border-border group" aria-label="Email">
                                    <Mail size={16} strokeWidth={1.5} className="group-hover:text-accent" />
                                </a>
                                <a href={profile.social.linkedin} target="_blank" className="text-muted-foreground hover:text-foreground transition-colors p-2.5 border border-border group" aria-label="LinkedIn">
                                    <Linkedin size={16} strokeWidth={1.5} className="group-hover:text-accent" />
                                </a>
                                <a href={profile.social.github} target="_blank" className="text-muted-foreground hover:text-foreground transition-colors p-2.5 border border-border group" aria-label="GitHub">
                                    <Github size={16} strokeWidth={1.5} className="group-hover:text-accent" />
                                </a>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Bottom Bar */}
                <div className="mt-24 pt-8 border-t border-border flex flex-col md:flex-row justify-between items-center gap-6">
                    <div className="flex items-center gap-3">
                        <div className="w-8 h-[1px] bg-accent" />
                        <span className="text-[9px] font-mono font-bold text-muted-foreground uppercase tracking-[0.5em]">
                            System_Standard_Protocol_V-STABLE
                        </span>
                    </div>

                    <div className="flex items-center gap-8">
                        <p className="text-[9px] font-mono text-muted-foreground opacity-50 uppercase tracking-widest">
                            © {new Date().getFullYear()} Aaron Shyjan
                        </p>
                        <div className="flex items-center gap-2 px-3 py-1 bg-secondary border border-border">
                            <Cpu size={10} className="text-accent animate-pulse" />
                            <span className="text-[9px] font-mono font-bold tracking-widest">STABLE</span>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
}
