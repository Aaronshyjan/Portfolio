"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { NetworkNode, initialNodes, initialEdges } from "@/lib/data";
import { Card } from "@/components/ui/card";
import { AlertCircle, Activity, Zap } from "lucide-react";

const NODE_RADIUS = 30;
const GRAPH_WIDTH = 800;
const GRAPH_HEIGHT = 500;

const nodePositions: Record<string, { x: number; y: number }> = {
    "1": { x: 400, y: 100 },
    "2": { x: 250, y: 200 },
    "3": { x: 550, y: 200 },
    "4": { x: 400, y: 300 },
    "5": { x: 600, y: 450 },
    "6": { x: 150, y: 300 },
    "7": { x: 50, y: 400 },
    "8": { x: 250, y: 400 },
    "9": { x: 400, y: 450 },
    "10": { x: 200, y: 450 },
};

export function NetworkGraph() {
    const [nodes, setNodes] = useState<NetworkNode[]>(initialNodes);
    const [isSimulating, setIsSimulating] = useState(false);
    const [failedCount, setFailedCount] = useState(0);

    const startSimulation = () => {
        setNodes(initialNodes.map(n => ({ ...n, status: "healthy", healthScore: 95 + Math.random() * 5 })));
        setFailedCount(0);
        setIsSimulating(true);

        setTimeout(() => {
            setNodes(curr => curr.map(n => n.id === "1" ? { ...n, status: "failed", healthScore: 10 } : n));
            setFailedCount(1);
        }, 1000);
    };

    useEffect(() => {
        if (!isSimulating || failedCount === 0 || failedCount >= nodes.length) return;

        const timer = setTimeout(() => {
            setNodes(curr => {
                const failedIds = curr.filter(n => n.status === "failed").map(n => n.id);
                const neighborIds = initialEdges
                    .filter(e => failedIds.includes(e.source) || failedIds.includes(e.target))
                    .map(e => failedIds.includes(e.source) ? e.target : e.source);

                const newNodes = curr.map(n => {
                    if (n.status === "failed") return n;
                    if (neighborIds.includes(n.id) && Math.random() > 0.4) {
                        return { ...n, status: "failed" as const, healthScore: Math.max(0, n.healthScore - 80) };
                    }
                    if (neighborIds.includes(n.id)) {
                        return { ...n, status: "warning" as const, healthScore: Math.max(20, n.healthScore - 40) };
                    }
                    return n;
                });

                const newFailedCount = newNodes.filter(n => n.status === "failed").length;
                if (newFailedCount !== failedCount) setFailedCount(newFailedCount);
                if (newFailedCount === curr.length) setIsSimulating(false);
                return newNodes;
            });
        }, 2000);

        return () => clearTimeout(timer);
    }, [isSimulating, failedCount, nodes.length]);

    return (
        <div className="flex flex-col gap-6 w-full max-w-4xl mx-auto">
            <Card className="p-6 glass-dark border-cyan-500/30">
                <div className="flex justify-between items-center mb-6">
                    <div className="flex flex-col">
                        <h3 className="text-xl font-bold flex items-center gap-2">
                            <Activity className="w-5 h-5 text-cyan-500" />
                            Propagation Live Feed
                        </h3>
                        <p className="text-sm text-muted-foreground">Monitoring system dependencies via GNN</p>
                    </div>
                    <button
                        onClick={startSimulation}
                        disabled={isSimulating && failedCount < nodes.length && failedCount > 0}
                        className="px-4 py-2 bg-cyan-500 text-black font-bold rounded-lg hover:bg-cyan-400 disabled:opacity-50 transition-all flex items-center gap-2"
                    >
                        <Zap className="w-4 h-4" />
                        {isSimulating && failedCount > 0 && failedCount < nodes.length ? "Analyzing..." : "Trigger Failure"}
                    </button>
                </div>

                <div className="relative w-full aspect-[8/5] bg-black/40 rounded-xl overflow-hidden border border-white/5">
                    <svg viewBox={`0 0 ${GRAPH_WIDTH} ${GRAPH_HEIGHT}`} className="w-full h-full">
                        {initialEdges.map((edge, i) => {
                            const start = nodePositions[edge.source];
                            const end = nodePositions[edge.target];
                            const sourceFailed = nodes.find(n => n.id === edge.source)?.status === "failed";
                            const targetFailed = nodes.find(n => n.id === edge.target)?.status === "failed";
                            const isAffected = sourceFailed || targetFailed;

                            return (
                                <motion.line
                                    key={`${edge.source}-${edge.target}`}
                                    x1={start.x} y1={start.y}
                                    x2={end.x} y2={end.y}
                                    stroke={isAffected ? "#ef4444" : "#ffffff20"}
                                    strokeWidth={isAffected ? 2 : 1}
                                    initial={{ pathLength: 0 }}
                                    animate={{ pathLength: 1 }}
                                    transition={{ duration: 1, delay: i * 0.05 }}
                                />
                            );
                        })}

                        {nodes.map((node) => {
                            const pos = nodePositions[node.id];
                            const isFailed = node.status === "failed";
                            const isWarning = node.status === "warning";

                            return (
                                <g key={node.id}>
                                    <AnimatePresence>
                                        {isFailed && (
                                            <motion.circle
                                                cx={pos.x} cy={pos.y}
                                                r={NODE_RADIUS + 10}
                                                fill="none"
                                                stroke="#ef4444"
                                                strokeWidth="2"
                                                initial={{ opacity: 0, scale: 0.8 }}
                                                animate={{ opacity: [0, 1, 0], scale: [1, 1.5, 2] }}
                                                transition={{ repeat: Infinity, duration: 1.5 }}
                                            />
                                        )}
                                    </AnimatePresence>

                                    <motion.circle
                                        cx={pos.x} cy={pos.y}
                                        r={NODE_RADIUS}
                                        fill={isFailed ? "#ef4444" : isWarning ? "#f59e0b" : "#111827"}
                                        stroke={isFailed ? "#991b1b" : isWarning ? "#92400e" : "#06b6d4"}
                                        strokeWidth="2"
                                        whileHover={{ scale: 1.1 }}
                                    />

                                    <text
                                        x={pos.x} y={pos.y + 4}
                                        textAnchor="middle"
                                        fill="white"
                                        fontSize="10"
                                        className="font-bold pointer-events-none select-none"
                                    >
                                        {node.name.split(' ')[0]}
                                    </text>

                                    {isFailed && (
                                        <motion.g
                                            initial={{ opacity: 0, y: -10 }}
                                            animate={{ opacity: 1, y: 0 }}
                                        >
                                            <circle cx={pos.x + 20} cy={pos.y - 20} r="8" fill="#ef4444" />
                                            <path
                                                d="M 400 100 L 400 100" // Placeholder
                                                style={{ display: 'none' }}
                                            />
                                            <text
                                                x={pos.x + 20} y={pos.y - 17}
                                                textAnchor="middle"
                                                fill="white"
                                                fontSize="8"
                                                className="font-bold pointer-events-none"
                                            >
                                                !
                                            </text>
                                        </motion.g>
                                    )}
                                </g>
                            );
                        })}
                    </svg>
                </div>

                <div className="grid grid-cols-3 gap-4 mt-6">
                    <div className="p-4 glass rounded-lg border-white/5">
                        <p className="text-xs text-muted-foreground uppercase">Cascade Risk Score</p>
                        <div className="flex items-baseline gap-2">
                            <motion.p
                                className="text-2xl font-bold text-red-500"
                                key={failedCount}
                                initial={{ scale: 0.8 }}
                                animate={{ scale: 1 }}
                            >
                                {(failedCount / nodes.length * 100).toFixed(1)}%
                            </motion.p>
                        </div>
                    </div>
                    <div className="p-4 glass rounded-lg border-white/5">
                        <p className="text-xs text-muted-foreground uppercase">Detection Confidence</p>
                        <p className="text-2xl font-bold text-cyan-500">94.8%</p>
                    </div>
                    <div className="p-4 glass rounded-lg border-white/5">
                        <p className="text-xs text-muted-foreground uppercase">Propagation Vector</p>
                        <p className="text-2xl font-bold text-purple-500">{failedCount > 0 ? "Cascading" : "Stable"}</p>
                    </div>
                </div>
            </Card>
        </div>
    );
}
