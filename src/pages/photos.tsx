import axios from "axios";
import { useState } from "react";
import type { ChangeEventHandler } from "react";
import { MainContainer } from "../ui/MainContainer";
import { axiosInstance } from "../utils/axiosConfig";

const UploadProgressBar = ({ progress }: { progress: number }) => {
	return (
		<div
			style={{ width: "100%", backgroundColor: "#e0e0e0", borderRadius: "5px" }}
		>
			<div
				style={{
					width: `${progress}%`,
					backgroundColor: "#4CAF50",
					height: "20px",
					borderRadius: "5px",
					textAlign: "center",
					lineHeight: "20px",
					color: "white",
				}}
			>
				{progress}%
			</div>
		</div>
	);
};

const Photos = () => {
	const [file, setFile] = useState({
		name: "",
		type: "",
	});
	const [uploadProgress, setUploadProgress] = useState(0);

	const handleFileChange: ChangeEventHandler<HTMLInputElement> = (e) => {
		if (e.target.files && e.target.files.length > 0) {
			setFile(e.target.files[0]);
		}
	};

	const handleUpload = async () => {
		if (!file) return;

		try {
			// Request pre-signed URL from backend
			const response = await axiosInstance.post("/v1/photos/get-upload-url", {
				fileName: file.name,
				fileType: file.type,
			});
			console.log("RESPONSE", response);
			const { url } = response.data;
			console.log("URL", url);

			// Upload file directly to S3
			await axios.put(url, file, {
				headers: {
					"Content-Type": file.type,
				},
				onUploadProgress: (progressEvent) => {
					const percentCompleted = Math.round(
						(progressEvent.loaded * 100) / (progressEvent.total || 1),
					);
					setUploadProgress(percentCompleted);
				},
			});

			// Notify backend of successful upload
			// await axiosInstance.post("/upload-complete", {
			// 	fileName: file.name,
			// });

			console.log("File uploaded successfully");
		} catch (error) {
			console.error("Upload failed", error);
		}
	};
	return (
		<MainContainer withSpace>
			<p>Photos Page</p>
			<input type="file" onChange={handleFileChange} />
			<button type="button" onClick={handleUpload}>
				Upload
			</button>
			{uploadProgress > 0 && <UploadProgressBar progress={uploadProgress} />}
		</MainContainer>
	);
};

export default Photos;
