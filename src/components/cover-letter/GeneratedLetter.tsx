"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Check, Copy, Download, RefreshCw } from "lucide-react";

interface GeneratedLetterProps {
    letter: string;
    onReset: () => void;
}

export function GeneratedLetter({ letter, onReset }: GeneratedLetterProps) {
    const [copied, setCopied] = useState(false);

    const handleCopy = () => {
        navigator.clipboard.writeText(letter);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="space-y-6"
        >
            <div className="flex items-center justify-between">
                <h2 className="text-2xl font-bold">Your Customized Letter</h2>
                <div className="flex gap-2">
                    <button
                        onClick={onReset}
                        className="p-2 hover:bg-white/10 rounded-lg transition-colors text-muted-foreground hover:text-white"
                        title="Create New"
                    >
                        <RefreshCw className="h-5 w-5" />
                    </button>
                    <button
                        onClick={handleCopy}
                        className="flex items-center gap-2 px-4 py-2 bg-white/5 hover:bg-white/10 border border-white/10 rounded-lg transition-colors"
                    >
                        {copied ? (
                            <>
                                <Check className="h-4 w-4 text-green-500" /> Copied
                            </>
                        ) : (
                            <>
                                <Copy className="h-4 w-4" /> Copy
                            </>
                        )}
                    </button>
                </div>
            </div>

            <div className="bg-white text-black p-8 rounded-xl shadow-2xl font-serif whitespace-pre-wrap leading-relaxed min-h-[600px]">
                {letter}
            </div>
        </motion.div>
    );
}
