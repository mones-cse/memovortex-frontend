import { useQuery } from "@tanstack/react-query";
import type { QueryFunctionContext } from "@tanstack/react-query";
import {
	fetchDocumentSignedUrl,
	fetchDocuments,
	fetchDocumentsById,
} from "../../api/document";

export const useFetchDocumentQuery = () => {
	return useQuery({
		queryKey: ["documents"],
		queryFn: fetchDocuments,
	});
};

export const useFetchDocumentByIdQuery = (id: string) => {
	return useQuery({
		queryKey: ["documents", id],
		queryFn: (context: QueryFunctionContext) =>
			fetchDocumentsById(context.queryKey[1] as string),
	});
};

export const useFetchDocumentSignedUrlQuery = (id: string) => {
	return useQuery({
		queryKey: ["documents", id, "signedUrl"],
		queryFn: (context: QueryFunctionContext) =>
			fetchDocumentSignedUrl(context.queryKey[1] as string),
	});
};
