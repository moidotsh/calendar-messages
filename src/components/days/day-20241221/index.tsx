import React, { useState } from "react";
import { ChevronLeft } from "lucide-react";
import { Card } from "@/components/ui/card";
import { useRouter } from "next/navigation";
import { createClient } from "@supabase/supabase-js";

const TruthOrDare = () => {
  const [gameState, setGameState] = useState("welcome"); // welcome, choice, truthPath, darePath
  const [truthType, setTruthType] = useState(""); // confession or question
  const [inputValue, setInputValue] = useState("");
  const router = useRouter();

  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
  );

  const handleSubmit = async () => {
    try {
      const { error } = await supabase.from("game_responses").insert({
        type: truthType || "dare",
        prompt: inputValue,
        created_at: new Date().toISOString(),
      });

      if (error) throw error;

      // Return to calendar after successful submission
      router.push("/");
    } catch (error) {
      console.error("Error saving response:", error);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-900 to-black text-white flex items-center justify-center p-4 relative overflow-hidden">
      {/* Back button */}
      <div className="fixed bottom-0 left-0 right-0 p-4 flex justify-center z-20 bg-gradient-to-t from-black to-transparent">
        <button
          onClick={() => router.push("/")}
          className="flex items-center justify-center space-x-2 px-6 py-3 rounded-full bg-white/10 hover:bg-white/20 backdrop-blur-sm transition-all"
        >
          <ChevronLeft size={20} />
          <span>Back to Calendar</span>
        </button>
      </div>

      <div className="w-full max-w-2xl space-y-8 z-10">
        <Card className="bg-white/10 backdrop-blur-lg p-8 border-white/20">
          {gameState === "welcome" && (
            <div className="text-center space-y-6">
              <h1 className="text-3xl font-bold mb-4">Let's Play a Game! 🎮</h1>
              <p className="text-lg mb-6">
                Since you're the birthday girl, instead of flipping a coin, you
                get to choose first...
              </p>
              <button
                onClick={() => setGameState("choice")}
                className="px-8 py-4 bg-purple-500/50 hover:bg-purple-500/70 rounded-lg transition-all"
              >
                Let's Begin!
              </button>
            </div>
          )}

          {gameState === "choice" && (
            <div className="text-center space-y-6">
              <h2 className="text-2xl font-bold mb-6">Truth or Dare?</h2>
              <div className="flex justify-center gap-4">
                <button
                  onClick={() => setGameState("truthPath")}
                  className="px-8 py-4 bg-blue-500/50 hover:bg-blue-500/70 rounded-lg transition-all"
                >
                  Truth
                </button>
                <button
                  onClick={() => setGameState("darePath")}
                  className="px-8 py-4 bg-pink-500/50 hover:bg-pink-500/70 rounded-lg transition-all"
                >
                  Dare
                </button>
              </div>
            </div>
          )}

          {gameState === "truthPath" && (
            <div className="text-center space-y-6">
              <h2 className="text-2xl font-bold mb-6">Choose Your Truth</h2>
              <div className="flex flex-col gap-4">
                <button
                  onClick={() => setTruthType("confession")}
                  className="px-8 py-4 bg-blue-500/50 hover:bg-blue-500/70 rounded-lg transition-all"
                >
                  I want Alex to confess something
                </button>
                <button
                  onClick={() => setTruthType("question")}
                  className="px-8 py-4 bg-blue-500/50 hover:bg-blue-500/70 rounded-lg transition-all"
                >
                  I want to ask Alex a specific question
                </button>
              </div>
            </div>
          )}

          {gameState === "darePath" && (
            <div className="text-center space-y-6">
              <h2 className="text-2xl font-bold mb-6">Choose Your Dare</h2>
              <textarea
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                placeholder="Type your dare here..."
                className="w-full p-4 rounded-lg bg-black/30 backdrop-blur-sm border border-white/20 focus:border-white/40 focus:ring-0 transition-all resize-none h-32"
              />
              <button
                onClick={handleSubmit}
                disabled={!inputValue.trim()}
                className="px-8 py-4 bg-pink-500/50 hover:bg-pink-500/70 rounded-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Submit Dare
              </button>
            </div>
          )}

          {truthType && (
            <div className="text-center space-y-6 mt-6">
              <textarea
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                placeholder={
                  truthType === "confession"
                    ? "What should Alex confess about?"
                    : "What do you want to ask Alex?"
                }
                className="w-full p-4 rounded-lg bg-black/30 backdrop-blur-sm border border-white/20 focus:border-white/40 focus:ring-0 transition-all resize-none h-32"
              />
              <button
                onClick={handleSubmit}
                disabled={!inputValue.trim()}
                className="px-8 py-4 bg-blue-500/50 hover:bg-blue-500/70 rounded-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Submit{" "}
                {truthType === "confession" ? "Confession Topic" : "Question"}
              </button>
            </div>
          )}
        </Card>
      </div>
    </div>
  );
};

export default TruthOrDare;
