import "@/styles/globals.css";
import { ThemeProvider } from "next-themes";
import { Toaster } from "@/components/ui/toaster";
import { UserProvider } from "@/context/UserContext";
import ErrorBoundary from "@/components/ErrorBoundary";
import PrivateRoute from "@/components/PrivateRoute";

const protectedRoutes = ['/profile', '/settings', '/messages'];

export default function App({ Component, pageProps, router }) {
  return (
    <ErrorBoundary>
      <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
        <UserProvider>
          {protectedRoutes.includes(router.pathname) ? (
            <PrivateRoute>
              <Component {...pageProps} />
            </PrivateRoute>
          ) : (
            <Component {...pageProps} />
          )}
          <Toaster />
        </UserProvider>
      </ThemeProvider>
    </ErrorBoundary>
  );
}