import { NextResponse } from "next/server";
import { generateWithGemini, isGeminiConfigured } from "@/lib/gemini";

export async function POST(req: Request) {
    try {
        const { jobDescription, companyName, hiringManager, userExperience, tone } = await req.json();

        if (!isGeminiConfigured()) {
            await new Promise((resolve) => setTimeout(resolve, 3000));

            const date = new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
            const manager = hiringManager || "Hiring Manager";

            const letter = `
${date}

${manager}
${companyName}

Dear ${manager},

I've been following ${companyName}'s recent expansion into AI-driven analytics with great enthusiasm. As a developer who believes that technology should empower human potential rather than replace it, your mission resonates deeply with my own professional philosophy. I am writing to express my strong interest in the Software Engineer role, where I can contribute my expertise in full-stack development to accelerate your product roadmap.

Throughout my career, I have consistently delivered high-impact solutions by bridging the gap between complex backend logic and intuitive user interfaces. My experience aligns perfectly with your requirements for scalable architecture and modern frontend frameworks. Specifically, I bring three core strengths to your team:

First, my proficiency in React and Node.js has allowed me to build robust applications that serve thousands of daily users. Second, I have a proven track record of optimizing database performance, reducing query times by up to 40%. Third, I thrive in collaborative Agile environments, where I have successfully mentored junior developers and led sprint planning sessions.

One of my proudest achievements was at my previous role, where I spearheaded the migration of a legacy monolith to a microservices architecture. This initiative not only improved system reliability by 99.9% but also reduced deployment times from hours to minutes. I am eager to bring this same level of technical rigor and innovation to the engineering challenges at ${companyName}.

I am particularly excited about ${companyName}'s recent launch of the "DataFlow" product. I see immense potential in integrating real-time data visualization features, an area where I have significant experience. I would welcome the opportunity to discuss how my background in data-heavy applications can help drive the next phase of this product's growth.

Thank you for your time and consideration. I am confident that my technical skills and passion for building user-centric software make me a strong candidate for this position. I look forward to the possibility of discussing how I can contribute to the continued success of ${companyName}.

Sincerely,

[Your Name]
      `.trim();

            return NextResponse.json({ letter });
        }

        // Use Gemini AI for real generation
        const manager = hiringManager || "Hiring Manager";
        const date = new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });

        const prompt = `You are a master copywriter specializing in career documents. Create a compelling, personalized cover letter.

INPUTS:
- Job Description: ${jobDescription}
- Company Name: ${companyName}
- Hiring Manager: ${manager}
- User Experience/Achievements: ${userExperience}
- Desired Tone: ${tone}

Create a customized cover letter with these sections:
1. Attention-Grabbi ng Opening (connects passion to company mission)
2. Value Proposition Paragraph (3 key skills matching job requirements)
3. Quantified Achievement Showcase (using STAR method)
4. Company-Specific Research Integration
5. Confident Closing with call to action

REQUIREMENTS:
- Avoid clichés like "I'm writing to apply for..."
- Use power verbs and quantifiable results
- Keep paragraphs under 4 lines
- Professional formatting with date header
- ${tone} tone throughout

Return ONLY the cover letter text, properly formatted with the date (${date}) at the top.`;

        const { cachedData } = await import("@/lib/cache");
        const getLetter = cachedData(
            () => generateWithGemini(prompt),
            ["generate-cover-letter", JSON.stringify({ jobDescription, companyName, hiringManager, userExperience, tone })],
            3600 // 1 hour
        );

        const letter = await getLetter();

        return NextResponse.json({ letter: letter.trim() });
    } catch (error) {
        console.error("Cover letter generation error:", error);
        return NextResponse.json(
            { error: "Failed to generate cover letter" },
            { status: 500 }
        );
    }
}
