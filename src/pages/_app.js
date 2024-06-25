import { QueryClient, QueryClientProvider } from 'react-query';
import { useState } from 'react';
import "@/styles/globals.css";
import '@/styles/common/mainsection1.css';
import { authStore } from './stores/authStore';
import { Provider } from 'mobx-react';

export default function App({ Component, pageProps }) {
  const [queryClient] = useState(() => new QueryClient());
  
  return (
  <QueryClientProvider client={queryClient}>
    <Provider authStore={authStore}>
      <Component {...pageProps} />
    </Provider>
  </QueryClientProvider>
  );
}

