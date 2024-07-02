import { QueryClient, QueryClientProvider } from 'react-query';
import { useState } from 'react';
import "@/styles/globals.css";
import '@/styles/common/mainsection1.css';
import { authStore } from '../stores/authStore';
import { Provider } from 'mobx-react';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function App({ Component, pageProps }) {
  const [queryClient] = useState(() => new QueryClient());

  return (
    <QueryClientProvider client={queryClient}>
      <Provider authStore={authStore}>
        <Component {...pageProps} />
        <ToastContainer /> {/* ToastContainer를 추가하여 알림을 표시 */}
      </Provider>
    </QueryClientProvider>
  );
}
