import { create } from "zustand";
import { persist } from "zustand/middleware";

const useMemberStore = create(
	persist(
		(set) => ({
			loginMember: null,
			menus: [],
			activeOrders: [], // activeOrders 상태 추가
			completedOrders: [],
			reviews: [], // 리뷰 상태 추가
			setLoginMember: (data) => set({ loginMember: data }),
			setMenus: (menus) => set({ menus: Array.isArray(menus) ? menus : [] }), // Ensure menus is an array
			setActiveOrders: (orders) => set({ activeOrders: Array.isArray(orders) ? orders : [] }), // Ensure activeOrders is an array
			setCompletedOrders: (orders) => set({ completedOrders: Array.isArray(orders) ? orders : [] }), // Ensure completedOrders is an array
			updateMenuQuantity: (id, quantity) =>
				set((state) => ({
					menus: state.menus.map((menu) => (menu.id === id ? { ...menu, quantity } : menu)),
				})),
			setReviews: (reviews) => set({ reviews: Array.isArray(reviews) ? reviews : [] }), // 리뷰 설정 함수 추가
		}),
		{
			name: "member-storage",
			getStorage: () => localStorage,
		}
	)
);

export default useMemberStore;
