import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { useToast } from "@/hooks/useToast";

interface Question {
  question: string;
  options: string[];
  correctIndex: number;
}

interface TinaVerificationProps {
  onSuccess: () => void;
}

const getRandomQuestion = (): Question => {
  const questions: Question[] = [
    {
      question: "What's Tina's favorite fruit?",
      options: ["Pomegranate", "Apple", "Orange", "Banana"],
      correctIndex: 0,
    },
    {
      question: "Which flower represents Tina?",
      options: ["Rose", "Lily", "Jasmine", "Sunflower"],
      correctIndex: 2,
    },
    {
      question: "What's Dokhtare Gol's favorite season?",
      options: ["Winter", "Spring", "Summer", "Fall"],
      correctIndex: 1,
    },
  ];
  return questions[Math.floor(Math.random() * questions.length)];
};

export default function TinaVerification({ onSuccess }: TinaVerificationProps) {
  const [question] = useState<Question>(getRandomQuestion());
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [isVerifying, setIsVerifying] = useState(false);
  const router = useRouter();
  const { toast } = useToast();

  const handleVerify = () => {
    setIsVerifying(true);

    if (selectedOption === question.correctIndex) {
      setTimeout(() => {
        setIsVerifying(false);
        onSuccess();
      }, 1000);
    } else {
      setTimeout(() => {
        setIsVerifying(false);
        toast({
          title: "Oops! Try again! 🌸",
          content:
            "That wasn't quite right. The real goldokhtar would know this!",
        });
        router.push("/");
      }, 1000);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
      <div className="w-full max-w-md p-6 bg-white rounded-lg shadow-xl">
        <div className="flex flex-col items-center space-y-4">
          {/* Header */}
          <div className="w-12 h-12 bg-gradient-to-r from-pink-500/30 via-purple-500/30 to-blue-500/30 rounded-full flex items-center justify-center">
            <svg
              className="w-6 h-6 text-purple-600"
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

          <h2 className="text-xl font-semibold text-gray-900">
            Verify that you are Tina
          </h2>
          <p className="text-sm text-gray-500">
            Complete to continue to your special page
          </p>

          {/* Question */}
          <div className="w-full pt-4">
            <p className="text-center mb-4 text-gray-700">
              {question.question}
            </p>
            <div className="space-y-2">
              {question.options.map((option, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedOption(index)}
                  className={`w-full p-3 rounded-lg border transition-all ${
                    selectedOption === index
                      ? "border-purple-500 bg-purple-50"
                      : "border-gray-200 hover:border-purple-200 hover:bg-purple-50/50"
                  }`}
                >
                  {option}
                </button>
              ))}
            </div>
          </div>

          {/* Verify Button */}
          <button
            onClick={handleVerify}
            disabled={selectedOption === null || isVerifying}
            className={`w-full py-3 px-4 rounded-lg text-white font-medium transition-all
              ${isVerifying ? "bg-purple-400" : "bg-purple-600 hover:bg-purple-700"}
              disabled:opacity-50 disabled:cursor-not-allowed`}
          >
            {isVerifying ? (
              <span className="flex items-center justify-center">
                <svg
                  className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
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
            ) : (
              "Verify"
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
