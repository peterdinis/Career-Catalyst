'use client';

import { AnalysisResult } from '@/types/resume';
import { motion } from 'framer-motion';
import {
    AlertTriangle,
    CheckCircle,
    XCircle,
    Zap,
    Sparkles,
} from 'lucide-react';

interface AnalysisDashboardProps {
    result: AnalysisResult;
}

export function AnalysisDashboard({ result }: AnalysisDashboardProps) {
    const getScoreColor = (score: number) => {
        if (score >= 80) return 'text-green-500';
        if (score >= 60) return 'text-yellow-500';
        return 'text-red-500';
    };

    return (
        <div className="space-y-8 w-full max-w-4xl mx-auto">
            {/* Score Section */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="glass-card p-8 rounded-2xl flex flex-col md:flex-row items-center justify-between gap-8"
            >
                <div className="flex-1">
                    <h2 className="text-2xl font-bold mb-2">
                        ATS Compatibility Score
                    </h2>
                    <p className="text-muted-foreground">
                        Your resume is performing at a{' '}
                        <span className="font-semibold text-primary">
                            moderate level
                        </span>
                        . Focus on keyword integration to boost your ranking.
                    </p>
                </div>
                <div className="relative w-32 h-32 flex items-center justify-center">
                    <svg className="w-full h-full transform -rotate-90">
                        <circle
                            cx="64"
                            cy="64"
                            r="60"
                            stroke="currentColor"
                            strokeWidth="8"
                            fill="transparent"
                            className="text-white/10"
                        />
                        <circle
                            cx="64"
                            cy="64"
                            r="60"
                            stroke="currentColor"
                            strokeWidth="8"
                            fill="transparent"
                            strokeDasharray={377}
                            strokeDashoffset={377 - (377 * result.score) / 100}
                            className={`${getScoreColor(result.score)} transition-all duration-1000 ease-out`}
                        />
                    </svg>
                    <span
                        className={`absolute text-3xl font-bold ${getScoreColor(result.score)}`}
                    >
                        {result.score}
                    </span>
                </div>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Keywords */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 }}
                    className="glass-card p-6 rounded-xl"
                >
                    <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                        <Zap className="h-5 w-5 text-yellow-500" /> Keyword
                        Analysis
                    </h3>
                    <div className="space-y-4">
                        <div>
                            <p className="text-sm font-medium text-red-400 mb-2">
                                Missing Critical Keywords
                            </p>
                            <div className="flex flex-wrap gap-2">
                                {result.keywords.missing.map((kw) => (
                                    <span
                                        key={kw}
                                        className="px-2 py-1 bg-red-500/10 border border-red-500/20 rounded text-xs text-red-400"
                                    >
                                        {kw}
                                    </span>
                                ))}
                            </div>
                        </div>
                        <div>
                            <p className="text-sm font-medium text-yellow-400 mb-2">
                                Overused Buzzwords
                            </p>
                            <div className="flex flex-wrap gap-2">
                                {result.keywords.overused.map((kw) => (
                                    <span
                                        key={kw}
                                        className="px-2 py-1 bg-yellow-500/10 border border-yellow-500/20 rounded text-xs text-yellow-400"
                                    >
                                        {kw}
                                    </span>
                                ))}
                            </div>
                        </div>
                    </div>
                </motion.div>

                {/* Formatting */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                    className="glass-card p-6 rounded-xl"
                >
                    <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                        <AlertTriangle className="h-5 w-5 text-orange-500" />{' '}
                        Formatting Check
                    </h3>
                    <ul className="space-y-3">
                        {result.formatting.issues.map((issue, idx) => (
                            <li
                                key={idx}
                                className="flex items-start gap-2 text-sm text-muted-foreground"
                            >
                                <XCircle className="h-4 w-4 text-red-500 mt-0.5 shrink-0" />
                                {issue}
                            </li>
                        ))}
                        {result.formatting.suggestions.map((sugg, idx) => (
                            <li
                                key={`sugg-${idx}`}
                                className="flex items-start gap-2 text-sm text-muted-foreground"
                            >
                                <CheckCircle className="h-4 w-4 text-green-500 mt-0.5 shrink-0" />
                                {sugg}
                            </li>
                        ))}
                    </ul>
                </motion.div>
            </div>

            {/* Impact Rewrites */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="glass-card p-6 rounded-xl"
            >
                <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                    <Sparkles className="h-5 w-5 text-purple-500" /> Impact
                    Statement Rewrites
                </h3>
                <div className="space-y-6">
                    {result.impactRewrites.map((item, idx) => (
                        <div
                            key={idx}
                            className="bg-white/5 p-4 rounded-lg border border-white/5"
                        >
                            <p className="text-sm text-muted-foreground mb-2">
                                Original:
                            </p>
                            <p className="text-red-300/80 italic mb-4">
                                "{item.original}"
                            </p>
                            <p className="text-sm text-muted-foreground mb-2">
                                Better Alternatives:
                            </p>
                            <ul className="space-y-2">
                                {item.alternatives.map((alt, altIdx) => (
                                    <li
                                        key={altIdx}
                                        className="flex items-start gap-2 text-sm"
                                    >
                                        <CheckCircle className="h-4 w-4 text-green-500 mt-0.5 shrink-0" />
                                        <span>{alt}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </div>
            </motion.div>

            {/* Immediate Fixes */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="glass-card p-6 rounded-xl border-primary/20 bg-primary/5"
            >
                <h3 className="text-lg font-semibold mb-4 text-primary">
                    Top 3 Immediate Fixes
                </h3>
                <ul className="space-y-3">
                    {result.fixes.map((fix, idx) => (
                        <li
                            key={idx}
                            className="flex items-center gap-3 font-medium"
                        >
                            <span className="flex h-6 w-6 items-center justify-center rounded-full bg-primary text-xs text-white">
                                {idx + 1}
                            </span>
                            {fix}
                        </li>
                    ))}
                </ul>
            </motion.div>
        </div>
    );
}
