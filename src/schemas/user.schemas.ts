import { z } from "zod";

export const accountInfoSchema = z.object({
	fullName: z.string().min(3, "Full Name must be at least 3 characters long"),
});
