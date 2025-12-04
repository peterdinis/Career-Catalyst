"use client";

import { useState } from "react";
import { SetupForm } from "@/components/interview/SetupForm";
import { InterviewSession } from "@/components/interview/InterviewSession";
import { motion } from "framer-motion";

export default function InterviewCoachPage() {
    const [config, setConfig] = useState<any | null>(null);

    return (
        <div className="container mx-auto px-4 py-12 max-w-5xl">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="mb-12 text-center"
            >
                <h1 className="text-4xl font-bold mb-4">AI Interview Coach</h1>
                <p className="text-muted-foreground max-w-2xl mx-auto">
                    Practice with a realistic AI interviewer customized to your target role.
                    Get instant feedback on your answers and improve your confidence.
                </p>
            </motion.div>

            {!config ? (
                <div className="glass-card p-8 rounded-2xl">
                    <SetupForm onStart={setConfig} />
                </div>
            ) : (
                <InterviewSession config={config} />
            )}
        </div>
    );
}
