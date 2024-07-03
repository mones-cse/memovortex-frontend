import axios from "axios";
import type { UpdateUserInfo } from "../types/user.type";
import { axiosInstance } from "../utils/axiosConfig";

const API_URL = import.meta.env.VITE_API_URL;
export const updateAccountInfo = async (data: UpdateUserInfo) => {
	try {
		const response = await axiosInstance.patch(
			`${API_URL}/v1/users/profile`,
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
