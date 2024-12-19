// src/lib/db.ts
import { Pool } from "pg";

// Create a new pool instance
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl:
    process.env.NODE_ENV === "production"
      ? {
          rejectUnauthorized: false,
        }
      : undefined,
});

export interface Question {
  question_id: string;
  question_text: string;
  answers: Answer[];
}

export interface Answer {
  id: string;
  text: string;
  is_correct: boolean;
}

export interface VerificationAttempt {
  session_id: string;
  ip_address: string;
  questions_asked: string[];
}

export async function getVerificationQuestions(
  numQuestions: number = 5,
): Promise<Question[]> {
  const client = await pool.connect();
  try {
    const result = await client.query(
      "SELECT * FROM get_verification_questions($1)",
      [numQuestions],
    );

    return result.rows.map((row) => ({
      question_id: row.question_id,
      question_text: row.question_text,
      answers: row.answers,
    }));
  } finally {
    client.release();
  }
}

export async function recordVerificationAttempt(
  attempt: VerificationAttempt,
): Promise<void> {
  const client = await pool.connect();
  try {
    await client.query(
      `INSERT INTO verification_attempts
       (session_id, ip_address, questions_asked)
       VALUES ($1, $2, $3)`,
      [
        attempt.session_id,
        attempt.ip_address,
        JSON.stringify(attempt.questions_asked),
      ],
    );
  } finally {
    client.release();
  }
}

export async function completeVerificationAttempt(
  sessionId: string,
  successful: boolean,
): Promise<void> {
  const client = await pool.connect();
  try {
    await client.query(
      `UPDATE verification_attempts
       SET completed_at = NOW(), successful = $2
       WHERE session_id = $1`,
      [sessionId, successful],
    );
  } finally {
    client.release();
  }
}
