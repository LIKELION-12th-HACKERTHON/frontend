import React, { useState, useEffect, useCallback } from "react";
import styled from "styled-components";
import api from "../../../components/api";
import useMemberStore from "../../../store/memberStore";

const OrderGrid = styled.div`
	display: grid;
	grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
	gap: 20px;
	padding: 20px;
`;

const OrderItem = styled.div`
	border: 1px solid #ddd;
	border-radius: 8px;
	overflow: hidden;
	display: flex;
	flex-direction: column;
	box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
	background-color: ${({ progress }) => (progress === "in-progress" ? "#3f3f3f" : "white")};
`;

const OrderInfo = styled.div`
	padding: 15px;
`;

const OrderTitle = styled.h3`
	margin: 0 0 10px 0;
`;

const OrderDetail = styled.p`
	margin: 5px 0;
	font-size: 0.9em;
	color: #666;
`;

const Button = styled.button`
	margin-right: 10px;
	padding: 5px 10px;
	border: none;
	border-radius: 4px;
	cursor: pointer;
`;
const AcceptButton = styled(Button)`
	background-color: #4caf50;
	color: white;
	&:disabled {
		background-color: #cccccc;
		cursor: not-allowed;
		opacity: 0.5;
	}
`;

const RejectButton = styled(Button)`
	background-color: #f44336;
	color: white;
	&:disabled {
		background-color: #cccccc;
		cursor: not-allowed;
		opacity: 0.5;
	}
`;

