// import axios from "axios";
import { useState } from "react";
import type { ChangeEventHandler } from "react";
import { uploadFileToS3 } from "../api/document";
// import { axiosInstance } from "../utils/axiosConfig";
import {
	useCreateDocumentMutation,
	useGenerateS3UploadUrlMutation,
} from "../hooks/mutations/document";
import { MainContainer } from "../ui/MainContainer";

// import type { FileWithPath } from "@mantine/dropzone";
// import { IMAGE_MIME_TYPE, Dropzone } from "@mantine/dropzone";

// import { Text, Image, SimpleGrid } from "@mantine/core";

// const UploadProgressBar = ({ progress }: { progress: number }) => {
// 	return (
// 		<div
// 			style={{ width: "100%", backgroundColor: "#e0e0e0", borderRadius: "5px" }}
// 		>
// 			<div
// 				style={{
// 					width: `${progress}%`,
// 					backgroundColor: "#4CAF50",
// 					height: "20px",
// 					borderRadius: "5px",
// 					textAlign: "center",
// 					lineHeight: "20px",
// 					color: "white",
// 				}}
// 			>
// 				{progress}%
// 			</div>
// 		</div>
// 	);
// };

// const BaseDemo = () => {
// 	const [files, setFiles] = useState<FileWithPath[]>([]);

// 	const previews = files.map((file) => {
// 		const imageUrl = URL.createObjectURL(file);
// 		return (
// 			<Image
// 				key={file.name}
// 				src={imageUrl}
// 				onLoad={() => URL.revokeObjectURL(imageUrl)}
// 			/>
// 		);
// 	});

// 	return (
// 		<div>
// 			<Dropzone accept={IMAGE_MIME_TYPE} onDrop={setFiles}>
// 				<SimpleGrid
// 					cols={{ base: 1, sm: 4 }}
// 					mt={previews.length > 0 ? "xl" : 0}
// 				>
// 					{previews}
// 				</SimpleGrid>
// 				<Text ta="center">Drop images here</Text>
// 			</Dropzone>
// 		</div>
// 	);
// };

const Documents = () => {
	const [file, setFile] = useState({ name: "", type: "", size: 0 });
	const { mutateAsync: generateS3UploadUrlMutate } =
		useGenerateS3UploadUrlMutation();

	const { mutateAsync: creatDocumentMutate } = useCreateDocumentMutation();

	// const { mutateAsync: uploadFileToS3Mutate } = uploadFileToS3;
	// const [uploadProgress, setUploadProgress] = useState(0);

	const handleFileChange: ChangeEventHandler<HTMLInputElement> = (e) => {
		if (e.target.files && e.target.files.length > 0) {
			setFile(e.target.files[0]);
		}
	};

	const handleUpload = async () => {
		console.log("handle Upload called", file);
		if (!file) return;

		try {
			generateS3UploadUrlMutate({
				fileName: file.name,
				fileType: file.type,
			})
				.then((res) => {
					console.log("⚡️ url has been generated", res.data.url);
					return uploadFileToS3({ url: res.data.url, file: file as File });
				})
				.then(() => {
					console.log("⚡️ file has been uploaded in s3");
					const fileType = file.name.split(".").pop();
					const fileSize = BigInt(file.size);
					const data = {
						fileName: file.name,
						fileType: fileType || "uncategorized",
						mimeType: file.type,
						fileSize: fileSize,
						fileS3key: file.name,
						category: "file",
						parentId: null,
						isDirectory: false,
					};
					return creatDocumentMutate(data);
				})
				.then((res) => {
					console.log("⚡️ File uploaded successfully🔥", res);
				})
				.catch((err) => {
					console.log("Error uploading file", err);
				});

			// Request pre-signed URL from backend
			// const response = await axiosInstance.post("/v1/photos/get-upload-url", {
			// 	fileName: file.name,
			// 	fileType: file.type,
			// });
			// console.log("RESPONSE", response);
			// const { url } = response.data;
			// console.log("URL", url);

			// // Upload file directly to S3
			// await axios.put(url, file, {
			// 	headers: {
			// 		"Content-Type": file.type,
			// 	},
			// 	onUploadProgress: (progressEvent) => {
			// 		const percentCompleted = Math.round(
			// 			(progressEvent.loaded * 100) / (progressEvent.total || 1),
			// 		);
			// 		setUploadProgress(percentCompleted);
			// 	},
			// });

			// Notify backend of successful upload
			// await axiosInstance.post("/upload-complete", {
			// 	fileName: file.name,
			// });
		} catch (error) {
			console.error("Upload failed", error);
		}
	};
	return (
		<MainContainer withSpace>
			<p>Photos Page</p>
			<input type="file" onChange={handleFileChange} />
			<button
				type="button"
				onClick={handleUpload}
				className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
			>
				Upload
			</button>
			{/* {uploadProgress > 0 && <UploadProgressBar progress={uploadProgress} />} */}
			<br />

			{/* <BaseDemo /> */}
		</MainContainer>
	);
};

export default Documents;
