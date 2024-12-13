import "@/styles/globals.css";
import { Toaster } from "@/components/ui/toaster";
import type { AppProps } from "next/app";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <Component {...pageProps} />
      <Toaster />;
    </>
  );
}
