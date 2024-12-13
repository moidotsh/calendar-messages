import "@/styles/globals.css";
import { Toast } from "@/components/ui/toast";
import { useToast } from "@/hooks/useToast";
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
