import { Button, Menu } from "@mantine/core";
import { useState } from "react";
import {
	FaCopy,
	FaDownload,
	FaFileExport,
	FaFileImage,
	FaFilePen,
	FaFolderOpen,
	FaRegTrashCan,
} from "react-icons/fa6";
import { SlOptionsVertical } from "react-icons/sl";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import {
	useFetchDocumentByIdQuery,
	useFetchDocumentQuery,
} from "../hooks/queries/document";
import { userStore } from "../stores/store";
import type { TDisplayDocument } from "../types/document.type";
import { MainContainer } from "../ui/MainContainer";

const DisplayDocument = (document: TDisplayDocument) => {
	const [selectedDocument, setSelectedDocument] =
		useState<TDisplayDocument | null>(null);

	const navigate = useNavigate();
	const handleDoubleClick = (document: TDisplayDocument) => {
		// if folder redirect to the folder
		if (document.isDirectory) {
			navigate(`/folder/${document.id}`);
			console.log("Double Clicked", document.id, document.fileName);
			return;
		}
		// if file open the file
		navigate(`/folder/${document.id}`);
		console.log("Double Clicked", document.id, document.fileName);
		setSelectedDocument(document);
	};
	const handleOptionClick = (document: TDisplayDocument) => {
		console.log("Option Clicked", document.id, document.fileName);
		setSelectedDocument(document);
	};

	const MenuDropDown = () => {
		const store = userStore();

		const handleTrashClick = (id: string) => {
			store.openModal("deleteDocument", "Delete Document", { id: id }, "sm");
		};

		return (
			<Menu.Dropdown>
				<Menu.Label>Options</Menu.Label>
				{!selectedDocument?.isDirectory && (
					<Menu.Item leftSection={<FaDownload />}>Download</Menu.Item>
				)}

				<Menu.Item
					leftSection={<FaRegTrashCan />}
					onClick={() => handleTrashClick(document.id)}
				>
					Delete
				</Menu.Item>
				<Menu.Item
					leftSection={<FaFilePen />}
					onClick={() => console.log("rename file")}
				>
					Rename
				</Menu.Item>
				<Menu.Item
					leftSection={<FaCopy />}
					onClick={() => console.log("copy file")}
				>
					Copy File
				</Menu.Item>
				<Menu.Item
					leftSection={<FaFileExport />}
					onClick={() => console.log("copy file")}
				>
					Move File
				</Menu.Item>
			</Menu.Dropdown>
		);
	};

	return (
		<div
			className="bg-slate-50 flex justify-end items-center py-2 px-4 gap-2 cursor-pointer"
			onDoubleClick={() => {
				handleDoubleClick(document);
			}}
		>
			{document.isDirectory ? (
				<FaFolderOpen size={"24"} />
			) : (
				<FaFileImage size={"20"} />
			)}
			<p className="line-clamp-1 text-sm w-full">{document.fileName}</p>

			<Menu>
				<Menu.Target>
					<button type="button" onClick={() => handleOptionClick(document)}>
						<SlOptionsVertical color="black" />
					</button>
				</Menu.Target>
				<MenuDropDown />
			</Menu>
		</div>
	);
};

const useFetchDocument = (parentId?: string | null) => {
	const documentByIdQuery = useFetchDocumentByIdQuery(parentId || "");
	const documentsQuery = useFetchDocumentQuery();

	return parentId ? documentByIdQuery : documentsQuery;
};

const DisplayDocuments = ({ parentId }: { parentId: string | null }) => {
	console.log("🚀 ~ DisplayDocuments ~ parentId:", parentId);

	const { data, isLoading } = useFetchDocument(parentId);
	if (isLoading) {
		return <p>Loading...</p>;
	}
	return (
		<div className="grid grig-cols-1 sm:grid-cols-3 md:grid-cols-4 xl:grid-cols-6  gap-y-4 gap-x-6">
			{data?.data?.map((document: TDisplayDocument) => (
				<DisplayDocument key={document.id} {...document} />
			))}
		</div>
	);
};

const CreateDocument = ({ parentId }: { parentId: string | null }) => {
	console.log("🚀 ~ CreateDocument ~ parentId:", parentId);

	const store = userStore();
	const handleCreateFolder = () => {
		store.openModal(
			"createFolder",
			"Create Folder",
			{ parentId: parentId },
			"sm",
		);
	};

	const handleUploadFile = () => {
		console.log("Upload File");
		store.openModal("filesUpload", "Upload File", { parentId: parentId }, "sm");
	};

	return (
		<Menu>
			<Menu.Target>
				<Button variant="light" color="blue">
					+ New
				</Button>
			</Menu.Target>
			<Menu.Dropdown>
				<Menu.Label>Options</Menu.Label>
				<Menu.Item leftSection={<FaFolderOpen />} onClick={handleCreateFolder}>
					New Folder
				</Menu.Item>
				<Menu.Item leftSection={<FaFileImage />} onClick={handleUploadFile}>
					Upload File
				</Menu.Item>
			</Menu.Dropdown>
		</Menu>
	);
};

const Documents = () => {
	const { id } = useParams();
	return (
		<MainContainer withSpace>
			<div className="flex flex-col gap=1">
				<div className="flex justify-between w-full">
					<div>
						<p className="text-3xl font-bold">Tttle</p>
					</div>
					<CreateDocument parentId={id || null} />
				</div>
				<br />
				<DisplayDocuments parentId={id || null} />
			</div>
		</MainContainer>
	);
};

export default Documents;
