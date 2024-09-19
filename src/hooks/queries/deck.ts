import { useQuery } from "@tanstack/react-query";
import { fetchDecks } from "../../api/deck";

export const useFetchDecksQuery = () => {
	return useQuery({
		queryKey: ["decks"],
		queryFn: fetchDecks,
	});
};
