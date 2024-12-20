// src/components/TinaVerification.tsx
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useToast } from "@/hooks/useToast";

interface Answer {
  id: string;
  text: string;
}

interface Question {
  question_id: string;
  question_text: string;
  answers: Answer[];
}

interface TinaVerificationProps {
  onSuccess: () => void;
}

export default function TinaVerification({ onSuccess }: TinaVerificationProps) {
  const [questions, setQuestions] = useState<Question[]>([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<string[]>(
    Array(5).fill(null),
  );
  const [isVerifying, setIsVerifying] = useState(false);
  const [sessionId, setSessionId] = useState<string | null>(null);
  const router = useRouter();
  const { toast } = useToast();

  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const response = await fetch("/api/verification/questions");
        if (!response.ok) throw new Error("Failed to fetch questions");

        const data = await response.json();
        setQuestions(data.questions);
        setSessionId(data.sessionId);
      } catch (error) {
        console.error("Error fetching questions:", error);
        const errorDetails =
          error instanceof Error ? error.message : "Unknown error";
        toast({
          title: "Error",
          content: `Failed to load verification questions: ${errorDetails}`,
        });
        router.push("/");
      }
    };

    fetchQuestions();
  }, [router, toast]);

  const handleAnswerSelect = (answerId: string) => {
    const newAnswers = [...selectedAnswers];
    newAnswers[currentQuestionIndex] = answerId;
    setSelectedAnswers(newAnswers);
  };

  const handleVerify = async () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex((prev) => prev + 1);
      return;
    }

    setIsVerifying(true);
    try {
      const response = await fetch("/api/verification/verify", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          sessionId,
          answers: questions.map((q, index) => ({
            questionId: q.question_id,
            answerId: selectedAnswers[index],
          })),
        }),
      });

      if (!response.ok) throw new Error("Verification failed");

      const { success } = await response.json();

      if (success) {
        onSuccess();
      } else {
        toast({
          title: "Verification Failed 🌸",
          content:
            "Some answers were incorrect. The real Tina would know these!",
        });
        router.push("/");
      }
    } catch (error) {
      console.error("Error during verification:", error);
      toast({
        title: "Error",
        content: "An error occurred during verification. Please try again.",
      });
      router.push("/");
    } finally {
      setIsVerifying(false);
    }
  };

  if (questions.length === 0) {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
        <div className="w-16 h-16 border-4 border-purple-500 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  const currentQuestion = questions[currentQuestionIndex];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm overflow-y-auto">
      <div className="min-h-screen w-full flex items-center justify-center p-4">
        <div className="w-full max-w-md bg-white rounded-lg shadow-xl mx-4 my-8">
          {/* Card Header - Made more compact */}
          <div className="p-4 flex flex-col items-center space-y-2">
            <div className="w-10 h-10 bg-gradient-to-r from-pink-500/30 via-purple-500/30 to-blue-500/30 rounded-full flex items-center justify-center">
              <svg
                className="w-5 h-5 text-purple-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                />
              </svg>
            </div>
            <h2 className="text-lg font-semibold text-gray-900">
              Verify that you are Tina
            </h2>
            <p className="text-sm text-gray-500">
              Question {currentQuestionIndex + 1} of {questions.length}
            </p>
          </div>

          {/* Question Section - Optimized spacing */}
          <div className="px-4 pb-4">
            <p className="text-center mb-4 text-gray-700">
              {currentQuestion.question_text}
            </p>
            <div className="space-y-2">
              {currentQuestion.answers.map((answer) => (
                <button
                  key={answer.id}
                  onClick={() => handleAnswerSelect(answer.id)}
                  className={`w-full p-3 rounded-lg text-center transition-all
                    ${
                      selectedAnswers[currentQuestionIndex] === answer.id
                        ? "bg-purple-100 border-purple-500 text-purple-900 border-2"
                        : "bg-white hover:bg-gray-50 border-2 border-gray-200 hover:border-purple-200 text-gray-700"
                    }
                  `}
                >
                  {answer.text}
                </button>
              ))}
            </div>
          </div>

          {/* Action Button - Fixed at bottom */}
          <div className="p-4 border-t">
            <button
              onClick={handleVerify}
              disabled={!selectedAnswers[currentQuestionIndex] || isVerifying}
              className={`w-full py-2.5 px-4 rounded-lg text-white font-medium
                ${isVerifying ? "bg-purple-400" : "bg-purple-600 hover:bg-purple-700"}
                disabled:opacity-50 disabled:cursor-not-allowed
              `}
            >
              {isVerifying ? (
                <span className="flex items-center justify-center">
                  <svg
                    className="animate-spin -ml-1 mr-3 h-4 w-4 text-white"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    />
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    />
                  </svg>
                  Verifying...
                </span>
              ) : currentQuestionIndex === questions.length - 1 ? (
                "Verify"
              ) : (
                "Next Question"
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
