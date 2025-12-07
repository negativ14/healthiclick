import { NextRequest, NextResponse } from "next/server";

type FAQ = {
  question: string;
  answer: string;
  questionNumber: number;
  id: number;
};

export async function POST(req: NextRequest) {
  try {
    const { query } = await req.json();

    if (!query || typeof query !== "string") {
      return NextResponse.json(
        { success: false, error: "Query is required" },
        { status: 400 }
      );
    }

    const baseUrl = process.env.NEXTAUTH_URL || "http://localhost:3000";
    const faqsResponse = await fetch(`${baseUrl}/api/faqs`, {
      method: "GET",
      cache: "no-store",
    });

    if (!faqsResponse.ok) {
      throw new Error("Failed to fetch FAQs");
    }

    const { faqs } = await faqsResponse.json();

    const keywords = query
      .toLowerCase()
      .split(" ")
      .filter((word: string) => word.length > 2); //oil

    let relevantFAQs = faqs;

    if (keywords.length > 0) {
      relevantFAQs = faqs.filter((faq: FAQ) => {
        const searchText = `${faq.question} ${faq.answer}`.toLowerCase();
        return keywords.some((keyword: string) => searchText.includes(keyword));
      });
    }

    // 3. TODO: Make LLM call here with relevantFAQs
    // const faqContext = relevantFAQs.map(...)
    // const llmResponse = await fetch('gemini api')...

    return NextResponse.json({
      success: true,
      query,
      // llmResponse: "..." 
    });
  } catch (error) {
    console.error("Error in query route:", error);
    return NextResponse.json(
      { success: false, error: "Failed to process query" },
      { status: 500 }
    );
  }
}
