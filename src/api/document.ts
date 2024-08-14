import axios from "axios";
import type { AxiosProgressEvent } from "axios";
import type { TCreateDocument } from "../types/document.type";
import type { TRenameDocument } from "../types/document.type";
import { axiosInstance } from "../utils/axiosConfig";

const API_URL = import.meta.env.VITE_API_URL;

export const fetchDocuments = async () => {
	const result = await axiosInstance.get(`${API_URL}/v1/documents`);
	return result.data;
};

export const fetchDocumentsById = async (id: string) => {
	const result = await axiosInstance.get(`${API_URL}/v1/documents/${id}`);
	return result.data;
};

export const fetchDocumentSignedUrl = async (s3Key: string) => {
	const result = await axiosInstance.get(
		`${API_URL}/v1/documents/get-signed-document/${s3Key}`,
	);
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

export const uploadFileToS3 = async ({
	url,
	file,
	onUploadProgress,
}: {
	url: string;
	file: File;
	onUploadProgress: (progressEvent: AxiosProgressEvent) => void;
}) => {
	console.log("🚀 ~ file:", file, url);
	return axios.put(url, file, {
		headers: {
			"Content-Type": file.type,
		},
		onUploadProgress,
	});
};

export const createDocument = async (data: TCreateDocument) => {
	const response = await axiosInstance.post(`${API_URL}/v1/documents`, data);
	return response.data;
};

export const createFolder = async ({
	folderName,
	parentId,
}: { folderName: string; parentId: string | null }) => {
	const data = {
		fileName: folderName,
		isDirectory: true,
		...(parentId && { parentId }),
	};
	const response = await axiosInstance.post(
		`${API_URL}/v1/documents/folder`,
		data,
	);
	return response.data;
};

export const deleteDocument = async (id: string) => {
	const response = await axiosInstance.delete(`${API_URL}/v1/documents/${id}`);
	return response.data;
};

export const renameDocument = async ({ id, fileName }: TRenameDocument) => {
	const response = await axiosInstance.patch(`${API_URL}/v1/documents/${id}`, {
		fileName,
	});
	return response.data;
};

export const duplicateDocument = async (id: string) => {
	const response = await axiosInstance.post(
		`${API_URL}/v1/documents/duplicate/${id}`,
	);
	return response.data;
};
