export type RegistrationCredentials = {
	email: string;
	full_name: string;
	password_hash: string;
};

export type LoginCredentials = {
	email: string;
	password: string;
};

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
