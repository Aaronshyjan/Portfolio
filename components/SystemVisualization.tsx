"use client";

import React from "react";
import { motion } from "framer-motion";

export function SystemVisualization() {
    return (
        <div className="relative w-full h-full bg-background overflow-hidden flex flex-col items-center justify-center">

            {/* Dot Grid Background */}
            <div
                className="absolute inset-0 opacity-[0.15]"
                style={{
                    backgroundImage: "radial-gradient(var(--foreground) 1px, transparent 1px)",
                    backgroundSize: "14px 14px",
                }}
            />

            {/* Identity Frame */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.6, ease: "easeOut" }}
                className="relative z-10 flex items-center justify-center"
            >
                {/* Profile Circle */}
                <div className="relative">
                    <div className="w-36 h-36 md:w-52 md:h-52 rounded-full border border-border flex items-center justify-center p-[6px] transition-all duration-500 group-hover:border-accent/40 bg-background">
                        <div className="w-full h-full rounded-full overflow-hidden bg-secondary border border-border/50">
                            <img
                                src="/profile.jpg"
                                alt="Profile"
                                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                            />
                        </div>
                    </div>

                    {/* Status Dot */}
                    <div className="absolute top-2 right-2 w-3.5 h-3.5 bg-accent rounded-full border-2 border-background animate-pulse shadow-[0_0_10px_#ff0037]" />

                    {/* Decorative Ring Partial */}
                    <div className="absolute -inset-2 border border-accent/20 rounded-full border-t-transparent border-l-transparent -rotate-45 group-hover:rotate-45 transition-transform duration-1000" />
                </div>
            </motion.div>

            {/* Bottom Metadata */}
            <div className="absolute bottom-6 left-8 right-8 flex justify-between items-center opacity-50">
                <span className="text-[10px] font-mono tracking-[0.3em]">
                    SYNC_ACTIVE
                </span>
                <span className="text-[10px] font-mono tracking-[0.3em]">
                    IDENTITY_NODE // ACTIVE
                </span>
            </div>

            {/* Subtle Frame */}
            <div className="absolute inset-x-10 inset-y-10 border border-border/10 pointer-events-none" />
        </div>
    );
}
