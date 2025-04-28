import { useQuery } from "@tanstack/react-query";
import type { QueryFunctionContext } from "@tanstack/react-query";
import { fetchCards, fetchStudyCards } from "../../api/card";
import { fetchDocumentSignedUrl } from "../../api/document";

export const useFetchCardsQuery = (deckId: string) => {
	return useQuery({
		queryKey: ["cards", deckId],
		queryFn: (context: QueryFunctionContext) =>
			fetchCards(context.queryKey[1] as string),
	});
};

export const useFetchStudyCardsQuery = (deckId: string) => {
	return useQuery({
		queryKey: ["studyCards", deckId],
		queryFn: (context: QueryFunctionContext) =>
			fetchStudyCards(context.queryKey[1] as string),
	});
};

export const useFetchImageForCardWithSignedUrlQuery = (
	s3FileKeys: string[],
) => {
	return useQuery({
		queryKey: ["studyCardImages", s3FileKeys],
		queryFn: async (context: QueryFunctionContext) => {
			const results: string[] = [];
			const fileKeys = context.queryKey[1] as string[];

			if (fileKeys) {
				for (const fileKey of fileKeys) {
					const temp = await fetchDocumentSignedUrl(fileKey);
					results.push(temp);
				}
			}
			console.log("🧨🧨🧨", results);
			return results;
		},
	});
};
