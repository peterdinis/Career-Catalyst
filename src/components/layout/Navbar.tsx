"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { Briefcase, FileText, MessageSquare, Sparkles, Moon, Sun } from "lucide-react";
import { motion } from "framer-motion";
import { useTheme } from "./ThemeProvider";

const navItems = [
    { name: "Resume Optimizer", href: "/resume-optimizer", icon: FileText },
    { name: "Cover Letter", href: "/cover-letter", icon: Sparkles },
    { name: "Interview Coach", href: "/interview-coach", icon: MessageSquare },
];

export function Navbar() {
    const pathname = usePathname();
    const { theme, toggleTheme } = useTheme();

    return (
        <nav className="sticky top-0 z-50 w-full border-b dark:border-white/10 border-black/10 bg-background/80 backdrop-blur-md">
            <div className="container mx-auto flex h-16 items-center justify-between px-4">
                <Link href="/" className="flex items-center gap-2 font-bold text-xl tracking-tight">
                    <div className="p-1.5 bg-primary rounded-lg">
                        <Briefcase className="h-5 w-5 text-white" />
                    </div>
                    <span className="bg-clip-text text-transparent bg-linear-to-r from-foreground to-foreground/60">
                        CareerCatalyst
                    </span>
                </Link>

                <div className="hidden md:flex items-center gap-6">
                    {navItems.map((item) => {
                        const isActive = pathname === item.href;
                        return (
                            <Link
                                key={item.href}
                                href={item.href}
                                className={cn(
                                    "flex items-center gap-2 text-sm font-medium transition-colors hover:text-primary",
                                    isActive ? "text-primary" : "text-muted-foreground"
                                )}
                            >
                                <item.icon className="h-4 w-4" />
                                {item.name}
                                {isActive && (
                                    <motion.div
                                        layoutId="navbar-indicator"
                                        className="absolute bottom-0 h-0.5 w-full bg-primary"
                                        transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                                    />
                                )}
                            </Link>
                        );
                    })}
                </div>

                <div className="flex items-center gap-4">
                    <button
                        onClick={toggleTheme}
                        className="p-2 rounded-lg dark:hover:bg-white/10 hover:bg-black/5 transition-colors"
                        aria-label="Toggle theme"
                    >
                        {theme === "dark" ? (
                            <Sun className="h-5 w-5 text-yellow-500" />
                        ) : (
                            <Moon className="h-5 w-5 text-primary" />
                        )}
                    </button>
                    <button className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
                        Sign In
                    </button>
                    <button className="bg-primary hover:bg-primary/90 text-white px-4 py-2 rounded-full text-sm font-medium transition-all shadow-lg shadow-primary/25">
                        Get Started
                    </button>
                </div>
            </div>
        </nav>
    );
}
