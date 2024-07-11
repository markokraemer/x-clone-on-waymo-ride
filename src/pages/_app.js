import "@/styles/globals.css";
import { ThemeProvider } from "next-themes";
import { Toaster } from "@/components/ui/toaster";
import { UserProvider, useUser } from "@/context/UserContext";
import ErrorBoundary from "@/components/ErrorBoundary";
import LoadingSpinner from "@/components/LoadingSpinner";

function MyApp({ Component, pageProps }) {
  const { loading } = useUser();

  if (loading) {
    return <LoadingSpinner />;
  }

  return <Component {...pageProps} />;
}

export default function App({ Component, pageProps }) {
  return (
    <ErrorBoundary>
      <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
        <UserProvider>
          <MyApp Component={Component} pageProps={pageProps} />
          <Toaster />
        </UserProvider>
      </ThemeProvider>
    </ErrorBoundary>
  );
}