/**
 * This file is sample of zustand slice
 */
import type { StateCreator } from "zustand";
import type { TFamilySlice } from "../types/family.type";

export const familySlice: StateCreator<
	TFamilySlice,
	[["zustand/immer", never]],
	[],
	TFamilySlice
> = (zustandSet) => ({
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
});
