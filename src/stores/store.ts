import { create } from "zustand";
import { immer } from "zustand/middleware/immer";

import type { TStore } from "../types/store.type";
import { FamilySlice } from "./familySlice";
import { ModalSlice } from "./modalSlice";

import { devtools, persist } from "zustand/middleware";

export const userStore = create<TStore>()(
	devtools(
		persist(
			immer((...a) => ({
				...FamilySlice(...a),
				...ModalSlice(...a),
			})),
			{
				name: "userStore",
			},
		),
	),
);
