// pages/_app.tsx
import type { AppProps } from "next/app";
import { useToast } from "@/hooks/useToast";
import { Toast } from "@/components/ui/Toast";
import { Layout } from "@/components/Layout";
import "@/styles/globals.css";
import { Analytics } from "@vercel/analytics/react";

function MyApp({ Component, pageProps }: AppProps) {
  const { activeToast, hideToast } = useToast();

  return (
    <Layout>
      <Analytics />
      <Component {...pageProps} />
      {activeToast && (
        <Toast
          title={activeToast.title}
          message={activeToast.message}
          onClose={hideToast}
        />
      )}
    </Layout>
  );
}

export default MyApp;
