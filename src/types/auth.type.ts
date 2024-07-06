export type RegistrationCredentials = {
	email: string;
	fullName: string;
	password: string;
};

export type LoginCredentials = Pick<
	RegistrationCredentials,
	"email" | "password"
>;

export type User = {
	sub: string;
	email: string;
	full_name: string;
	// Add other relevant user properties
};

export type TChangePassword = {
	oldPassword: string;
	newPassword: string;
};

export type AuthStore = {
	user: User | null;
	isAuthenticated: boolean;
	setUser: (user: User | null) => void;
	setIsAuthenticated: (isAuthenticated: boolean) => void;
};
