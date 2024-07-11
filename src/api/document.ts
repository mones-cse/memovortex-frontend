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
		// 	onUploadProgress: (progressEvent) => {
		// 		const percentCompleted = Math.round(
		// 			(progressEvent.loaded * 100) / (progressEvent.total || 1),
		// 		);
		// 		setUploadProgress(percentCompleted);
		// 	},
	});
};

export const createDocument = async (data: TCreateDocument) => {
	const response = await axiosInstance.post(`${API_URL}/v1/documents`, data);
	return response.data;
};

export const useDocumentUpload = () => {};
