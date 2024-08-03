import { create } from "zustand";

const useMemberStore = create((set) => ({
	loginMember: null,
	reviews: [],
	setLoginMember: (data) => set({ loginMember: data }),
	setReviews: (reviews) => set({ reviews: reviews }),
}));
export default useMemberStore;
