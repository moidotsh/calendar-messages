// pages/_app.tsx
import type { AppProps } from "next/app";
import { useToast } from "@/hooks/useToast";
import { Toast } from "@/components/ui/Toast";
import "@/styles/globals.css";

function MyApp({ Component, pageProps }: AppProps) {
  const { activeToast, hideToast } = useToast();

  return (
    <>
      <Component {...pageProps} />
      {activeToast && (
        <Toast
          title={activeToast.title}
          message={activeToast.message}
          onClose={hideToast}
        />
      )}
    </>
  );
}

export default MyApp;
