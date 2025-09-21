import { BrowserRouter } from "react-router-dom";
import "./App.css";
import { Router } from "./router";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useEffect } from "react";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

const queryClient = new QueryClient();

export const App = () => {
  useEffect(() => {
    queryClient.setDefaultOptions({
      queries: {
        retry: 0,
        gcTime: 1000 * 60 * 5, // 5 minute
        staleTime: 1000 * 60 * 5, // 5 minute,
        refetchOnWindowFocus: false,
        refetchOnMount: false,
      },
    });
  }, []);

  return (
    <>
      <QueryClientProvider client={queryClient}>
        <ReactQueryDevtools initialIsOpen={false} />
        <BrowserRouter>
          <Router />
        </BrowserRouter>
      </QueryClientProvider>
    </>
  );
};
