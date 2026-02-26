"use client";

import React, { useEffect, useState, useMemo } from "react";
import { motion } from "framer-motion";

export function BackgroundDots() {
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    // Generate random positions for red nodes
    // We use useMemo to keep them stable between re-renders
    const nodes = useMemo(() => {
        return Array.from({ length: 15 }, (_, i) => ({
            id: i,
            top: `${Math.random() * 100}%`,
            left: `${Math.random() * 100}%`,
            delay: Math.random() * 5,
            duration: 3 + Math.random() * 4,
            size: 2 + Math.random() * 2
        }));
    }, []);

    if (!mounted) return null;

    return (
        <div className="fixed inset-0 pointer-events-none overflow-hidden z-[-1]">
            {nodes.map((node) => (
                <motion.div
                    key={node.id}
                    className="absolute rounded-full bg-accent"
                    style={{
                        top: node.top,
                        left: node.left,
                        width: node.size,
                        height: node.size,
                        filter: "blur(0.5px)",
                    }}
                    animate={{
                        opacity: [0, 0.4, 0],
                        scale: [0.8, 1.2, 0.8],
                    }}
                    transition={{
                        duration: node.duration,
                        repeat: Infinity,
                        delay: node.delay,
                        ease: "easeInOut",
                    }}
                />
            ))}
        </div>
    );
}
