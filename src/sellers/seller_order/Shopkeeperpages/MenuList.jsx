import React, { useState, useEffect } from "react";
import styled from "styled-components";
import api from "../../../components/api";
import useMemberStore from "../../../store/memberStore";
import noimage from "../component/assets/noimage.png";

const MenuGrid = styled.div`
	display: grid;
	grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
	gap: 20px;
	padding: 20px;
`;

const MenuItem = styled.div`
	border: 1px solid #ddd;
	border-radius: 8px;
	overflow: hidden;
	box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
`;

const MenuImage = styled.img`
	width: 100%;
	height: 200px;
	object-fit: cover;
`;

const MenuInfo = styled.div`
	padding: 15px;
`;

const MenuName = styled.h3`
	margin: 0 0 10px 0;
`;

const MenuPrice = styled.p`
	font-weight: bold;
	color: #e44d26;
`;

const MenuDescription = styled.p`
	font-size: 0.9em;
	color: #666;
`;
const MenuQuantity = styled.p`
	font-weight: bold;
	text-align: right;
	color: #e44d26;
`;
const MenuList = () => {
	const [items, setItems] = useState([]);
	const { loginMember } = useMemberStore();

	useEffect(() => {
		fetchItems();
	}, [loginMember]); // loginMember가 변경될 때마다 데이터를 다시 가져옵니다.

	const fetchItems = async () => {
		if (!loginMember || !loginMember.id) return; // loginMember가 없으면 함수를 종료합니다.

		try {
			const response = await api.get(`/boss/post/${loginMember.id}/`);
			setItems(Array.isArray(response.data) ? response.data : [response.data]);
		} catch (error) {
			console.error("Error fetching items:", error);
		}
	};

	return (
		<MenuGrid>
			{items.map((item) => (
				<MenuItem key={item.id}>
					<MenuImage src={item.image ? `https://ourvege.store${item.image}` : noimage} />
					<MenuInfo>
						<MenuName>{item.product}</MenuName>
						<MenuPrice>{item.price}원</MenuPrice>
						<MenuDescription>{item.body}</MenuDescription>
						<MenuQuantity>{item.quantity}</MenuQuantity>
					</MenuInfo>
				</MenuItem>
			))}
		</MenuGrid>
	);
};

export default MenuList;
