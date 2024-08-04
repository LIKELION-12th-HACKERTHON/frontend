import { create } from "zustand";
import { persist } from "zustand/middleware";

const useMemberStore = create(
	persist(
		(set, get) => ({
			loginMember: null,
			menus: [],
			activeOrders: [],
			completedOrders: [],
			reviews: [],
			setLoginMember: (data) => set({ loginMember: data }),
			setMenus: (menus) => set({ menus: Array.isArray(menus) ? menus : [] }),
			setActiveOrders: (orders) => set({ activeOrders: Array.isArray(orders) ? orders : [] }),
			setCompletedOrders: (orders) => set({ completedOrders: Array.isArray(orders) ? orders : [] }),
			updateMenuQuantity: (id, quantity) =>
				set((state) => ({
					menus: state.menus.map((menu) => (menu.id === id ? { ...menu, quantity } : menu)),
				})),
			setReviews: (reviews) => set({ reviews: Array.isArray(reviews) ? reviews : [] }),
			getWaitingOrdersCount: () => {
				const { activeOrders } = get();
				return activeOrders.filter((order) => order.progress === "waiting").length;
			},
			getProcessingOrdersCount: () => {
				const { activeOrders } = get();
				return activeOrders.filter((order) => order.progress === "in-progress").length;
			},
		}),
		{
			name: "member-storage",
			getStorage: () => localStorage,
		}
	)
);

export default useMemberStore;
