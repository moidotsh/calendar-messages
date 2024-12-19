// pages/message/[date].tsx
import { useRouter } from "next/router";
import { useState } from "react";
import TinaVerification from "@/components/TinaVerification";

const MessagePage = () => {
  const router = useRouter();
  const { date } = router.query;
  const [isVerified, setIsVerified] = useState(false);

  if (!isVerified) {
    return <TinaVerification onSuccess={() => setIsVerified(true)} />;
  }

  return (
    <div className="min-h-screen bg-black text-white flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-4xl font-bold mb-4">Message for {date}</h1>
        <p className="text-xl text-gray-400">Coming soon...</p>
        <button
          onClick={() => router.push("/")}
          className="mt-8 px-4 py-2 bg-white/10 hover:bg-white/20 rounded-lg transition-colors"
        >
          Back to Calendar
        </button>
      </div>
    </div>
  );
};

export default MessagePage;
