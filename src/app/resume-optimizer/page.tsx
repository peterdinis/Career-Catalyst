'use client';

import { useState } from 'react';
import { ResumeUploader } from '@/components/resume/ResumeUploader';
import { AnalysisDashboard } from '@/components/resume/AnalysisDashboard';
import { motion } from 'framer-motion';
import { ArrowRight, Loader2 } from 'lucide-react';
import { useResumeAnalysis } from '@/hooks/useResumeAnalysis';

export default function ResumeOptimizerPage() {
    const [file, setFile] = useState<File | null>(null);
    const [jobDescription, setJobDescription] = useState('');
    const [result, setResult] = useState<any | null>(null);
    const { analyze, isAnalyzing } = useResumeAnalysis();

    const handleAnalyze = async () => {
        if (!file || !jobDescription) return;

        try {
            const data = await analyze({
                resumeText: file.name,
                jobDescription,
            });
            setResult(data);
        } catch (error) {
            console.error('Analysis failed', error);
        }
    };

    const handleSave = async () => {
        if (!result) return;

        try {
            const { saveResume } = await import('@/app/actions/resume');
            const response = await saveResume(
                `Resume Analysis - ${new Date().toLocaleDateString()}`,
                result
            );

            if (response.error) {
                alert('Failed to save');
            } else {
                alert('Saved to Dashboard!');
            }
        } catch (error) {
            console.error('Failed to save', error);
        }
    };

    return (
        <div className="container mx-auto px-4 py-12 max-w-5xl">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="mb-12 text-center"
            >
                <h1 className="text-4xl font-bold mb-4">Resume Optimizer</h1>
                <p className="text-muted-foreground max-w-2xl mx-auto">
                    Upload your resume and the job description to get a detailed
                    ATS analysis and actionable improvements.
                </p>
            </motion.div>

            {!result ? (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="grid grid-cols-1 md:grid-cols-2 gap-8"
                >
                    <div className="space-y-6">
                        <div className="glass-card p-6 rounded-xl">
                            <h2 className="text-lg font-semibold mb-4">
                                1. Upload Resume
                            </h2>
                            <ResumeUploader
                                file={file}
                                setFile={setFile}
                                onUpload={() => {}}
                            />
                        </div>
                    </div>

                    <div className="space-y-6">
                        <div className="glass-card p-6 rounded-xl h-full flex flex-col">
                            <h2 className="text-lg font-semibold mb-4">
                                2. Job Description
                            </h2>
                            <textarea
                                value={jobDescription}
                                onChange={(e) =>
                                    setJobDescription(e.target.value)
                                }
                                placeholder="Paste the job description here..."
                                className="flex-1 w-full bg-white/5 border border-white/10 rounded-lg p-4 resize-none focus:outline-none focus:ring-2 focus:ring-primary/50 min-h-[200px]"
                            />
                        </div>
                    </div>

                    <div className="md:col-span-2 flex justify-center mt-4">
                        <button
                            onClick={handleAnalyze}
                            disabled={!file || !jobDescription || isAnalyzing}
                            className="bg-primary hover:bg-primary/90 disabled:opacity-50 disabled:cursor-not-allowed text-white px-8 py-4 rounded-full font-semibold transition-all shadow-lg shadow-primary/25 flex items-center gap-2 text-lg"
                        >
                            {isAnalyzing ? (
                                <>
                                    <Loader2 className="h-5 w-5 animate-spin" />{' '}
                                    Analyzing...
                                </>
                            ) : (
                                <>
                                    Analyze Resume{' '}
                                    <ArrowRight className="h-5 w-5" />
                                </>
                            )}
                        </button>
                    </div>
                </motion.div>
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
                    <AnalysisDashboard result={result} />
                </div>
            )}
        </div>
    );
}
