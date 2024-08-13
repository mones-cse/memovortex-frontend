import { useFetchDocumentSignedUrlQuery } from "../../hooks/queries/document";
import type { ModalProps } from "../../types/modal.type";

export const DocumentPreviewModal = ({
	documentUrl,
}: ModalProps["documentPreview"]) => {
	console.log("🚀 ~ documentUrl:", documentUrl);

	const { data, isLoading } = useFetchDocumentSignedUrlQuery(documentUrl);
	if (isLoading) return <div>Loading...</div>;
	return (
		<div className="py-4">
			<div className="flex justify-center items-center h-[70vh]">
				<img src={data.data.url} alt={"car"} width={"auto"} />
			</div>
		</div>
	);
};
