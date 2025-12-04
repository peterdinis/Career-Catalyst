export interface AnalysisResult {
    score: number;
    breakdown: {
        keywords: number;
        formatting: number;
        impact: number;
        brevity: number;
    };
    keywords: {
        missing: string[];
        overused: string[];
        suggested: string[];
    };
    formatting: {
        issues: string[];
        suggestions: string[];
    };
    impactRewrites: {
        original: string;
        alternatives: string[];
    }[];
    fixes: string[];
}
