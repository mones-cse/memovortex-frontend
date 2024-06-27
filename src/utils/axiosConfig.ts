import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL;

export const axiosInstance = axios.create({
	baseURL: API_URL,
});

axiosInstance.interceptors.request.use(
	(config) => {
		const token = localStorage.getItem("token");
		if (token) {
			config.headers.Authorization = `${token}`;
		}
		return config;
	},
	(error) => {
		return Promise.reject(error);
	},
);