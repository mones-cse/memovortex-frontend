import { Progress } from "@mantine/core";
import { useState } from "react";
import type { ChangeEventHandler } from "react";
import { useDocumentUpload } from "../hooks/mutations/document";
import { MainContainer } from "../ui/MainContainer";

// import type { FileWithPath } from "@mantine/dropzone";
// import { IMAGE_MIME_TYPE, Dropzone } from "@mantine/dropzone";

// import { Text, Image, SimpleGrid } from "@mantine/core";

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
	const { uploadDocument, uploadProgress } = useDocumentUpload();

	const handleFileChange: ChangeEventHandler<HTMLInputElement> = (e) => {
		if (e.target.files && e.target.files.length > 0) {
			setFile(e.target.files[0]);
		}
	};

	const handleUpload = async () => {
		if (!file) return;
		const result = await uploadDocument(file as File);
		console.log(result);
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
			{uploadProgress > 0 && <Progress value={uploadProgress} />}
			<br />

			{/* <BaseDemo /> */}
		</MainContainer>
	);
};

export default Documents;