const BackButton = styled(Button)`
	background-color: yellow;
	color: black;
	&:disabled {
		background-color: #cccccc;
		cursor: not-allowed;
		opacity: 0.5;
	}
`;
const GetOrder2 = () => {
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(null);
	const {
		loginMember,
		updateMenuQuantity,
		activeOrders,
		setActiveOrders,
		menus,
		setMenus,
		getWaitingOrdersCount,
		getProcessingOrdersCount,
	} = useMemberStore();

	const fetchOrders = useCallback(async () => {
		try {
			setLoading(true);
			const response = await api.get("/boss/");
			const posts = response.data;

			const ordersPromises = posts.map((post) => api.get(`/boss/${post.id}/order/`));
			const ordersResponses = await Promise.all(ordersPromises);
			const allOrders = ordersResponses.flatMap((response) => {
				const postData = response.data;
				return postData.orders.map((order) => ({
					...order,
					postId: postData.id,
					postQuantity: postData.quantity,
				}));
			});

			setActiveOrders(allOrders);
		} catch (error) {
			console.error("Error fetching orders:", error);
			setError("주문 정보를 불러오는데 실패했습니다.");
		} finally {
			setLoading(false);
		}
	}, [setActiveOrders]);

	const fetchMenus = async () => {
		try {
			const response = await api.get("/boss/"); // 실제 API 엔드포인트에 맞게 수정
			setMenus(response.data);
		} catch (error) {
			console.error("Error fetching menus:", error);
		}
	};

	useEffect(() => {
		if (loginMember && loginMember.id) {
			fetchOrders();
			fetchMenus();
		}
	}, [loginMember, fetchOrders]);

	const MultipleOrder = (order) => {
		processingOrder(order);
		handleAcceptOrder(order);
	};

	const processingOrder = async (order) => {
		const newProgress = "in-progress";

		try {
			console.log("Processing order:", order);
			const response = await api.patch(`/customer/order/${order.id}/update/`, {
				progress: newProgress,
			});

			console.log("응답 데이터:", response.data);
			console.log('주문 상태가 "in-progress"로 변경되었습니다.');

			setActiveOrders((prevOrders) =>
				prevOrders.map((o) => (o.id === order.id ? { ...o, progress: newProgress } : o))
			);
		} catch (error) {
			console.error("주문 상태 변경 중 오류 발생:", error);
		}
	};
	const BackOrder = async (order) => {
		const newProgress = "waiting";

		try {
			console.log("Back order:", order);
			const response = await api.patch(`/customer/order/${order.id}/update/`, {
				progress: newProgress,
			});

			console.log("응답 데이터:", response.data);
			console.log('주문 상태가 "waiting"로 변경되었습니다.');

			setActiveOrders((prevOrders) =>
				prevOrders.map((o) => (o.id === order.id ? { ...o, progress: newProgress } : o))
			);

			// 상태 변경 후 전체 주문 목록을 새로고침
			await fetchOrders();

			// 사용자에게 알림
			alert("주문이 대기 상태로 변경되었습니다.");
		} catch (error) {
			console.error("주문 상태 변경 중 오류 발생:", error);
			alert("주문 상태 변경에 실패했습니다.");
		}
	};

	const handleAcceptOrder = async (order) => {
		try {
			console.log("메뉴 데이터:", menus);
			const menu = menus.find((m) => m.id === order.postId);
			if (!menu) {
				console.error(`메뉴를 찾을 수 없습니다. PostId: ${order.postId}`);
				alert("주문에 해당하는 메뉴를 찾을 수 없습니다. 관리자에게 문의해주세요.");
				return;
			}

			const newQuantity = menu.quantity - order.order;
			if (newQuantity < 0) {
				alert("주문 수량이 현재 재고보다 많습니다. 주문을 수락할 수 없습니다.");
				return;
			}

			await api.patch(`/boss/post/${order.postId}/`, {
				quantity: newQuantity,
			});

			updateMenuQuantity(order.postId, newQuantity);
			setMenus((prevMenus) =>
				prevMenus.map((m) => (m.id === order.postId ? { ...m, quantity: newQuantity } : m))
			);

			alert("주문이 수락되었습니다.");

			await fetchOrders();
			await fetchMenus();
		} catch (error) {
			console.error("Error accepting order:", error);
			setError(`주문 수락 중 오류 발생: ${error.message}`);
		}
	};

	const handleRejectOrder = async (order) => {
		try {
			// 여기에 주문 거절을 위한 API 호출을 추가할 수 있습니다.
			// 예: await api.post(`/boss/${order.postId}/reject-order/`, { orderId: order.id });

			setActiveOrders((prevOrders) => prevOrders.filter((o) => o.id !== order.id));
			alert("주문이 거절되었습니다.");

			await fetchOrders();
		} catch (error) {
			console.error("Error rejecting order:", error);
			setError(`주문 거절 중 오류 발생: ${error.message}`);
		}
	};

	if (loading) return <div>로딩 중...</div>;
	if (error) return <div>{error}</div>;

	return (
		<OrderGrid>
			{activeOrders.map((order) => (
				<OrderItem key={order.id} progress={order.progress}>
					<OrderInfo>
						<OrderTitle>주문 번호: {order.id}</OrderTitle>
						<OrderTitle>고객: {order.customer_nickname}</OrderTitle>
						<OrderDetail>{order.product}</OrderDetail>
						<OrderDetail>
							주소: {order.city} {order.district} {order.dong}
						</OrderDetail>
						<OrderDetail>픽업 시간: {order.pickup_time}</OrderDetail>
						<OrderDetail>요청사항: {order.body}</OrderDetail>
						<OrderDetail>수량: {order.order}</OrderDetail>
						<OrderDetail>가격: ₩{order.price}</OrderDetail>
						<OrderDetail>주문 일시: {new Date(order.order_date).toLocaleString()}</OrderDetail>
						<OrderDetail>상태: {order.progress}</OrderDetail>
						<AcceptButton
							onClick={() => MultipleOrder(order)}
							disabled={
								order.progress === "in-progress" ||
								menus.find((m) => m.id === order.postId)?.quantity < order.order
							}>
							주문 수락
						</AcceptButton>
						<RejectButton
							onClick={() => handleRejectOrder(order)}
							disabled={order.progress === "in-progress"}>
							주문 거절
						</RejectButton>
						<BackButton
							onClick={() => BackOrder(order)}
							disabled={order.progress !== "in-progress"}>
							취소버튼
						</BackButton>
					</OrderInfo>
				</OrderItem>
			))}
		</OrderGrid>
	);
};

export default GetOrder2;
