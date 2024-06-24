type State = {
	count: number;
	grandFather: {
		age: number;
		Father: {
			age: number;
			child: {
				age: number;
			};
		};
	};
};

type Actions = {
	setCount: () => void;
	incChildAge: (age: number) => void;
};

export type TFamilySlice = State & Actions;
