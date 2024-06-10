import { QueryClient, QueryClientProvider } from 'react-query';
import { useState } from 'react';
import "@/styles/globals.css";

export default function App({ Component, pageProps }) {
  const [queryClient] = useState(() => new QueryClient());
  return <QueryClientProvider client={queryClient}>
  <Component {...pageProps} />
</QueryClientProvider>
}

