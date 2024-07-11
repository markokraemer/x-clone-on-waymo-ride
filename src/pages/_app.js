import "@/styles/globals.css";
import { ThemeProvider } from "next-themes";
import { Toaster } from "@/components/ui/toaster";
import { UserProvider } from "@/context/UserContext";
import ErrorBoundary from "@/components/ErrorBoundary";

function MyApp({ Component, pageProps }) {
  return (
    <ErrorBoundary>
      <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
        <UserProvider>
          <Component {...pageProps} />
          <Toaster />
        </UserProvider>
      </ThemeProvider>
    </ErrorBoundary>
  );
}

export default MyApp;