import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  try {
    const faqs = await prisma.fAQ.findMany({
      orderBy: { questionNumber: 'asc' }
    });
    
    return NextResponse.json({ 
      success: true,
      count: faqs.length,
      faqs 
    });
  } catch (error) {
    console.error('Error fetching FAQs:', error);
    return NextResponse.json(
      { 
        success: false, 
        error: "Failed to fetch FAQs" 
      },
      { status: 500 }
    );
  }
}