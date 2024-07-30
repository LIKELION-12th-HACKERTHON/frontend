import { create } from "zustand";

const useMemberStore = create((set) => ({
	loginMember: null,
	setLoginMember: (data) => set({ loginMember: data }),
}));
export default useMemberStore;
