"use client";

import { useState } from "react";
import { CoverLetterForm } from "@/components/cover-letter/CoverLetterForm";
import { GeneratedLetter } from "@/components/cover-letter/GeneratedLetter";
import { motion } from "framer-motion";
import { useCoverLetter } from "@/hooks/useCoverLetter";

export default function CoverLetterPage() {
    const [letter, setLetter] = useState("");
    const { generate, isGenerating } = useCoverLetter();

    const handleGenerate = async (formData: unknown) => {
        try {
            const data = await generate(formData);
            setLetter(data.letter);
        } catch (error) {
            console.error("Failed to generate", error);
        }
    };

    const handleSave = async () => {
        if (!letter) return;

        try {
            const { saveCoverLetter } = await import("@/app/actions/cover-letter");
            const response = await saveCoverLetter(
                `Cover Letter - ${new Date().toLocaleDateString()}`,
                letter,
                "Job Description", // Placeholder, ideally from state
                "Company Name" // Placeholder, ideally from state
            );

            if (response.error) {
                alert("Failed to save");
            } else {
                alert("Saved to Dashboard!");
            }
        } catch (error) {
            console.error("Failed to save", error);
        }
    };

    return (
        <div className="container mx-auto px-4 py-12 max-w-4xl">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="mb-12 text-center"
            >
                <h1 className="text-4xl font-bold mb-4">Cover Letter Generator</h1>
                <p className="text-muted-foreground max-w-2xl mx-auto">
                    Create a compelling, personalized cover letter in seconds.
                    Tailored to the job, the company, and your unique story.
                </p>
            </motion.div>

            {!letter ? (
                <div className="glass-card p-8 rounded-2xl">
                    <CoverLetterForm onSubmit={handleGenerate} isGenerating={isGenerating} />
                </div>
            ) : (
                <div className="space-y-6">
                    <div className="flex justify-end">
                        <button
                            onClick={handleSave}
                            className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg font-medium transition-colors flex items-center gap-2"
                        >
                            Save to Dashboard
                        </button>
                    </div>
                    <GeneratedLetter letter={letter} onReset={() => setLetter("")} />
                </div>
            )}
        </div>
    );
}
