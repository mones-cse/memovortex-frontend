export type RegistrationCredentials = {
	email: string;
	full_name: string;
	password_hash: string;
};

export type LoginCredentials = {
	email: string;
	password: string;
};
