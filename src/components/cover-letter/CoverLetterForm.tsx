"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { ArrowRight, Loader2, Sparkles } from "lucide-react";

interface CoverLetterFormProps {
    onSubmit: (data: unknown) => void;
    isGenerating: boolean;
}

export function CoverLetterForm({ onSubmit, isGenerating }: CoverLetterFormProps) {
    const [formData, setFormData] = useState({
        jobDescription: "",
        companyName: "",
        hiringManager: "",
        userExperience: "",
        tone: "Professional",
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onSubmit(formData);
    };

    return (
        <motion.form
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            onSubmit={handleSubmit}
            className="space-y-6"
        >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                    <label className="text-sm font-medium">Company Name</label>
                    <input
                        name="companyName"
                        value={formData.companyName}
                        onChange={handleChange}
                        required
                        placeholder="e.g. Google"
                        className="w-full bg-white/5 border border-white/10 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-primary/50"
                    />
                </div>
                <div className="space-y-2">
                    <label className="text-sm font-medium">Hiring Manager (Optional)</label>
                    <input
                        name="hiringManager"
                        value={formData.hiringManager}
                        onChange={handleChange}
                        placeholder="e.g. Jane Doe"
                        className="w-full bg-white/5 border border-white/10 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-primary/50"
                    />
                </div>
            </div>

            <div className="space-y-2">
                <label className="text-sm font-medium">Job Description</label>
                <textarea
                    name="jobDescription"
                    value={formData.jobDescription}
                    onChange={handleChange}
                    required
                    placeholder="Paste the job description here..."
                    className="w-full bg-white/5 border border-white/10 rounded-lg p-3 h-32 resize-none focus:outline-none focus:ring-2 focus:ring-primary/50"
                />
            </div>

            <div className="space-y-2">
                <label className="text-sm font-medium">Your Key Achievements / Experience</label>
                <textarea
                    name="userExperience"
                    value={formData.userExperience}
                    onChange={handleChange}
                    required
                    placeholder="Briefly list your top 3 relevant achievements or skills..."
                    className="w-full bg-white/5 border border-white/10 rounded-lg p-3 h-32 resize-none focus:outline-none focus:ring-2 focus:ring-primary/50"
                />
            </div>

            <div className="space-y-2">
                <label className="text-sm font-medium">Tone</label>
                <select
                    name="tone"
                    value={formData.tone}
                    onChange={handleChange}
                    className="w-full bg-white/5 border border-white/10 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-primary/50"
                >
                    <option value="Professional">Professional</option>
                    <option value="Innovative">Innovative</option>
                    <option value="Creative">Creative</option>
                    <option value="Conservative">Conservative</option>
                </select>
            </div>

            <button
                type="submit"
                disabled={isGenerating}
                className="w-full bg-primary hover:bg-primary/90 disabled:opacity-50 disabled:cursor-not-allowed text-white px-8 py-4 rounded-xl font-semibold transition-all shadow-lg shadow-primary/25 flex items-center justify-center gap-2 text-lg"
            >
                {isGenerating ? (
                    <>
                        <Loader2 className="h-5 w-5 animate-spin" /> Generating Magic...
                    </>
                ) : (
                    <>
                        <Sparkles className="h-5 w-5" /> Generate Cover Letter
                    </>
                )}
            </button>
        </motion.form>
    );
}
