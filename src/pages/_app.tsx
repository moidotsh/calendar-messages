// pages/_app.tsx
import { useToast } from "@/hooks/useToast";
import { Toast } from "@/components/ui/toast";
import type { AppProps } from "next/app";

export default function App({ Component, pageProps }: AppProps) {
  const { activeToast, hideToast } = useToast();

  return (
    <>
      <Component {...pageProps} />
      {activeToast && <Toast {...activeToast} onClose={hideToast} />}
    </>
  );
}
