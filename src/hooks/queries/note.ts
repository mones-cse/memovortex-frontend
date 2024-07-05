import { useQuery } from "@tanstack/react-query";
import { fetchNotes } from "../../api/note";

export const useFetchNotesQuery = () => {
	return useQuery({
		queryKey: ["notes"],
		queryFn: fetchNotes,
	});
};
