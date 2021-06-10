import { QueryClientProvider, QueryClient } from "react-query";
import { Provider } from "react-redux";
import store from "../store";
import "../styles/globals.css";

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
