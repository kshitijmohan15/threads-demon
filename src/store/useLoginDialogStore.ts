import { create } from "zustand";

type Store = {
	open: boolean;
};

type Actions = {
	setOpen: (input: boolean) => void;
};

export const useLogInDialog = create<Store & Actions>((set) => ({
	open: false,
	setOpen: (open: boolean) => set({ open }),
}));
