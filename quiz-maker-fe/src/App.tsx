import { useState } from "react";
import { CssBaseline, ThemeProvider } from "@mui/material";
import {
  MutationCache,
  QueryCache,
  QueryClient,
  QueryClientProvider,
} from "@tanstack/react-query";
import { BrowserRouter, Route, Routes } from "react-router";
import Layout from "@/components/Layout";
import SnackbarAlert from "@/components/SnackbarAlert";
import { theme } from "@/theme";
import routes from "@/routes";
import type { ApiError } from "@/api/client";

function App() {
  const [error, setError] = useState<string | null>(null);

  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        retry: 1,
      },
      mutations: {
        retry: 1,
      },
    },
    queryCache: new QueryCache({
      onError: (error) =>
        setError(
          (error as unknown as ApiError).error ?? "Something went wrong.",
        ),
    }),
    mutationCache: new MutationCache({
      onError: (error) =>
        setError(
          (error as unknown as ApiError).error ?? "Something went wrong.",
        ),
    }),
  });

  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <BrowserRouter>
          <Layout>
            <Routes>
              {routes.map((route) => (
                <Route key={route.path} {...route} />
              ))}
            </Routes>
          </Layout>
        </BrowserRouter>
        <SnackbarAlert message={error} onClose={() => setError(null)} />
      </ThemeProvider>
    </QueryClientProvider>
  );
}

export default App;
