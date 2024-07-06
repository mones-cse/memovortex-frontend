import axios from "axios";
import type { TCreateNote, TUpdateNote } from "../types/note.type";
import { axiosInstance } from "../utils/axiosConfig";

const API_URL = import.meta.env.VITE_API_URL;

export const fetchNotes = async () => {
	const result = await axiosInstance.get(`${API_URL}/v1/notes`);
	return result.data;
};

export const createNotes = async (data: TCreateNote) => {
	try {
		const response = await axiosInstance.post(`${API_URL}/v1/notes`, data);
		return response;
	} catch (error) {
		if (axios.isAxiosError(error) && error.response) {
			console.log(error.response.data.message);
			throw new Error(
				error.response.data.message || "An error occurred during creating note",
			);
		}
		throw new Error("An error occurred during creating note");
	}
};

export const updateNotes = async (data: TUpdateNote) => {
	const response = await axiosInstance.patch(
		`${API_URL}/v1/notes/${data.id}`,
		data,
	);
	return response.data;
};

export const deleteNote = async (noteId: string) => {
	try {
		const response = await axiosInstance.delete(
			`${API_URL}/v1/notes/${noteId}`,
		);
		return response;
	} catch (error) {
		if (axios.isAxiosError(error) && error.response) {
			console.log(error.response.data.message);
			throw new Error(
				error.response.data.message || "An error occurred during deleting note",
			);
		}
		throw new Error("An error occurred during deleting note");
	}
};
