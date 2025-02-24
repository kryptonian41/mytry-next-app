import Router from "next/router";
import type { AppProps } from "next/app";
import "node_modules/nprogress/nprogress.css";
import NProgress from "nprogress";
import { QueryClient, QueryClientProvider } from "react-query";
import { Provider } from "react-redux";
import { type AppStore, makeStore } from "../redux-state/store";
import "styles/globals.css";
import { useRef } from "react";

NProgress.configure({
	minimum: 0.3,
	easing: "ease",
	speed: 800,
	showSpinner: false,
});

Router.events.on("routeChangeStart", () => {
	NProgress.start();
});

Router.events.on("routeChangeComplete", (url) => {
	NProgress.done();
});

Router.events.on("routeChangeError", () => NProgress.done());

export const reactQueryClient = new QueryClient();

export default function App({ Component, pageProps }: AppProps) {
	const storeRef = useRef<AppStore>(undefined);
	if (!storeRef.current) {
		// Create the store instance the first time this renders
		storeRef.current = makeStore();
	}

	return (
		<QueryClientProvider client={reactQueryClient}>
			<Provider store={storeRef.current}>
				<Component {...pageProps} />
			</Provider>
		</QueryClientProvider>
	);
}
