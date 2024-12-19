// src/pages/api/verification/verify.ts
import type { NextApiRequest, NextApiResponse } from "next";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!, // Use service role key for admin access
);

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { sessionId, answers } = req.body;

  if (!sessionId || !answers || !Array.isArray(answers)) {
    return res.status(400).json({ error: "Invalid request body" });
  }

  try {
    // Verify each answer
    const results = await Promise.all(
      answers.map(async ({ questionId, answerId }) => {
        const { data, error } = await supabase
          .from("question_answers")
          .select("is_correct")
          .eq("question_id", questionId)
          .eq("id", answerId)
          .single();

        if (error) throw error;
        return data?.is_correct || false;
      }),
    );

    const allCorrect = results.every((result) => result === true);

    // Update verification attempt
    const { error: updateError } = await supabase
      .from("verification_attempts")
      .update({
        completed_at: new Date().toISOString(),
        successful: allCorrect,
      })
      .eq("session_id", sessionId);

    if (updateError) throw updateError;

    res.status(200).json({ success: allCorrect });
  } catch (error) {
    console.error("Error verifying answers:", error);
    res.status(500).json({ error: "Internal server error" });
  }
}
