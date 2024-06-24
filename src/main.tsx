import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import "@mantine/core/styles.css";

import { MantineProvider } from "@mantine/core";
import { BrowserRouter as Router } from "react-router-dom";

const rootElement = document.getElementById("root");

if (rootElement) {
	ReactDOM.createRoot(rootElement).render(
		<React.StrictMode>
			<MantineProvider>
				<Router>
					<App />
				</Router>
			</MantineProvider>
		</React.StrictMode>,
	);
} else {
	console.error("Failed to find the root element");
}
