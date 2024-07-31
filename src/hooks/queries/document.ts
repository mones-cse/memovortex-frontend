import { useQuery } from "@tanstack/react-query";
import type { QueryFunctionContext } from "@tanstack/react-query";
import { fetchDocuments, fetchDocumentsById } from "../../api/document";

export const useFetchDocumentQuery = () => {
	return useQuery({
		queryKey: ["notes"],
		queryFn: fetchDocuments,
	});
};

export const useFetchDocumentByIdQuery = (id: string) => {
	return useQuery({
		queryKey: ["notes", id],
		queryFn: (context: QueryFunctionContext) =>
			fetchDocumentsById(context.queryKey[1] as string),
	});
};
