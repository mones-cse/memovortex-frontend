import axios from "axios";
import type { TCreateDocument } from "../types/document.type";
import { axiosInstance } from "../utils/axiosConfig";

const API_URL = import.meta.env.VITE_API_URL;

export const fetchDocuments = async () => {
	const result = await axiosInstance.get(`${API_URL}/v1/documents`);
	return result.data;
};

export const generateS3UploadUrl = async (data: {
	fileName: string;
	fileType: string;
}) => {
	const { fileName, fileType } = data;
	const response = await axiosInstance.post(
		`${API_URL}/v1/documents/generate-s3-upload-url`,
		{
			fileName,
			fileType,
		},
	);
	return response.data;
};

export const uploadFileToS3 = async (data: {
	url: string;
	file: File;
}) => {
	const { url, file } = data;
	return axios.put(url, file, {
		headers: {
			"Content-Type": file.type,
		},
	});
};

export const createDocument = async (data: TCreateDocument) => {
	const response = await axiosInstance.post(`${API_URL}/v1/documents`, data);
	return response.data;
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
