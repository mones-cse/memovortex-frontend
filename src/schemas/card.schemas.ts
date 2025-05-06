import { z } from "zod";

export const cardCreateSchema = z
	.object({
		frontText: z
			.string()
			.min(3, { message: "Question must be at least 3 characters" })
			.max(30, { message: "Question must be at most 30 characters" }),
		frontImage: z.optional(
			z.array(
				z.object({
					file: z.instanceof(File),
					preview: z.string(),
					id: z.string(),
				}),
			),
		),
		backText: z
			.string()
			// .min(5, { message: "Answer must be at least 5 characters" })
			// .max(1000, { message: "Answer must be at most 1000 characters" })
			.optional()
			.or(z.literal("")), // Allow empty string or undefined
		backImage: z.optional(
			z.array(
				z.object({
					file: z.instanceof(File),
					preview: z.string(),
					id: z.string(),
				}),
			),
		),
		cardType: z.enum(["BASIC", "MULTIPLE_CHOICE"]),
		multipleChoiceOptions: z.array(
			z.object({
				text: z.string(),
				isCorrect: z.boolean(),
			}),
		),
	})
	.superRefine((data, ctx) => {
		// If it's a BASIC card, ensure backText is provided and meets requirements
		if (data.cardType === "BASIC") {
			if (!data.backText || data.backText.trim() === "") {
				ctx.addIssue({
					code: z.ZodIssueCode.custom,
					message: "Answer is required for basic cards",
					path: ["backText"],
				});
			} else if (data.backText.length < 5) {
				ctx.addIssue({
					code: z.ZodIssueCode.too_small,
					minimum: 5,
					type: "string",
					inclusive: true,
					message: "Answer must be at least 5 characters",
					path: ["backText"],
				});
			} else if (data.backText.length > 1000) {
				ctx.addIssue({
					code: z.ZodIssueCode.too_big,
					maximum: 1000,
					type: "string",
					inclusive: true,
					message: "Answer must be at most 1000 characters",
					path: ["backText"],
				});
			}
		}

		// If it's a MULTIPLE_CHOICE card, ensure at least one option is correct
		// and all options have text
		if (data.cardType === "MULTIPLE_CHOICE") {
			const hasCorrectOption = data.multipleChoiceOptions.some(
				(opt) => opt.isCorrect,
			);
			const allOptionsHaveText = data.multipleChoiceOptions.every(
				(opt) => opt.text.trim() !== "",
			);

			if (!hasCorrectOption || !allOptionsHaveText) {
				ctx.addIssue({
					code: z.ZodIssueCode.custom,
					message:
						"Multiple choice cards must have at least one correct option and all options must have text",
					path: ["multipleChoiceOptions"],
				});
			}
		}
	});

export const cardUpdateSchema = z
	.object({
		frontText: z
			.string()
			.min(3, { message: "Question must be at least 3 characters" })
			.max(30, { message: "Question must be at most 30 characters" }),
		backText: z.string().optional().or(z.literal("")), // Allow empty string or undefined
		cardType: z.enum(["BASIC", "MULTIPLE_CHOICE"]),
		newBackImage: z.optional(
			z.array(
				z
					.object({
						file: z.instanceof(File),
						preview: z.string(),
						id: z.string(),
					})
					.refine((item) => item && typeof item === "object", {
						message: "Back Images must be object that has file, preview and id",
					}),
			),
		),
		newFrontImage: z.optional(
			z.array(
				z
					.object({
						file: z.instanceof(File),
						preview: z.string(),
						id: z.string(),
					})
					.refine((item) => item && typeof item === "object", {
						message: "Back Images must be object that has file, preview and id",
					}),
			),
		),
		multipleChoiceOptions: z.optional(
			z.array(
				z.object({
					text: z.string().min(1, { message: "Option text cannot be empty" }),
					isCorrect: z.boolean(),
				}),
			),
		),
	})
	.superRefine((data, ctx) => {
		// If it's a BASIC card, ensure backText is provided and meets requirements
		if (data.cardType === "BASIC") {
			if (!data.backText || data.backText.trim() === "") {
				ctx.addIssue({
					code: z.ZodIssueCode.custom,
					message: "Answer is required for basic cards",
					path: ["backText"],
				});
			} else if (data.backText.length < 5) {
				ctx.addIssue({
					code: z.ZodIssueCode.too_small,
					minimum: 5,
					type: "string",
					inclusive: true,
					message: "Answer must be at least 5 characters",
					path: ["backText"],
				});
			} else if (data.backText.length > 1000) {
				ctx.addIssue({
					code: z.ZodIssueCode.too_big,
					maximum: 1000,
					type: "string",
					inclusive: true,
					message: "Answer must be at most 1000 characters",
					path: ["backText"],
				});
			}
		}

		// For MULTIPLE_CHOICE, ensure the options array is provided
		if (
			data.cardType === "MULTIPLE_CHOICE" &&
			(!data.multipleChoiceOptions || data.multipleChoiceOptions.length === 0)
		) {
			ctx.addIssue({
				code: z.ZodIssueCode.custom,
				message:
					"Multiple choice options are required for multiple choice cards",
				path: ["multipleChoiceOptions"],
			});
		}

		// If multipleChoiceOptions is provided, validate them regardless of card type
		if (data.multipleChoiceOptions && data.multipleChoiceOptions.length > 0) {
			const hasCorrectOption = data.multipleChoiceOptions.some(
				(opt) => opt.isCorrect,
			);
			const allOptionsHaveText = data.multipleChoiceOptions.every(
				(opt) => opt.text.trim() !== "",
			);

			if (!hasCorrectOption || !allOptionsHaveText) {
				ctx.addIssue({
					code: z.ZodIssueCode.custom,
					message:
						"Multiple choice cards must have at least one correct option and all options must have text",
					path: ["multipleChoiceOptions"],
				});
			}
		}
	});
