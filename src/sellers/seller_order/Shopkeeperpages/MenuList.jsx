import React, { useState, useEffect } from "react";
import styled from "styled-components";
import api from "../../../components/api";
import useMemberStore from "../../../store/memberStore";
import noimage from "../component/assets/noimage.png";
import { FaStar } from "react-icons/fa6";
import { Link, useNavigate } from "react-router-dom";

const MenuGrid = styled.div`
	display: grid;
	grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
	gap: 20px;
	padding: 20px;
`;
const MenuItem = styled.div`
	border: 1px solid #ddd;
	border-radius: 8px;
	height: 500px;
	background-color: white;
	overflow: hidden;
	display: flex;
	flex-direction: column;
	box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
`;
const MenuImage = styled.img`
	width: 100%;
	height: 200px;
	object-fit: cover;
`;
const MenuInfo = styled.div`
	padding: 15px;
	background-color: white;
	flex: 1; /* 남은 공간을 채우도록 설정 */
	display: flex;
	flex-direction: column;
`;
const Sebu = styled.div`
	padding: 15px 0px;
`;
const MenuName = styled.h3`
	margin: 0 0 10px 0;
`;
const MenuPrice = styled.div`
	font-weight: bold;
	color: #e44d26;
`;
const MenuDescription = styled.div`
	font-size: 0.9em;
	color: #666;
	height: 50px;
`;
const MenuQuantity = styled.div`
	font-weight: bold;
	text-align: right;
	color: #e44d26;
`;
const Star = styled.div`
	display: flex;
	justify-content: space-between;
	margin-right: 0px;
`;
const Description = styled.div`
	display: flex;
	flex-direction: column;
	justify-content: bottom;
	margin-right: 0px;
	margin-bottom: 0px;
	flex: 1; /* 남은 공간을 채우도록 설정 */
`;
const Type = styled.div`
	font-size: 0.9em;
	font-weight: bolder;
	color: #143a5e;
`;
const QuantityInput = styled.input`
	width: 60px;
	margin-right: 10px;
	padding: 5px;
	border: 1px solid #ddd;
	border-radius: 4px;
`;

const UpdateButton = styled.button`
	background-color: #4caf50;
	color: white;
	border: none;
	border-radius: 4px;
	padding: 5px 10px;
	cursor: pointer;
`;

const MenuList = () => {
	const { loginMember, menus, setMenus } = useMemberStore();
	const navigate = useNavigate();
	const [quantityInputs, setQuantityInputs] = useState({}); //수량
	useEffect(() => {
		if (loginMember && loginMember.id) {
			fetchItems();
		}
	}, [loginMember]);

	const fetchItems = async () => {
		try {
			const response = await api.get(`/boss/`);
			const fetchedItems = Array.isArray(response.data) ? response.data : [response.data];
			setMenus(fetchedItems);
		} catch (error) {
			console.error("Error fetching items:", error);
		}
	};
	const handleQuantityChange = (id, value) => {
		setQuantityInputs((prev) => ({ ...prev, [id]: value }));
	};

	// 수량 수정 버튼 클릭 시 API에 PATCH 요청을 보내는 함수
	const handleUpdateQuantity = async (item) => {
		const newQuantity = quantityInputs[item.id];
		if (newQuantity == null) {
			alert("수량을 입력하세요.");
			return;
		}

		try {
			await api.patch(`/boss/post/${item.id}/`, {
				quantity: newQuantity,
			});
			alert("수량이 업데이트되었습니다.");
			// 메뉴 상태를 업데이트하여 변경된 수량을 반영
			setMenus((prevMenus) =>
				Array.isArray(prevMenus)
					? prevMenus.map((menu) =>
							menu.id === item.id ? { ...menu, quantity: newQuantity } : menu
					  )
					: []
			);
		} catch (error) {
			console.error("Error updating quantity:", error);
			alert("수량 업데이트 중 오류가 발생했습니다.");
		}
	};

	const safeMenus = Array.isArray(menus) ? menus : [];
	return (
		<MenuGrid>
			{safeMenus.map((item) => (
				<MenuItem key={item.id}>
					{item.image && (
						<MenuImage
							src={
								item.image.startsWith("http") ? item.image : `https://ourvege.store${item.image}`
							}
							alt={item.product}
							onError={(e) => {
								console.error("Image load failed:", e.target.src);
								e.target.src = noimage;
							}}
						/>
					)}
					<MenuInfo>
						<MenuName>{item.product}</MenuName>
						<Sebu>
							<Star>
								<MenuPrice>₩ {item.price} 원</MenuPrice>

								<FaStar color='#ffcb6b' onClick={() => navigate(`/review/${item.id}`)} />
							</Star>
						</Sebu>
						<Description>
							<MenuDescription>{item.body}</MenuDescription>
							<MenuQuantity>
								수량: {item.quantity}
								{item.quantity === 0 && <span style={{ color: "red" }}> (품절)</span>}
							</MenuQuantity>
							<Type>{item.type}</Type>
							<div>
								위치: {item.city} {item.district} {item.dong}
							</div>
							<div>마감 시간: {item.close}</div>
						</Description>
						<div
							style={{
								marginTop: "auto",
								display: "flex",
								justifyContent: "flex-end",
								alignItems: "flex-end",
							}}>
							<QuantityInput
								type='number'
								min='0'
								value={quantityInputs[item.id] || ""}
								onChange={(e) => handleQuantityChange(item.id, e.target.value)}
							/>
							<UpdateButton onClick={() => handleUpdateQuantity(item)}>수량 수정</UpdateButton>
						</div>
					</MenuInfo>
				</MenuItem>
			))}
		</MenuGrid>
	);
};

export default MenuList;
