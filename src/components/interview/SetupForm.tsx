'use client';

import { ChangeEvent, FormEvent, useState } from 'react';
import { motion } from 'framer-motion';
import { Play } from 'lucide-react';

interface SetupFormProps {
    onStart: (config: unknown) => void;
}

export function SetupForm({ onStart }: SetupFormProps) {
    const [config, setConfig] = useState({
        role: 'Software Engineer',
        companyType: 'Tech Giant',
        seniority: 'Mid-Level',
        round: 'Technical',
        difficulty: 'Medium',
    });

    const handleChange = (
        e: ChangeEvent<HTMLSelectElement | HTMLInputElement>
    ) => {
        setConfig({ ...config, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();
        onStart(config);
    };

    return (
        <motion.form
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            onSubmit={handleSubmit}
            className="space-y-6 max-w-xl mx-auto"
        >
            <div className="space-y-2">
                <label className="text-sm font-medium">Target Role</label>
                <input
                    name="role"
                    value={config.role}
                    onChange={handleChange}
                    required
                    className="w-full bg-white/5 border border-white/10 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-primary/50"
                />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                    <label className="text-sm font-medium">Company Type</label>
                    <select
                        name="companyType"
                        value={config.companyType}
                        onChange={handleChange}
                        className="w-full bg-white/5 border border-white/10 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-primary/50"
                    >
                        <option>Startup</option>
                        <option>Corporate</option>
                        <option>Tech Giant</option>
                    </select>
                </div>
                <div className="space-y-2">
                    <label className="text-sm font-medium">Seniority</label>
                    <select
                        name="seniority"
                        value={config.seniority}
                        onChange={handleChange}
                        className="w-full bg-white/5 border border-white/10 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-primary/50"
                    >
                        <option>Entry-Level</option>
                        <option>Mid-Level</option>
                        <option>Senior</option>
                        <option>Executive</option>
                    </select>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                    <label className="text-sm font-medium">
                        Interview Round
                    </label>
                    <select
                        name="round"
                        value={config.round}
                        onChange={handleChange}
                        className="w-full bg-white/5 border border-white/10 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-primary/50"
                    >
                        <option>Phone Screen</option>
                        <option>Technical</option>
                        <option>Behavioral</option>
                        <option>Executive</option>
                    </select>
                </div>
                <div className="space-y-2">
                    <label className="text-sm font-medium">Difficulty</label>
                    <select
                        name="difficulty"
                        value={config.difficulty}
                        onChange={handleChange}
                        className="w-full bg-white/5 border border-white/10 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-primary/50"
                    >
                        <option>Easy</option>
                        <option>Medium</option>
                        <option>Hard</option>
                    </select>
                </div>
            </div>

            <button
                type="submit"
                className="w-full bg-primary hover:bg-primary/90 text-white px-8 py-4 rounded-xl font-semibold transition-all shadow-lg shadow-primary/25 flex items-center justify-center gap-2 text-lg"
            >
                <Play className="h-5 w-5" /> Start Interview Session
            </button>
        </motion.form>
    );
}
