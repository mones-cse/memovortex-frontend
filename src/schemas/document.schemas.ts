import { z } from "zod";

export const folderCreateSchema = z.object({
	folderName: z
		.string()
		.min(3, { message: "Folder Nmae must be at least 3 characters" })
		.max(30, { message: "Folder Nmae must be at most 30 characters" }),
});
