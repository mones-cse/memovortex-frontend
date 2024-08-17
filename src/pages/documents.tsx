import { Anchor, Breadcrumbs, Button, Menu, Text } from "@mantine/core";
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
	useFetchParentByIdQuery,
} from "../hooks/queries/document";

import { useDuplicateDocumentMutation } from "../hooks/mutations/document";

import { toast } from "react-toastify";
import { fetchDocumentSignedUrl } from "../api/document";
import { userStore } from "../stores/store";
import type { TDisplayDocument } from "../types/document.type";
import { MainContainer } from "../ui/MainContainer";

const BreadCrumb = ({ documentId }: { documentId: string }) => {
	const { data, isLoading } = useFetchParentByIdQuery(documentId);
	if (isLoading) {
		return <p>Loading...</p>;
	}
	const isHigHhierarchy = data.data.length > 3;
	const breadItems = [];
	const breadItemsData = data?.data;
	breadItems.push(
		<Anchor href={"/documents"} key={"home"}>
			{"Documents"}
		</Anchor>,
	);

	for (const element of breadItemsData) {
		breadItems.push(
			<Anchor href={element.id} key={element.fileName}>
				{element.fileName}
			</Anchor>,
		);
	}
	if (isHigHhierarchy) {
		breadItems.splice(
			1,
			1,
			<Anchor
				href={"#"}
				key={"..."}
				c={"black"}
				styles={{
					root: {
						cursor: "default",
						pointerEvents: "none",
					},
				}}
			>
				{"..."}
			</Anchor>,
		);
	}

	return (
		<>
			{
				<Breadcrumbs separator=">" mt="xs">
					{breadItems}
				</Breadcrumbs>
			}
		</>
	);
};

const DisplayDocument = (documentItem: TDisplayDocument) => {
	const store = userStore();
	const { mutateAsync } = useDuplicateDocumentMutation();
	const [selectedDocument, setSelectedDocument] =
		useState<TDisplayDocument | null>(null);

	const navigate = useNavigate();
	const handleDoubleClick = (document: TDisplayDocument) => {
		if (document.isDirectory) {
			navigate(`/folder/${document.id}`);
			return;
		}
		store.openModal(
			"documentPreview",
			"New Note",
			{ documentUrl: document.fileS3key || "ai.jpg" },
			"xl",
		);
		setSelectedDocument(document);
	};
	const handleOptionClick = (document: TDisplayDocument) => {
		setSelectedDocument(document);
	};

	const MenuDropDown = () => {
		const store = userStore();

		const handleTrashClick = (id: string) => {
			store.openModal("deleteDocument", "Delete Document", { id: id }, "sm");
		};

		const handleDownloadClick = async (fileS3key: string) => {
			try {
				const data = await fetchDocumentSignedUrl(fileS3key);
				if (data.success) {
					const signedUrl = data.data.url;

					// Fetch the file content
					const response = await fetch(signedUrl);
					const blob = await response.blob();

					// Create a blob URL
					const blobUrl = window.URL.createObjectURL(blob);

					// Create a temporary anchor element
					const link = document.createElement("a");
					link.href = blobUrl;

					// Set the download attribute with the filename
					link.download = selectedDocument?.fileName || "download";

					// Append to the body, click, and remove
					document.body.appendChild(link);
					link.click();
					document.body.removeChild(link);

					// Revoke the blob URL
					window.URL.revokeObjectURL(blobUrl);

					toast.success("Download Completed");
				} else {
					toast.error("Failed to get download URL");
				}
			} catch (e) {
				toast.error("Failed to download file");
			}
		};

		const handleRenameClick = () => {
			store.openModal(
				"renameDocument",
				"Rename",
				{
					id: selectedDocument?.id || "",
					fileName: selectedDocument?.fileName || "",
				},
				"sm",
			);
		};

		const handleDuplicateDocument = async () => {
			await mutateAsync(selectedDocument?.id || "");
		};

		return (
			<Menu.Dropdown>
				<Menu.Label>Options</Menu.Label>
				{!selectedDocument?.isDirectory && (
					<>
						<Menu.Item
							leftSection={<FaDownload />}
							onClick={() => handleDownloadClick(documentItem.fileS3key || "")}
						>
							Download
						</Menu.Item>
						<Menu.Item
							leftSection={<FaCopy />}
							onClick={handleDuplicateDocument}
						>
							Copy File
						</Menu.Item>
					</>
				)}

				<Menu.Item
					leftSection={<FaRegTrashCan />}
					onClick={() => handleTrashClick(documentItem.id)}
				>
					Delete
				</Menu.Item>
				<Menu.Item leftSection={<FaFilePen />} onClick={handleRenameClick}>
					Rename
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
				handleDoubleClick(documentItem);
			}}
		>
			{documentItem.isDirectory ? (
				<FaFolderOpen size={"24"} />
			) : (
				<FaFileImage size={"20"} />
			)}
			<p className="line-clamp-1 text-sm w-full">{documentItem.fileName}</p>

			<Menu>
				<Menu.Target>
					<button type="button" onClick={() => handleOptionClick(documentItem)}>
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
						{!id && (
							<Text c={"blue.6"} mt="xs">
								Documents
							</Text>
						)}
						{id && <BreadCrumb documentId={id} />}
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

// todo show thumbnail for images
