import axios from "axios";
import { toast } from "react-toastify";

const API_URL = import.meta.env.VITE_API_URL;

export const axiosInstance = axios.create({
	baseURL: API_URL,
});

axiosInstance.interceptors.request.use(
	(config) => {
		const token = localStorage.getItem("access_token");
		if (token) {
			config.headers.Authorization = `Bearer ${token}`;
		}
		return config;
	},
	(error) => {
		return Promise.reject(error);
	},
);
axiosInstance.interceptors.response.use(
	(response) => response,
	(error) => {
		const message =
			error.response?.data?.message || error.message || "An error occurred";
		toast.error(message);
		throw error;
	},
);
