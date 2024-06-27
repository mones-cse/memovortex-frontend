import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import "@mantine/core/styles.css";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import { MantineProvider } from "@mantine/core";
import { BrowserRouter as Router } from "react-router-dom";

const rootElement = document.getElementById("root");
const queryClient = new QueryClient();

if (rootElement) {
	ReactDOM.createRoot(rootElement).render(
		<React.StrictMode>
			<QueryClientProvider client={queryClient}>
				<MantineProvider>
					<Router>
						<App />
					</Router>
				</MantineProvider>
			</QueryClientProvider>
		</React.StrictMode>,
	);
} else {
	console.error("Failed to find the root element");
}
