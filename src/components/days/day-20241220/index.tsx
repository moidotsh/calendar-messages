// src/components/days/day-20241220/index.tsx
import React, { useEffect, useState } from "react";
import { Star } from "lucide-react";
import { Card } from "@/components/ui/card";
import { createClient } from "@supabase/supabase-js";

interface CustomCSSProperties extends React.CSSProperties {
  "--duration"?: string;
}

interface MessageContent {
  title: string;
  content: string;
  signature: string;
}

const YaldaDay = () => {
  const [message, setMessage] = useState<MessageContent | null>(null);

  useEffect(() => {
    const fetchMessage = async () => {
      const supabase = createClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL!,
        process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
      );

      const { data, error } = await supabase
        .from("messages")
        .select("title, content, signature")
        .eq("date", "2024-12-20")
        .single();

      if (!error && data) {
        setMessage(data);
      }
    };

    fetchMessage();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#1a0f1c] to-black text-white flex items-center justify-center p-4 relative overflow-hidden">
      {/* Animated background stars */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="absolute animate-float opacity-30"
            style={
              {
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 5}s`,
                "--duration": `${15 + Math.random() * 10}s`,
              } as CustomCSSProperties
            }
          >
            <Star className="text-white" size={Math.random() * 10 + 5} />
          </div>
        ))}
      </div>

      <div className="w-full max-w-2xl space-y-8 z-10">
        {/* Header with animation */}
        <div className="text-center space-y-2 animate-fade-in">
          <h1 className="text-4xl font-bold text-white mb-2">
            ✨ Shab-e Yalda ✨
          </h1>
          <p className="text-white/90 text-lg">The longest night of the year</p>
        </div>

        {/* Message Section with animated background */}
        <Card className="transform transition-all duration-500 hover:scale-[1.02] bg-white/10 backdrop-blur-lg p-8 relative overflow-hidden group border-white/20">
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent opacity-0 group-hover:opacity-100 transform translate-x-[-50%] group-hover:translate-x-[50%] transition-all duration-1000 ease-in-out" />

          {message && (
            <div className="space-y-6 text-center relative z-10">
              <div className="space-y-6">
                <h2 className="text-2xl font-semibold text-white mb-6">
                  {message.title}
                </h2>
                <p className="text-lg text-white/90 leading-relaxed max-w-xl mx-auto">
                  {message.content}
                </p>
                <p className="text-white/80 text-lg mt-8">
                  {message.signature}
                </p>
              </div>
            </div>
          )}
        </Card>

        {/* Floating Yalda elements */}
        <div className="fixed inset-0 pointer-events-none overflow-hidden">
          <div
            className="absolute top-10 left-10 text-4xl animate-float opacity-80"
            style={{ "--duration": "15s" } as CustomCSSProperties}
          >
            🍎
          </div>
          <div
            className="absolute top-20 right-20 text-4xl animate-float opacity-80"
            style={{ "--duration": "20s" } as CustomCSSProperties}
          >
            🫐
          </div>
          <div
            className="absolute bottom-20 left-20 text-4xl animate-float opacity-80"
            style={{ "--duration": "18s" } as CustomCSSProperties}
          >
            🍉
          </div>
          <div
            className="absolute bottom-40 right-40 text-4xl animate-float opacity-80"
            style={{ "--duration": "22s" } as CustomCSSProperties}
          >
            ✨
          </div>
        </div>
      </div>
    </div>
  );
};

export default YaldaDay;
