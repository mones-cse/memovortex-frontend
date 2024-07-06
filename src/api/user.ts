import type { UpdateUserInfo } from "../types/user.type";
import { axiosInstance } from "../utils/axiosConfig";

const API_URL = import.meta.env.VITE_API_URL;
export const updateAccountInfo = async (data: UpdateUserInfo) => {
	const response = await axiosInstance.patch(
		`${API_URL}/v1/users/profile`,
		data,
	);
	return response.data;
};
