import React from "react";

const POETRY_COLLECTION = [
  {
    text: "هر ورق گل، دفتری است از شرح شوق بهار",
    translation: "Every flower petal is a page from spring's story",
    poet: "Hafez",
  },
  {
    text: "چو گل با گل در آمیزد، بهاری نو شود پیدا",
    translation: "When flower meets flower, a new spring appears",
    poet: "Rumi",
  },
  {
    text: "گل همین پنج روز و شش باشد",
    translation: "The flower blooms but for a few days",
    poet: "Hafez",
  },
  {
    text: "بوی گل و ریحان ها",
    translation: "The scent of flowers and herbs",
    poet: "Rumi",
  },
  {
    text: "چون شقایق بر سمن راز دل خود باز کن",
    translation: "Like the poppy to the jasmine, share your heart's story",
    poet: "Hafez",
  },
  {
    text: "هر ورق گل، دفتری است از شرح شوق بهار",
    translation: "Every flower petal is a page from spring's story",
    poet: "Hafez",
  },
  {
    text: "چو گل با گل در آمیزد، بهاری نو شود پیدا",
    translation: "When flower meets flower, a new spring appears",
    poet: "Rumi",
  },
  {
    text: "گل همین پنج روز و شش باشد",
    translation: "The flower blooms but for a few days",
    poet: "Hafez",
  },
  {
    text: "بوی گل و ریحان ها",
    translation: "The scent of flowers and herbs",
    poet: "Rumi",
  },
  {
    text: "چون شقایق بر سمن راز دل خود باز کن",
    translation: "Like the poppy to the jasmine, share your heart's story",
    poet: "Hafez",
  },
  {
    text: "مرغ خوشخوان را بشارت باد کاندر راه گل",
    translation: "Good tidings to the singing bird on the path of flowers",
    poet: "Hafez",
  },
];

const EnhancedHeader = () => {
  // Use deterministic selection based on the current date
  const selectedPoem = React.useMemo(() => {
    const today = new Date();
    const dayOfYear = Math.floor(
      (today.getTime() - new Date(today.getUTCFullYear(), 0, 0).getTime()) /
        86400000,
    );
    const index = dayOfYear % POETRY_COLLECTION.length;
    return POETRY_COLLECTION[index];
  }, []);

  return (
    <div className="absolute inset-x-0 top-12 flex flex-col items-center z-10">
      {/* Main title card with gradient border */}
      <div className="relative group">
        <div className="absolute -inset-0.5 bg-gradient-to-r from-pink-500/30 via-purple-500/30 to-blue-500/30 rounded-xl blur opacity-75 group-hover:opacity-100 transition duration-1000"></div>
        <div className="relative px-8 py-4 bg-white/5 backdrop-blur-md rounded-xl">
          <h1 className="text-3xl font-bold text-white text-center mb-1">
            Tina
          </h1>
          <p className="text-lg text-white/90 text-center font-light tracking-wider">
            ✿ Dokhtare Gol ✿
          </p>
        </div>
      </div>

      {/* Poetry section with subtle separator */}
      <div className="mt-8 max-w-md mx-auto text-center px-4">
        <div className="space-y-2">
          <p className="text-lg font-medium text-white/90" dir="rtl">
            {selectedPoem.text}
          </p>
          <p className="text-sm text-white/75 italic">
            {selectedPoem.translation}
          </p>
          <p className="text-xs text-white/60">— {selectedPoem.poet}</p>
        </div>
      </div>
    </div>
  );
};

export default EnhancedHeader;
