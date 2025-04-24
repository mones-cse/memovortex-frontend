import { useQuery } from "@tanstack/react-query";
import type { QueryFunctionContext } from "@tanstack/react-query";
import { fetchCards, fetchStudyCards } from "../../api/card";

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
