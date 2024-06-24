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
import { Link } from "react-router-dom";

import { FaGoogle } from "react-icons/fa";
const Registration = () => {
	const form = useForm({
		mode: "uncontrolled",
		initialValues: {
			email: "",
			fullName: "",
			passwordInput: "",
			confirmPasswordInput: "",
			termsOfService: false,
		},
		validateInputOnChange: true,

		validate: {
			email: (value) => (/^\S+@\S+$/.test(value) ? null : "Invalid email"),
			fullName: (value) => {
				if (value.length === 0) {
					return "Full name is required";
				}
				if (value.length < 3) {
					return "Full name must be at least 5 characters";
				}
				return null;
			},
			passwordInput: (value) => {
				if (value.length === 0) {
					return "Password is required";
				}
				if (value.length < 3) {
					return "Password must be at least 5 characters";
				}
				return null;
			},
			confirmPasswordInput: (value, values) =>
				value === values.passwordInput ? null : "Passwords do not match",
			termsOfService: (value) =>
				value ? null : "You must agree to terms of service",
		},
	});
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
					<form onSubmit={form.onSubmit((values) => console.log(values))}>
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
						<TextInput
							withAsterisk
							label="Confirm Password"
							placeholder="Confirm your password"
							key={form.key("confirmPasswordInput")}
							type="password"
							{...form.getInputProps("confirmPasswordInput")}
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
							<Button type="submit" fullWidth>
								Register Account
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
