import { NextResponse } from "next/server";

export async function POST(request: Request) {
    try {
        const { prompt, type } = await request.json();

        const apiKey = process.env.OPENROUTER_API_KEY;
        if (!apiKey) {
            return NextResponse.json(
                { error: "OpenRouter API key not configured" },
                { status: 500 }
            );
        }

        let systemPrompt = "";

        switch (type) {
            case "summary":
                systemPrompt =
                    "You are a professional resume writer. Generate a concise, impactful professional summary (2-3 sentences) based on the user's information. Output ONLY the summary text, no labels or quotes.";
                break;
            case "improve":
                systemPrompt =
                    "You are a professional resume writer. Improve the given text to be more impactful, using strong action verbs and quantifiable achievements where possible. Keep it concise. Output ONLY the improved text, no labels or quotes.";
                break;
            case "bullet":
                systemPrompt =
                    "You are a professional resume writer. Generate 3-4 impactful bullet points for the given job role and company. Use strong action verbs and focus on achievements. Output each bullet on a new line starting with '•'. No other text.";
                break;
            case "skills":
                systemPrompt =
                    "You are a professional resume writer. Suggest 8-10 relevant technical and soft skills for the given job role. Output each skill on a new line, no numbering, no bullets, just the skill name.";
                break;
            case "projects":
                systemPrompt =
                    "You are a professional resume writer. Generate an impactful description for a technical project. Use action verbs and highlight the impact. Output ONLY the description text, no labels.";
                break;
            case "bullet_improve":
                systemPrompt =
                    "You are a professional resume writer. Rewrite the following experience bullet point to be more impactful, professional, and result-oriented. Use strong action verbs and quantify achievements if possible. Output ONLY the improved bullet point, no other text.";
                break;
            case "analyze_jd":
                systemPrompt =
                    "You are a professional recruiter. Analyze the provided resume against the job description. Return a JSON object with: 1. matchScore (0-100), 2. missingKeywords (array), 3. improvementSuggestions (array). Output ONLY the JSON object.";
                break;
            case "score_resume":
                systemPrompt =
                    "You are an expert resume critic. Provide a comprehensive score (0-100) and actionable feedback for each section (Summary, Experience, Education, Skills). Return a JSON object with: 1. overallScore, 2. sectionScores (object), 3. topSuggestions (array). Output ONLY the JSON object.";
                break;
            case "ats":
                systemPrompt =
                    "You are an ATS optimization expert. Analyze the provided resume text and suggest 5-8 missing keywords or improvements to increase ATS compatibility. Output each suggestion on a new line.";
                break;
            default:
                systemPrompt =
                    "You are a professional resume writer. Help the user with their resume content.";
        }

        const response = await fetch(
            "https://openrouter.ai/api/v1/chat/completions",
            {
                method: "POST",
                headers: {
                    Authorization: `Bearer ${apiKey}`,
                    "Content-Type": "application/json",
                    "HTTP-Referer":
                        process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000",
                    "X-Title": "AI Resume Maker",
                },
                body: JSON.stringify({
                    model: "google/gemini-2.0-flash-001",
                    messages: [
                        { role: "system", content: systemPrompt },
                        { role: "user", content: prompt },
                    ],
                    max_tokens: 500,
                    temperature: 0.7,
                }),
            }
        );

        if (!response.ok) {
            const errorData = await response.json();
            console.error("OpenRouter API error:", errorData);
            return NextResponse.json(
                { error: "AI generation failed" },
                { status: 500 }
            );
        }

        const data = await response.json();
        const content = data.choices?.[0]?.message?.content || "";

        return NextResponse.json({ content });
    } catch (error) {
        console.error("AI API error:", error);
        return NextResponse.json(
            { error: "Internal server error" },
            { status: 500 }
        );
    }
}
