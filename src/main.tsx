import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import "@mantine/core/styles.css";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

import { MantineProvider, createTheme } from "@mantine/core";
import { BrowserRouter as Router } from "react-router-dom";

const rootElement = document.getElementById("root");
const queryClient = new QueryClient();

const theme = createTheme({
	breakpoints: {
		xs: "36em", // 576px
		sm: "48em", // 768px
		md: "62em", // 992px
		lg: "75em", // 1200px
		xl: "88em", // 1408px
	},
});

if (rootElement) {
	ReactDOM.createRoot(rootElement).render(
		<React.StrictMode>
			<QueryClientProvider client={queryClient}>
				<MantineProvider theme={theme}>
					<Router>
						<App />
						<ReactQueryDevtools />
					</Router>
				</MantineProvider>
			</QueryClientProvider>
		</React.StrictMode>,
	);
} else {
	console.error("Failed to find the root element");
}
