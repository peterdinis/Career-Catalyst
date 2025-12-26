import { NextResponse } from "next/server";
import { generateWithGemini, isGeminiConfigured } from "@/lib/gemini";

export async function POST(req: Request) {
    try {
        const { messages, config } = await req.json();

        if (!isGeminiConfigured()) {
            // Return mock response if API key not configured
            await new Promise((resolve) => setTimeout(resolve, 1500));

            const lastUserMessage = messages[messages.length - 1];

            // Initial State
            if (messages.length === 0) {
                return NextResponse.json({
                    message: `Hello! I'm your AI Interview Coach. I see you're applying for a ${config.role} position at a ${config.companyType} company. To start, tell me a little bit about yourself and why you're interested in this role.`,
                    feedback: null,
                });
            }

            // Mock Feedback Logic
            const feedback = {
                strengths: ["Good clarity", "Mentioned relevant experience"],
                improvements: ["Could be more specific about outcomes", "Use more action verbs"],
                betterAnswer: "A stronger answer would quantify your impact, e.g., 'I improved X by Y%'.",
                score: 7,
            };

            // Mock Next Question Logic
            const nextQuestions = [
                "Can you describe a challenging technical problem you solved recently?",
                "How do you handle disagreements with stakeholders?",
                "Tell me about a time you failed and what you learned.",
                "What is your approach to testing and quality assurance?",
            ];

            const randomQuestion = nextQuestions[Math.floor(Math.random() * nextQuestions.length)];

            return NextResponse.json({
                message: randomQuestion,
                feedback: feedback,
            });
        }

        // Use Gemini AI for real interview simulation
        // Initial greeting
        if (messages.length === 0) {
            return NextResponse.json({
                message: `Hello! I'm your AI Interview Coach. I see you're applying for a ${config.role} position at a ${config.companyType} company. To start, tell me a little bit about yourself and why you're interested in this role.`,
                feedback: null,
            });
        }

        const lastUserMessage = messages[messages.length - 1];
        const conversationHistory = messages.map((m: {
            role: "user" | "assistant";
            content: string;
        }) =>
            `${m.role === 'user' ? 'Candidate' : 'Interviewer'}: ${m.content}`
        ).join('\n');

        const prompt = `You are an interview coach who has conducted 5000+ interviews at FAANG companies. You are simulating a realistic interview.

INTERVIEW SETUP:
- Role: ${config.role}
- Company Type: ${config.companyType}
- Seniority: ${config.seniority}
- Interview Round: ${config.round}
- Difficulty: ${config.difficulty}

CONVERSATION SO FAR:
${conversationHistory}

CANDIDATE'S LAST ANSWER:
${lastUserMessage.content}

TASKS:
1. Provide feedback on the candidate's last answer in JSON format:
{
  "strengths": [<2-3 specific things they did well>],
  "improvements": [<2-3 concrete suggestions>],
  "betterAnswer": "<model response showing how to improve>",
  "score": <1-10>
}

2. Ask the next appropriate interview question based on the phase and flow.

Return a JSON object with this structure:
{
  "feedback": {<feedback object from above>},
  "message": "<your next question>"
}

Return ONLY valid JSON, no markdown formatting.`;

        const response = await generateWithGemini(prompt);

        // Parse JSON from response
        let jsonResponse;
        try {
            const jsonMatch = response.match(/\{[\s\S]*\}/);
            jsonResponse = JSON.parse(jsonMatch ? jsonMatch[0] : response);
        } catch (parseError) {
            console.error("Failed to parse Gemini response:", response);
            // Fallback to simple response
            return NextResponse.json({
                message: "Can you tell me more about that experience?",
                feedback: {
                    strengths: ["Good start"],
                    improvements: ["Add more specific details"],
                    betterAnswer: "Try to include metrics and outcomes.",
                    score: 6,
                },
            });
        }

        return NextResponse.json(jsonResponse);

    } catch (error) {
        console.error("Interview chat error:", error);
        return NextResponse.json(
            { error: "Failed to generate response" },
            { status: 500 }
        );
    }
}
