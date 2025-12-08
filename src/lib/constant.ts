import { FAQ } from "@/generated/prisma/client";

// Sample messages data structure
export const messages: Message[] = [
  {
    id: "1",
    content: "Hello! How much water should I drink daily?",
    role: "user",
    createdAt: new Date("2024-12-08T10:30:00"),
  },
  {
    id: "2",
    content:
      "You should drink 3-4 liters of water daily to support hydration and overall health. (Ref: Question #1)",
    role: "assistant",
    createdAt: new Date("2024-12-08T10:30:03"),
  },
  {
    id: "3",
    content: "What are the best sources of protein?",
    role: "user",
    createdAt: new Date("2024-12-08T10:31:15"),
  },
  {
    id: "4",
    content:
      "Best protein sources include chicken, fish, eggs, legumes, tofu, Greek yogurt, and lean beef. (Ref: Question #2)",
    role: "assistant",
    createdAt: new Date("2024-12-08T10:31:18"),
  },
  {
    id: "5",
    content: "Should I take vitamin supplements?",
    role: "user",
    createdAt: new Date("2024-12-08T10:32:00"),
  },
  {
    id: "6",
    content:
      "Supplements may be needed if you have deficiencies. It's best to get nutrients from whole foods first and consult a doctor before taking supplements. (Ref: Question #6)",
    role: "assistant",
    createdAt: new Date("2024-12-08T10:32:04"),
  },
  {
    id: "1",
    content: "Hello! How much water should I drink daily?",
    role: "user",
    createdAt: new Date("2024-12-08T10:30:00"),
  },
  {
    id: "2",
    content:
      "You should drink 3-4 liters of water daily to support hydration and overall health. (Ref: Question #1)",
    role: "assistant",
    createdAt: new Date("2024-12-08T10:30:03"),
  },
  {
    id: "3",
    content: "What are the best sources of protein?",
    role: "user",
    createdAt: new Date("2024-12-08T10:31:15"),
  },
  {
    id: "4",
    content:
      "Best protein sources include chicken, fish, eggs, legumes, tofu, Greek yogurt, and lean beef. (Ref: Question #2)",
    role: "assistant",
    createdAt: new Date("2024-12-08T10:31:18"),
  },
  {
    id: "5",
    content: "Should I take vitamin supplements?",
    role: "user",
    createdAt: new Date("2024-12-08T10:32:00"),
  },
  {
    id: "6",
    content:
      "Supplements may be needed if you have deficiencies. It's best to get nutrients from whole foods first and consult a doctor before taking supplements. (Ref: Question #6)",
    role: "assistant",
    createdAt: new Date("2024-12-08T10:32:04"),
  },
  {
    id: "1",
    content: "Hello! How much water should I drink daily?",
    role: "user",
    createdAt: new Date("2024-12-08T10:30:00"),
  },
  {
    id: "2",
    content:
      "You should drink 3-4 liters of water daily to support hydration and overall health. (Ref: Question #1)",
    role: "assistant",
    createdAt: new Date("2024-12-08T10:30:03"),
  },
  {
    id: "3",
    content: "What are the best sources of protein?",
    role: "user",
    createdAt: new Date("2024-12-08T10:31:15"),
  },
  {
    id: "4",
    content:
      "Best protein sources include chicken, fish, eggs, legumes, tofu, Greek yogurt, and lean beef. (Ref: Question #2)",
    role: "assistant",
    createdAt: new Date("2024-12-08T10:31:18"),
  },
  {
    id: "5",
    content: "Should I take vitamin supplements?",
    role: "user",
    createdAt: new Date("2024-12-08T10:32:00"),
  },
  {
    id: "6",
    content:
      "Supplements may be needed if you have deficiencies. It's best to get nutrients from whole foods first and consult a doctor before taking supplements. (Ref: Question #6)",
    role: "assistant",
    createdAt: new Date("2024-12-08T10:32:04"),
  },
  {
    id: "1",
    content: "Hello! How much water should I drink daily?",
    role: "user",
    createdAt: new Date("2024-12-08T10:30:00"),
  },
  {
    id: "2",
    content:
      "You should drink 3-4 liters of water daily to support hydration and overall health. (Ref: Question #1)",
    role: "assistant",
    createdAt: new Date("2024-12-08T10:30:03"),
  },
  {
    id: "3",
    content: "What are the best sources of protein?",
    role: "user",
    createdAt: new Date("2024-12-08T10:31:15"),
  },
  {
    id: "4",
    content:
      "Best protein sources include chicken, fish, eggs, legumes, tofu, Greek yogurt, and lean beef. (Ref: Question #2)",
    role: "assistant",
    createdAt: new Date("2024-12-08T10:31:18"),
  },
  {
    id: "5",
    content: "Should I take vitamin supplements?",
    role: "user",
    createdAt: new Date("2024-12-08T10:32:00"),
  },
  {
    id: "6",
    content:
      "Supplements may be needed if you have deficiencies. It's best to get nutrients from whole foods first and consult a doctor before taking supplements. (Ref: Question #6)",
    role: "assistant",
    createdAt: new Date("2024-12-08T10:32:04"),
  },
];

export function buildPrompt(userInput: string, faqs?: FAQ[]): string {
  if (faqs && faqs.length > 0) {
    const faqContext = faqs
      .map(
        (faq) =>
          `Question #${faq.questionNumber}: ${faq.question}\nAnswer: ${faq.answer}`
      )
      .join("\n\n");

    return `You are a helpful diet assistant.

IMPORTANT RULES:
1. First, check if these FAQs answer the user's question
2. If FAQ matches: cite it like (Ref: Question #X) and use that answer
3. If NO FAQ matches: answer using your own nutrition knowledge
4. Try to answer in 2 or 3 lines if need more just keep your answer to maximum 6 lines
5. Be direct, concise, and practical

Available FAQs:
${faqContext}

User Question: ${userInput}

Answer in maximum 6 lines (cite FAQ if used, otherwise answer from your knowledge):`;
  }

  return `You are a helpful diet and nutrition assistant.

User Question: ${userInput}

IMPORTANT RULES:
1. Keep your answer to maximum 6 lines
2. Be direct, concise, and practical
3. If you're not sure, say so briefly
4. Focus on the most important information

Try to answer in 2 or 3 lines if need more just keep your answer to maximum 6 lines`;
}
