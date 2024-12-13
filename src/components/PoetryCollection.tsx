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
    text: "مرغ خوشخوان را بشارت باد کاندر راه گل",
    translation: "Good tidings to the singing bird on the path of flowers",
    poet: "Hafez",
  },
];

const PersianPoetry = () => {
  // Use a deterministic selection based on the current date
  const selectedPoem = React.useMemo(() => {
    // Use UTC date to ensure server/client consistency
    const today = new Date();
    const dayOfYear = Math.floor(
      (today.getTime() - new Date(today.getUTCFullYear(), 0, 0).getTime()) /
        86400000,
    );
    const index = dayOfYear % POETRY_COLLECTION.length;
    return POETRY_COLLECTION[index];
  }, []);

  return (
    <div className="mt-8 text-center">
      <p
        className="text-white/80 text-lg font-medium mb-1 font-[Noto Sans Arabic]"
        dir="rtl"
      >
        {selectedPoem.text}
      </p>
      <p className="text-white/60 text-sm italic">{selectedPoem.translation}</p>
      <p className="text-white/40 text-xs mt-1">— {selectedPoem.poet}</p>
    </div>
  );
};

export default PersianPoetry;
