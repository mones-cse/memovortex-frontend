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
import { toast } from "react-toastify";
import { useAuth } from "../hooks/useAuth";
import { authSchemas } from "../schemas/index.schemas";

const Registration = () => {
	const { registration, isPending } = useAuth();
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

		validate: zodResolver(authSchemas.registrationSchema),
		validateInputOnChange: true,
	});

	const handleSubmit = async (values: typeof form.values) => {
		if (form.isValid()) {
			const { email, fullName, password } = values;

			await registration({ email, fullName, password });
			toast.success("Registration successful. Please login to continue");
			navigate("/login");
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
							{/* {error && (() => toast.error((error as Error).message))} */}
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
