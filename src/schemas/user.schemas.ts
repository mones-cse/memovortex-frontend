import { z } from "zod";

export const accountInfoSchema = z.object({
	fullName: z.string().min(3, "Full Name must be at least 3 characters long"),
});

export const userPasswordChange = z
	.object({
		currentPassword: z
			.string()
			.min(5, { message: "Password must be at least 5 characters" })
			.max(20, { message: "Password must be at most 20 characters" }),
		newPassword: z
			.string()
			.min(5, { message: "Password must be at least 5 characters" })
			.max(20, { message: "Password must be at most 20 characters" }),
		confirmNewPassword: z
			.string()
			.min(5, { message: "Password must be at least 5 characters" })
			.max(20, { message: "Password must be at most 20 characters" }),
	})
	.refine((data) => data.newPassword === data.confirmNewPassword, {
		message: "Passwords do not match",
		path: ["confirmNewPassword"],
	});
