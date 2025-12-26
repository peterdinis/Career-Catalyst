import useSWRMutation from 'swr/mutation';
import { AnalysisResult } from '@/types/resume';

async function analyzeResume(
    url: string,
    { arg }: { arg: { resumeText: string; jobDescription: string } }
) {
    const response = await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(arg),
    });

    if (!response.ok) {
        throw new Error('Analysis failed');
    }

    return response.json() as Promise<AnalysisResult>;
}

export function useResumeAnalysis() {
    const { trigger, data, isMutating, error } = useSWRMutation(
        '/api/analyze-resume',
        analyzeResume
    );

    return {
        analyze: trigger,
        result: data,
        isAnalyzing: isMutating,
        error,
    };
}
