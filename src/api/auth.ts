import axios from "axios";
import { axiosInstance } from "../utils/axiosConfig";

const API_URL = import.meta.env.VITE_API_URL;
import type {
	LoginCredentials,
	RegistrationCredentials,
	TChangePassword,
} from "../types/auth.type";

export const registrationFunction = async (
	credentials: RegistrationCredentials,
) => {
	const response = await axiosInstance.post(
		`${API_URL}/v1/auth/register`,
		credentials,
	);
	return response.data;
};

export const loginFunction = async (credentials: LoginCredentials) => {
	const response = await axiosInstance.post(
		`${API_URL}/v1/auth/login`,
		credentials,
	);
	return response.data;
};

export const newAccessTokenByRefreshToken = async (refreshToken: string) => {
	try {
		const response = await axiosInstance.post(
			`${API_URL}/v1/auth/refresh-token`,
			{ refresh_token: refreshToken },
		);
		return response;
	} catch (error) {
		if (axios.isAxiosError(error) && error.response) {
			console.log(
				"🚀 ~ newAccessTokenByRefreshToken ~ error.response):",
				error.response.data.message,
			);
			throw new Error(
				error.response.data.message || "An error occurred during token refresh",
			);
		}
		throw new Error("An error occurred during token refresh");
	}
};

export const changePassword = async (data: TChangePassword) => {
	try {
		const response = await axiosInstance.post(
			`${API_URL}/v1/auth/change-password`,
			data,
		);
		return response;
	} catch (error) {
		if (axios.isAxiosError(error) && error.response) {
			console.log(error.response.data.message);
			throw new Error(
				error.response.data.message ||
					"An error occurred during change password",
			);
		}
		throw new Error("An error occurred during change password");
	}
};
