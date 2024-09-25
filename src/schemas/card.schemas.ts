import { z } from "zod";

export const cardCreateSchema = z.object({
	frontText: z
		.string()
		.min(3, { message: "Question must be at least 3 characters" })
		.max(30, { message: "Question must be at most 30 characters" }),
	backText: z
		.string()
		.min(5, { message: "Answer must be at least 5 characters" })
		.max(1000, { message: "Answer must be at most 1000 characters" }),
	cardType: z.enum(["BASIC", "MULTIPLE_CHOICE"]),
});
