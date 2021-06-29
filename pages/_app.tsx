import Router from 'next/router';
import 'node_modules/nprogress/nprogress.css';
import NProgress from 'nprogress';
import { QueryClient, QueryClientProvider } from "react-query";
import { Provider } from "react-redux";
import store from "../store";
import "../styles/globals.css";

NProgress.configure({
  minimum: 0.3,
  easing: 'ease',
  speed: 800,
  showSpinner: false
})

Router.events.on('routeChangeStart', () => {
  NProgress.start()
})

Router.events.on('routeChangeComplete', url => {
  NProgress.done()
})

Router.events.on('routeChangeError', () => NProgress.done())

export const reactQueryClient = new QueryClient();

function MyApp({ Component, pageProps }) {
  return (
    <Provider store={store}>
      <QueryClientProvider client={reactQueryClient}>
        <Component {...pageProps} />
      </QueryClientProvider>
    </Provider>
  );
}

export default MyApp;
