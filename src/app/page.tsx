'use client';

import Link from 'next/link';
import { ArrowRight, FileText, MessageSquare, Sparkles } from 'lucide-react';
import { motion } from 'framer-motion';
import { UrlObject } from 'url';

const features = [
    {
        title: 'Resume Optimizer',
        description:
            'Beat the ATS with AI-driven analysis and keyword optimization.',
        icon: FileText,
        href: '/resume-optimizer',
        color: 'from-blue-500 to-cyan-400',
    },
    {
        title: 'Cover Letter Generator',
        description: 'Craft compelling, personalized cover letters in seconds.',
        icon: Sparkles,
        href: '/cover-letter',
        color: 'from-purple-500 to-pink-500',
    },
    {
        title: 'Interview Coach',
        description:
            'Practice with realistic AI simulations and get instant feedback.',
        icon: MessageSquare,
        href: '/interview-coach',
        color: 'from-orange-500 to-red-500',
    },
];

const container = {
    hidden: { opacity: 0 },
    show: {
        opacity: 1,
        transition: {
            staggerChildren: 0.1,
        },
    },
};

const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 },
};

export default function Home() {
    return (
        <div className="flex flex-col items-center justify-center min-h-[calc(100vh-4rem)] p-4 md:p-24 relative overflow-hidden">
            {/* Background Gradients */}
            <div className="absolute top-0 left-1/4 w-96 h-96 bg-purple-500/20 rounded-full blur-3xl -z-10" />
            <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-blue-500/20 rounded-full blur-3xl -z-10" />

            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="text-center max-w-3xl mx-auto mb-16"
            >
                <h1 className="text-4xl md:text-6xl font-bold tracking-tight mb-6">
                    Accelerate Your Career with <br />
                    <span className="text-gradient">AI-Powered Precision</span>
                </h1>
                <p className="text-lg md:text-xl text-muted-foreground mb-8">
                    Optimize your resume, craft perfect cover letters, and
                    master your interviews. All in one platform designed to get
                    you hired.
                </p>
                <div className="flex gap-4 justify-center">
                    <Link
                        href="/resume-optimizer"
                        className="bg-primary hover:bg-primary/90 text-white px-8 py-3 rounded-full font-semibold transition-all shadow-lg shadow-primary/25 flex items-center gap-2"
                    >
                        Start Optimizing <ArrowRight className="h-4 w-4" />
                    </Link>
                </div>
            </motion.div>

            <motion.div
                variants={container}
                initial="hidden"
                animate="show"
                className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full max-w-5xl"
            >
                {features.map((feature) => (
                    <motion.div key={feature.title} variants={item}>
                        <Link
                            href={feature.href as unknown as UrlObject}
                            className="group block p-8 rounded-2xl glass-card hover:bg-white/5 transition-all hover:scale-[1.02] border border-white/10 relative overflow-hidden"
                        >
                            <div
                                className={`absolute top-0 right-0 w-32 h-32 bg-linear-to-br ${feature.color} opacity-10 blur-2xl rounded-full -mr-16 -mt-16 transition-opacity group-hover:opacity-20`}
                            />

                            <div
                                className={`p-3 rounded-xl bg-linear-to-br ${feature.color} w-fit mb-4`}
                            >
                                <feature.icon className="h-6 w-6 text-white" />
                            </div>

                            <h3 className="text-xl font-bold mb-2">
                                {feature.title}
                            </h3>
                            <p className="text-muted-foreground">
                                {feature.description}
                            </p>

                            <div className="mt-4 flex items-center text-sm font-medium text-primary opacity-0 -translate-x-2 transition-all group-hover:opacity-100 group-hover:translate-x-0">
                                Try now <ArrowRight className="ml-1 h-3 w-3" />
                            </div>
                        </Link>
                    </motion.div>
                ))}
            </motion.div>
        </div>
    );
}
