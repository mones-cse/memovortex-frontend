import { z } from "zod";

export const noteCreateSchema = z.object({
	noteTitle: z
		.string()
		.min(3, { message: "Note title must be at least 3 characters" })
		.max(30, { message: "Note title must be at most 30 characters" }),
	noteContent: z
		.string()
		.min(5, { message: "Note Contetnt must be at least 5 characters" })
		.max(1000, { message: "Note Contetnt must be at most 1000 characters" }),
	isNoteFavourite: z.boolean(),
	noteBgColor: z.string().max(7, { message: "Color must be a valid hex code" }),
});
