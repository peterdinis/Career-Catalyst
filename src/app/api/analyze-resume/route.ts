import { NextResponse } from "next/server";
import { generateWithGemini, isGeminiConfigured } from "@/lib/gemini";

export async function POST(req: Request) {
    try {
        const { resumeText, jobDescription } = await req.json();

        if (!isGeminiConfigured()) {
            // Return mock response if API key not configured
            await new Promise((resolve) => setTimeout(resolve, 2000));

            const mockResponse = {
                score: 72,
                breakdown: {
                    keywords: 65,
                    formatting: 80,
                    impact: 70,
                    brevity: 75,
                },
                keywords: {
                    missing: ["Agile Methodology", "Cloud Computing", "Stakeholder Management", "CI/CD"],
                    overused: ["Team player", "Hardworking", "Motivated"],
                    suggested: [
                        "Led cross-functional teams in Agile environments",
                        "Implemented CI/CD pipelines using Jenkins",
                    ],
                },
                formatting: {
                    issues: [
                        "Date format inconsistency (use MM/YYYY)",
                        "Multiple columns detected (may confuse older ATS)",
                    ],
                    suggestions: [
                        "Standardize date formats",
                        "Switch to single-column layout for work experience",
                    ],
                },
                impactRewrites: [
                    {
                        original: "Responsible for managing the team.",
                        alternatives: [
                            "Led a team of 5 engineers to deliver project X ahead of schedule.",
                            "Orchestrated daily stand-ups and sprint planning, increasing velocity by 20%.",
                            "Mentored junior developers, resulting in 0% attrition over 12 months.",
                        ],
                    },
                    {
                        original: "Worked on the frontend code.",
                        alternatives: [
                            "Architected the frontend using React and Redux, improving load time by 40%.",
                            "Developed reusable UI components, reducing development time for future features.",
                            "Optimized rendering performance, boosting Lighthouse score from 60 to 95.",
                        ],
                    },
                ],
                fixes: [
                    "Add 'Agile Methodology' and 'CI/CD' to your Skills section.",
                    "Quantify your leadership experience with specific team sizes and outcomes.",
                    "Change the resume layout to a single column for better parsing.",
                ],
            };

            return NextResponse.json(mockResponse);
        }

        // Use Gemini AI for real analysis
        const prompt = `You are CareerCatalyst AI - an expert ATS (Applicant Tracking System) analyst with 15 years experience in HR tech.

RESUME:
${resumeText}

JOB DESCRIPTION:
${jobDescription}

Analyze this resume against the job description and provide a detailed ATS optimization report in JSON format with the following structure:

{
  "score": <number 0-100>,
  "breakdown": {
    "keywords": <number 0-100>,
    "formatting": <number 0-100>,
    "impact": <number 0-100>,
    "brevity": <number 0-100>
  },
  "keywords": {
    "missing": [<array of critical keywords missing from resume>],
    "overused": [<array of buzzwords to remove>],
    "suggested": [<array of suggested keyword integrations>]
  },
  "formatting": {
    "issues": [<array of ATS-unfriendly elements>],
    "suggestions": [<array of structural changes>]
  },
  "impactRewrites": [
    {
      "original": "<original bullet point>",
      "alternatives": [<3 better alternatives using metrics and action verbs>]
    }
  ],
  "fixes": [<array of top 3 immediate fixes>]
}

Return ONLY valid JSON, no markdown formatting.`;

        const { cachedData } = await import("@/lib/cache");
        const getAnalysis = cachedData(
            () => generateWithGemini(prompt),
            ["analyze-resume", JSON.stringify({ resumeText, jobDescription })], // Cache based on inputs
            3600 // 1 hour
        );

        const response = await getAnalysis();

        // Parse JSON from response
        let jsonResponse;
        try {
            // Try to extract JSON if wrapped in markdown
            const jsonMatch = response.match(/\{[\s\S]*\}/);
            jsonResponse = JSON.parse(jsonMatch ? jsonMatch[0] : response);
        } catch (parseError) {
            console.error("Failed to parse Gemini response:", response);
            throw new Error("Invalid response format from AI");
        }

        return NextResponse.json(jsonResponse);
    } catch (error) {
        console.error("Resume analysis error:", error);
        return NextResponse.json(
            { error: "Failed to analyze resume" },
            { status: 500 }
        );
    }
}
