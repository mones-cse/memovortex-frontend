import {
	Box,
	Button,
	Group,
	PasswordInput,
	Text,
	TextInput,
} from "@mantine/core";
import { useForm } from "@mantine/form";
import { zodResolver } from "mantine-form-zod-resolver";
import { FaGoogle } from "react-icons/fa";
import { Link } from "react-router-dom";
import { z } from "zod";

const schema = z.object({
	email: z.string().email({ message: "Invalid email" }),
	passwordInput: z
		.string()
		.min(5, { message: "Password must be at least 5 characters" })
		.max(20, { message: "Password must be at most 20 characters" }),
});

const Login = () => {
	const form = useForm({
		mode: "uncontrolled",
		initialValues: {
			email: "",
			passwordInput: "",
		},
		validate: zodResolver(schema),
		validateInputOnChange: true,
	});

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault();
		if (form.isValid()) {
			console.log(form.getValues());
		}
	};
	return (
		<div className="flex h-screen ">
			<div className="w-1/2 bg-blue-600" />
			<div className="w-1/2 bg-white m-4 flex items-center justify-center">
				<div className="w-3/5">
					<Text size="xl" fw="700">
						Login
					</Text>
					<Text size="sm" c="dimmed">
						For the purpose of login, your details are required.
					</Text>
					<form onSubmit={handleSubmit}>
						<TextInput
							withAsterisk
							label="Email Address"
							placeholder="your@email.com"
							key={form.key("email")}
							{...form.getInputProps("email")}
							mt="md"
						/>

						<Box mt="md">
							<PasswordInput
								withAsterisk
								label="Password"
								placeholder="type your password"
								key={form.key("passwordInput")}
								type="password"
								{...form.getInputProps("passwordInput")}
								mt={"md"}
							/>
						</Box>

						<Group justify="flex-center" mt="md">
							<Button type="submit" fullWidth>
								Login
							</Button>
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
							Login with Google
						</Button>
					</Group>
					<Text size="xs" ta="center" c="dimmed" mt="xl" fw="700">
						Don’t have an account?{" "}
						<Link to="/registration" className="text-black underline">
							Sign up
						</Link>
					</Text>
				</div>
			</div>
		</div>
	);
};
export default Login;
