"use client";

import React, { useMemo } from "react";
import { motion } from "framer-motion";

export function SnakePuzzle() {
    // Generate a 15x7 grid of "activity levels"
    const grid = useMemo(() => {
        return Array.from({ length: 7 }, () =>
            Array.from({ length: 20 }, () => Math.floor(Math.random() * 4))
        );
    }, []);

    const colors = [
        "bg-border/30",    // Level 0
        "bg-accent/20",    // Level 1
        "bg-accent/50",    // Level 2
        "bg-accent",       // Level 3
    ];

    // Snake path animation
    const snakePath = [
        { x: 0, y: 0 }, { x: 1, y: 0 }, { x: 2, y: 0 }, { x: 2, y: 1 },
        { x: 1, y: 1 }, { x: 0, y: 1 }, { x: 0, y: 2 }, { x: 1, y: 2 },
        { x: 2, y: 2 }, { x: 3, y: 2 }, { x: 3, y: 1 }, { x: 3, y: 0 },
        { x: 4, y: 0 }, { x: 5, y: 0 }, { x: 6, y: 0 }, { x: 6, y: 1 },
        { x: 5, y: 1 }, { x: 4, y: 1 }, { x: 4, y: 2 }, { x: 5, y: 2 },
    ];

    return (
        <div className="space-y-4">
            <div className="flex items-center justify-between">
                <span className="text-[10px] font-mono font-bold text-muted-foreground uppercase tracking-[0.2em]">Contribution_Graph</span>
                <div className="flex items-center gap-2">
                    {colors.map((c, i) => (
                        <div key={i} className={`w-2 h-2 ${c}`} />
                    ))}
                </div>
            </div>

            <div
                className="relative inline-grid gap-1 p-3 border border-border bg-background/50 backdrop-blur-sm"
                style={{ gridTemplateColumns: "repeat(20, minmax(0, 1fr))" }}
            >
                {grid.map((row, y) => (
                    row.map((level, x) => (
                        <div
                            key={`${x}-${y}`}
                            className={`w-2.5 h-2.5 md:w-3 md:h-3 ${colors[level]} transition-colors duration-500`}
                        />
                    ))
                ))}

                {/* The "Snake" animation */}
                <motion.div
                    className="absolute w-2.5 h-2.5 md:w-3 md:h-3 bg-white shadow-[0_0_10px_#fff] z-10"
                    animate={{
                        x: snakePath.map(p => p.x * 13 + 12), // Adjust for gap (1) and padding (12)
                        y: snakePath.map(p => p.y * 13 + 12),
                    }}
                    transition={{
                        duration: 4,
                        repeat: Infinity,
                        ease: "linear",
                    }}
                    style={{
                        top: 0,
                        left: 0,
                    }}
                />
            </div>

            <div className="flex justify-between items-center opacity-40">
                <span className="text-[9px] font-mono tracking-widest uppercase italic">Processing_Activity...</span>
                <span className="text-[9px] font-mono tracking-widest uppercase">Nodes: 140 / Stable</span>
            </div>
        </div>
    );
}
