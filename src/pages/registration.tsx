import {
	Box,
	Button,
	Checkbox,
	Group,
	PasswordInput,
	Text,
	TextInput,
} from "@mantine/core";
import { useForm } from "@mantine/form";
import { zodResolver } from "mantine-form-zod-resolver";
import { FaGoogle } from "react-icons/fa";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { z } from "zod";
import { useAuth } from "../hooks/useAuth";

const registrationSchema = z
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

const Registration = () => {
	const { registration, isPending, error } = useAuth();
	const navigate = useNavigate();

	const form = useForm({
		mode: "uncontrolled",
		initialValues: {
			email: "",
			fullName: "",
			password: "",
			confirmPassword: "",
			termsOfService: false,
		},

		validate: zodResolver(registrationSchema),
		validateInputOnChange: true,
	});

	const handleSubmit = async (values: typeof form.values) => {
		if (form.isValid()) {
			const { email, fullName: full_name, password: password_hash } = values;
			try {
				await registration({ email, full_name, password_hash });
				navigate("/login");
			} catch (err) {
				console.error("Registration failed", err);
			}
		}
	};
	return (
		<div className="flex h-screen ">
			<div className="w-1/2 bg-blue-600" />
			<div className="w-1/2 bg-white m-4 flex items-center justify-center">
				<div className="w-3/5">
					<Text size="xl" fw="700">
						Register Individual Account!
					</Text>
					<Text size="sm" c="dimmed">
						For the purpose of industry regulation, your details are required.
					</Text>
					<form onSubmit={form.onSubmit(handleSubmit)}>
						<TextInput
							withAsterisk
							label="Your Full Name"
							placeholder="Full Name"
							key={form.key("fullName")}
							{...form.getInputProps("fullName")}
							mt="md"
						/>

						<TextInput
							withAsterisk
							label="Email Address"
							placeholder="your@email.com"
							autoComplete="username email"
							key={form.key("email")}
							{...form.getInputProps("email")}
							mt="md"
						/>

						<Box mt="md">
							<PasswordInput
								withAsterisk
								label="Password"
								placeholder="your password"
								autoComplete="new-password"
								key={form.key("password")}
								type="password"
								{...form.getInputProps("password")}
								mt={"md"}
							/>
						</Box>
						<TextInput
							withAsterisk
							label="Confirm Password"
							placeholder="confirm your password"
							autoComplete="new-password"
							key={form.key("confirmPassword")}
							type="password"
							{...form.getInputProps("confirmPassword")}
							mt="md"
						/>

						<Checkbox
							mt="md"
							label="I agree to terms & conditions"
							key={form.key("termsOfService")}
							{...form.getInputProps("termsOfService", {
								type: "checkbox",
							})}
						/>

						<Group justify="flex-center" mt="md">
							<Button type="submit" fullWidth disabled={isPending}>
								{isPending ? "Registering..." : "Register Account"}
							</Button>
							{error && (
								<p className="text-red-500">
									Error: {(error as Error).message}
								</p>
							)}
						</Group>

						<Text size="xs" ta="center" c="dimmed" mt="md">
							Or
						</Text>
					</form>
					<Group mt="md" justify="center">
						<Button
							leftSection={<FaGoogle size={14} />}
							rightSection={<FaGoogle size={1} />}
							variant="default"
							justify="space-between"
							autoContrast={true}
							fullWidth
						>
							Register with Google
						</Button>
					</Group>
					<Text size="xs" ta="center" c="dimmed" mt="xl" fw="700">
						Already have an account?{" "}
						<Link to="/login" className="text-black underline">
							Login
						</Link>
					</Text>
				</div>
			</div>
		</div>
	);
};
export default Registration;
