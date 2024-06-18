import { QueryClient, QueryClientProvider } from 'react-query';
import { useState } from 'react';
import "@/styles/globals.css";
import { authStore } from './stores/authStore';

export default function App({ Component, pageProps }) {
  const [queryClient] = useState(() => new QueryClient());
  return <QueryClientProvider client={queryClient}>
  <Component {...pageProps} authStore={authStore}/>
</QueryClientProvider>
}

