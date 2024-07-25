// dummyapi.js

export const getProducts = () => {
	return Promise.resolve([
		{
			id: 1,
			user: 2,
			type: "meal-kit",
			product: "1인분 야채 샤브 밀키트",
			quantity: 5,
			price: 12000,
			created_at: "2024-07-18 10:00",
		},
		{
			id: 2,
			user: 2,
			type: "meal-kit",
			product: "1인분 매운 샤브 밀키트",
			quantity: 3,
			price: 13000,
			created_at: "2024-07-18 10:00",
		},
		{
			id: 3,
			user: 2,
			type: "additional",
			product: "추가야채 : 청경채 50g",
			quantity: 7,
			price: 2000,
			created_at: "2024-07-18 10:00",
		},
		{
			id: 4,
			user: 2,
			type: "additional",
			product: "추가사리 : 비엔나소세지 5개",
			quantity: 22,
			price: 5000,
			created_at: "2024-07-18 10:00",
		},
	]);
};

export const updateProductQuantity = (id, newQuantity) => {
	return Promise.resolve({ success: true, id, newQuantity });
};
