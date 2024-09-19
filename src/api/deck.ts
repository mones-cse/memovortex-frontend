import type { TCreateDeck } from "../types/deck.type";
import { axiosInstance } from "../utils/axiosConfig";

const API_URL = import.meta.env.VITE_API_URL;

export const createDeck = async (data: TCreateDeck) => {
	const response = await axiosInstance.post(`${API_URL}/v1/deck`, data);
	return response.data;
};

export const fetchDecks = async () => {
	const result = await axiosInstance.get(`${API_URL}/v1/deck`);
	return result.data;
};

// export const updateNotes = async (data: TUpdateNote) => {
// 	const response = await axiosInstance.patch(
// 		`${API_URL}/v1/notes/${data.id}`,
// 		data,
// 	);
// 	return response.data;
// };

// export const deleteNote = async (noteId: string) => {
// 	try {
// 		const response = await axiosInstance.delete(
// 			`${API_URL}/v1/notes/${noteId}`,
// 		);
// 		return response;
// 	} catch (error) {
// 		if (axios.isAxiosError(error) && error.response) {
// 			console.log(error.response.data.message);
// 			throw new Error(
// 				error.response.data.message || "An error occurred during deleting note",
// 			);
// 		}
// 		throw new Error("An error occurred during deleting note");
// 	}
// };
