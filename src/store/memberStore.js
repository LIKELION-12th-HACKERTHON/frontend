import { create } from "zustand";

const useMemberStore = create((set) => ({
	//data

	loginMember: {},

	//function
	setLoginMember: (data) => set({ loginMember: data }),
}));

export default useMemberStore;
