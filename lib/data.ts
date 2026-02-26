export interface NetworkNode {
    id: string;
    name: string;
    type: "server" | "database" | "iot" | "cloud" | "gateway";
    status: "healthy" | "warning" | "failed";
    healthScore: number;
}

export interface NetworkEdge {
    source: string;
    target: string;
}

export const initialNodes: NetworkNode[] = [
    { id: "1", name: "Core Switch", type: "gateway", status: "healthy", healthScore: 98 },
    { id: "2", name: "User API", type: "server", status: "healthy", healthScore: 95 },
    { id: "3", name: "Auth Service", type: "server", status: "healthy", healthScore: 97 },
    { id: "4", name: "Main DB", type: "database", status: "healthy", healthScore: 99 },
    { id: "5", name: "CDN Edge 1", type: "cloud", status: "healthy", healthScore: 96 },
    { id: "6", name: "IoT Gateway", type: "iot", status: "healthy", healthScore: 94 },
    { id: "7", name: "Sensor Pack A", type: "iot", status: "healthy", healthScore: 92 },
    { id: "8", name: "Sensor Pack B", type: "iot", status: "healthy", healthScore: 91 },
    { id: "9", name: "Analytics Engine", type: "server", status: "healthy", healthScore: 96 },
    { id: "10", name: "Backup DB", type: "database", status: "healthy", healthScore: 100 },
];

export const initialEdges: NetworkEdge[] = [
    { source: "1", target: "2" },
    { source: "1", target: "3" },
    { source: "1", target: "6" },
    { source: "2", target: "4" },
    { source: "3", target: "4" },
    { source: "6", target: "7" },
    { source: "6", target: "8" },
    { source: "4", target: "9" },
    { source: "4", target: "10" },
    { source: "9", target: "5" },
];

export const riskTrends = [
    { time: "00:00", score: 12 },
    { time: "04:00", score: 15 },
    { time: "08:00", score: 28 },
    { time: "12:00", score: 45 },
    { time: "16:00", score: 32 },
    { time: "20:00", score: 18 },
    { time: "23:59", score: 14 },
];

export const vulnerabilityRanking = [
    { name: "Core Switch", risk: 85 },
    { name: "Main DB", risk: 72 },
    { name: "IoT Gateway", risk: 65 },
    { name: "Auth Service", risk: 45 },
    { name: "User API", risk: 38 },
];
