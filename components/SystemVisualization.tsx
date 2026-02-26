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
                    <div className="w-44 h-44 md:w-52 md:h-52 rounded-full border border-border flex items-center justify-center p-[3px]">
                        <div className="w-full h-full rounded-full overflow-hidden bg-secondary">
                            <img
                                src="/profile.jpg"
                                alt="Profile"
                                className="w-full h-full object-cover"
                            />
                        </div>
                    </div>

                    {/* Status Dot */}
                    <div className="absolute top-3 right-3 w-3 h-3 bg-accent rounded-full border-2 border-background animate-pulse" />
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