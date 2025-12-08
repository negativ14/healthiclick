import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";
import { authOptions } from "../auth/[...nextauth]/options";
import { prisma } from "@/lib/prisma";
import { ai } from "@/lib/ai";
import { buildPrompt } from "@/lib/constant";

type FAQ = {
  question: string;
  answer: string;
  questionNumber: number;
  id: number;
};

export async function POST(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions);

    if (!session?.user?.id) {
      console.log("this is the session", session);
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const messageObj = await req.json();

    const { content, role } = messageObj;

    const baseUrl = process.env.NEXTAUTH_URL || "http://localhost:3000";
    const faqsResponse = await fetch(`${baseUrl}/api/get-faqs`, {
      method: "GET",
      cache: "no-store",
    });

    if (!faqsResponse.ok) {
      throw new Error("Failed to fetch FAQs");
    }

    const { faqs } = await faqsResponse.json();

    const keywords = content
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

    const prompt = buildPrompt(content, relevantFAQs);

    let aiMessage;
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: prompt,
    });
    console.log(response.text);

    if (response?.text) {
      aiMessage = response.text;

      //should be do transaction 
      await prisma.message.create({
        data: {
          userId: session.user.id,
          content: content,
          role: role,
        },
      });

      await prisma.message.create({
        data: {
          userId: session.user.id,
          content: aiMessage || "",
          role: "assistant",
        },
      });
    }

    return NextResponse.json({
      success: true,
      content,
      aiMessage,
    });
  } catch (error) {
    console.error("Error in query route:", error);

    return NextResponse.json(
      { success: false, error: "Failed to process query" },
      { status: 500 }
    );
  }
}
