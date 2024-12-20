// src/pages/api/verification/questions.ts
import type { NextApiRequest, NextApiResponse } from "next";
import { createClient } from "@supabase/supabase-js";
import { v4 as uuidv4 } from "uuid";

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

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  // Log environment variables (sanitized)
  console.log("Supabase URL exists:", !!process.env.NEXT_PUBLIC_SUPABASE_URL);
  console.log(
    "Service Role Key exists:",
    !!process.env.SUPABASE_SERVICE_ROLE_KEY,
  );

  if (req.method !== "GET") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    // Create Supabase client with error checking
    if (
      !process.env.NEXT_PUBLIC_SUPABASE_URL ||
      !process.env.SUPABASE_SERVICE_ROLE_KEY
    ) {
      throw new Error("Missing Supabase environment variables");
    }

    const supabase = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL,
      process.env.SUPABASE_SERVICE_ROLE_KEY,
    );

    const sessionId = uuidv4();

    console.log("Fetching questions...");
    // Call the stored function using Supabase
    const { data: questions, error: questionsError } = await supabase.rpc(
      "get_verification_questions",
      { num_questions: 5 },
    );

    if (questionsError) {
      console.error("Error fetching questions:", questionsError);
      throw new Error(`Questions fetch error: ${questionsError.message}`);
    }

    if (!questions || !Array.isArray(questions)) {
      console.error("Invalid questions data:", questions);
      throw new Error("Invalid questions data received");
    }

    console.log(`Retrieved ${questions.length} questions`);

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

    if (insertError) {
      console.error("Error recording attempt:", insertError);
      throw new Error(`Insert error: ${insertError.message}`);
    }

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

    console.log("Successfully processed questions");
    res.status(200).json({
      sessionId,
      questions: sanitizedQuestions,
    });
  } catch (error) {
    const errorMessage =
      error instanceof Error ? error.message : "Unknown error occurred";
    console.error("Full error details:", error);
    res.status(500).json({
      error: "Internal server error",
      details: errorMessage,
    });
  }
}
