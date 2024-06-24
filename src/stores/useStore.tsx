import { create } from "zustand";
import { immer } from "zustand/middleware/immer";

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

export const useStore = create<State & Actions>()(
	immer((zustandSet) => ({
		count: 0,
		grandFather: {
			age: 100,
			Father: {
				age: 50,
				child: {
					age: 10,
				},
			},
		},

		incChildAge: (age: number) =>
			zustandSet((state) => {
				state.grandFather.Father.child.age += age;
			}),

		setCount: () =>
			zustandSet((state) => {
				state.count += 1;
			}),
	})),
);

// without immer
// export const useStore = create<State & Actions>((set) => ({
//   count: 1,
//   setCount: () => set((state) => ({ count: state.count + 1 })),
// }));
