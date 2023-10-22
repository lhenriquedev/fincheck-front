import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import { AuthProvider } from "./app/contexts/AuthContext";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { Router } from "./Router";
import { Toaster } from "react-hot-toast";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: false,
      refetchOnWindowFocus: false,
    },
  },
});

export const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <Router />
        <Toaster />
      </AuthProvider>

      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
};
