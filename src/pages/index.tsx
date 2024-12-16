// src/pages/index.tsx
import HorizontalCalendar from "@/components/HorizontalCalendar";
import { AnimatedLayout } from "@/components/AnimatedLayout";

export default function Home() {
  return (
    <AnimatedLayout>
      <HorizontalCalendar />
    </AnimatedLayout>
  );
}
