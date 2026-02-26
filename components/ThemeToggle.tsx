"use client";

import * as React from "react";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";

export function ThemeToggle() {
    const { theme, setTheme } = useTheme();
    const [mounted, setMounted] = React.useState(false);

    React.useEffect(() => {
        setMounted(true);
    }, []);

    if (!mounted) {
        return (
            <div className="w-8 h-8 rounded-full border border-border" />
        );
    }

    return (
        <button
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
            className="w-7 h-7 rounded-full border border-border flex items-center justify-center transition-all hover:border-foreground relative"
            aria-label="Toggle theme"
        >
            <Sun className="h-3.5 w-3.5 transition-all opacity-100 dark:opacity-0 text-foreground" strokeWidth={1.5} />
            <Moon className="absolute h-3.5 w-3.5 transition-all opacity-0 dark:opacity-100 text-foreground" strokeWidth={1.5} />
        </button>
    );
}
