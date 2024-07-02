/** @type {import('tailwindcss').Config} */
export default {
	content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
	theme: {
		screens: {
			xs: "576px",
			// => @media (min-width: 576px) { ... }

			sm: "768px",
			// => @media (min-width: 768px) { ... }

			md: "992px",
			// => @media (min-width: 992px) { ... }

			lg: "1200px",
			// => @media (min-width: 1200x) { ... }

			xl: "1408px",
			// => @media (min-width: 1408px) { ... }

			"2xl": "1536px",
			// => @media (min-width: 1536px) { ... }
		},
	},
	plugins: [],
};
