// src/pages/api/verification/questions.ts
import type { NextApiRequest, NextApiResponse } from "next";
import { createClient } from "@supabase/supabase-js";
import { v4 as uuidv4 } from "uuid";

// Define types for our data structures
interface DatabaseQuestion {
  question_id: string;
  question_text: string;
  answers: DatabaseAnswer[];
}

interface DatabaseAnswer {
  id: string;
  text: string;
  is_correct: boolean;
}

interface SanitizedQuestion {
  question_id: string;
  question_text: string;
  answers: SanitizedAnswer[];
}

interface SanitizedAnswer {
  id: string;
  text: string;
}

// Initialize Supabase client
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!, // Use service role key for admin access
);

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  if (req.method !== "GET") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    const sessionId = uuidv4();

    // Call the stored function using Supabase
    const { data: questions, error } = await supabase.rpc(
      "get_verification_questions",
      { num_questions: 5 },
    );

    if (error) throw error;

    // Record verification attempt
    const { error: insertError } = await supabase
      .from("verification_attempts")
      .insert({
        session_id: sessionId,
        ip_address: req.socket.remoteAddress || "",
        questions_asked: (questions as DatabaseQuestion[]).map(
          (q) => q.question_id,
        ),
      });

    if (insertError) throw insertError;

    // Remove is_correct flag from answers before sending to client
    const sanitizedQuestions: SanitizedQuestion[] = (
      questions as DatabaseQuestion[]
    ).map((question) => ({
      question_id: question.question_id,
      question_text: question.question_text,
      answers: question.answers.map((answer) => ({
        id: answer.id,
        text: answer.text,
      })),
    }));

    res.status(200).json({
      sessionId,
      questions: sanitizedQuestions,
    });
  } catch (error) {
    console.error("Error fetching questions:", error);
    res.status(500).json({ error: "Internal server error" });
  }
}
