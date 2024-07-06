import { z } from "zod";

export const registrationSchema = z
	.object({
		email: z.string().email({ message: "Invalid email" }),
		fullName: z
			.string()
			.min(3, { message: "Full name must be at least 3 characters" }),
		password: z
			.string()
			.min(5, { message: "Password must be at least 5 characters" })
			.max(20, { message: "Password must be at most 20 characters" }),
		confirmPassword: z.string(),
		termsOfService: z.literal(true, {
			message: "You must agree to terms of service",
		}),
	})
	.refine((data) => data.password === data.confirmPassword, {
		message: "Passwords do not match",
		path: ["confirmPassword"],
	});
