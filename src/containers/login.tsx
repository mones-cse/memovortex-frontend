import {
	Box,
	Button,
	Group,
	PasswordInput,
	Text,
	TextInput,
} from "@mantine/core";
import { useForm } from "@mantine/form";

import { FaGoogle } from "react-icons/fa";
import { Link } from "react-router-dom";
const Login = () => {
	const form = useForm({
		mode: "uncontrolled",
		initialValues: {
			email: "",
			passwordInput: "",
		},
		validateInputOnChange: true,

		validate: {
			email: (value) =>
				/^\S+@\S+$/.test(value) ? null : "Invalid email",

			passwordInput: (value) => {
				if (value.length === 0) {
					return "Password is required";
				}
				if (value.length < 3) {
					return "Password must be at least 5 characters";
				}
				return null;
			},
		},
	});
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
					<form
						onSubmit={form.onSubmit((values) =>
							console.log(values),
						)}
					>
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
						<Link
							to="/registration"
							className="text-black underline"
						>
							Sign up
						</Link>
					</Text>
				</div>
			</div>
		</div>
	);
};
export default Login;
