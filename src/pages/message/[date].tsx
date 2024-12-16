// src/pages/message/[date].tsx
import { useRouter } from "next/router";
import { AnimatedLayout } from "@/components/AnimatedLayout";

const MessagePage = () => {
  const router = useRouter();
  const { date } = router.query;

  return (
    <AnimatedLayout>
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold mb-4 text-white">
            Message for {date}
          </h1>
          <p className="text-xl text-gray-400">Coming soon...</p>
          <button
            onClick={() => router.push("/")}
            className="mt-8 px-4 py-2 bg-white/10 hover:bg-white/20 rounded-lg transition-colors text-white"
          >
            Back to Calendar
          </button>
        </div>
      </div>
    </AnimatedLayout>
  );
};

export default MessagePage;
