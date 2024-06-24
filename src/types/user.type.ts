type State = {
	email: string;
	fullName: string;
	password: string;
};

type Actions = {
	setCount: () => void;
	incChildAge: (age: number) => void;
};

export type TFamilySlice = State & Actions;
