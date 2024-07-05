import axios from "axios";
import type { TNote } from "../types/note.type";
import { axiosInstance } from "../utils/axiosConfig";

const API_URL = import.meta.env.VITE_API_URL;
export const fetchNotes = async () => {
	try {
		const response = await axiosInstance.get(`${API_URL}/v1/notes`);
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

// export const getNotes = async (data: TNote) => {
// 	try {
// 		const response = await axiosInstance.get(
// 			`${API_URL}/v1/notes`,
// 			data,
// 		);
// 		return response;
// 	} catch (error) {
// 		if (axios.isAxiosError(error) && error.response) {
// 			console.log(error.response.data.message);
// 			throw new Error(
// 				error.response.data.message ||
// 					"An error occurred during change password",
// 			);
// 		}
// 		throw new Error("An error occurred during change password");
// 	}
// };
