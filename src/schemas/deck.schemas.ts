import { z } from "zod";

export const deckCreateSchema = z.object({
	deckTitle: z
		.string()
		.min(3, { message: "Deck title must be at least 3 characters" })
		.max(30, { message: "Deck title must be at most 30 characters" }),
	deckDescription: z
		.string()
		.min(5, { message: "Deck description must be at least 5 characters" })
		.max(1000, { message: "Deck description must be at most 1000 characters" }),
});
