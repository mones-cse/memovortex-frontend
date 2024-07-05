import { format, parseISO } from "date-fns";

export function formatDate(dateString: string) {
	const date = parseISO(dateString);
	// return format(date, "MMMM d, yyyy, h:mm a");
	return format(date, "MMMM d, yyyy");
}
