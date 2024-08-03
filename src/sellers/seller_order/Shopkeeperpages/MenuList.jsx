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
	height: 140px;
`;
const Type = styled.div`
	font-size: 0.9em;
	font-weight: bolder;
	color: #143a5e;
`;

const MenuList = () => {
	const [items, setItems] = useState([]);
	const { loginMember } = useMemberStore();
	const navigate = useNavigate();

	useEffect(() => {
		fetchItems();
	}, [loginMember]);

	const fetchItems = async () => {
		if (!loginMember || !loginMember.id) return;

		try {
			const response = await api.get(`/boss/`);
			setItems(Array.isArray(response.data) ? response.data : [response.data]);
		} catch (error) {
			console.error("Error fetching items:", error);
		}
	};

	return (
		<MenuGrid>
			{items.map((item) => (
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
								<Link to={`/review/${item.user}`}>Review</Link>
								<FaStar color='#ffcb6b' onClick={() => navigate(`/review/${item.id}`)} />
							</Star>
						</Sebu>
						<Description>
							<MenuDescription>{item.body}</MenuDescription>
							<MenuQuantity>수량: {item.quantity}</MenuQuantity>
							<Type>{item.type}</Type>
							<div>
								위치: {item.city} {item.district} {item.dong}
							</div>
							<div>마감 시간: {item.close}</div>
						</Description>
					</MenuInfo>
				</MenuItem>
			))}
		</MenuGrid>
	);
};

export default MenuList;

//////----////////

// import React, { useState, useEffect } from "react";
// import styled from "styled-components";
// import api from "../../../components/api";
// import useMemberStore from "../../../store/memberStore";
// import noimage from "../component/assets/noimage.png";
// import { FaStar } from "react-icons/fa6";
// import { Link, useNavigate } from "react-router-dom";

// const MenuGrid = styled.div`
// 	display: grid;
// 	grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
// 	gap: 20px;
// 	padding: 20px;
// `;
// const MenuItem = styled.div`
// 	border: 1px solid #ddd;
// 	border-radius: 8px;
// 	overflow: hidden;
// 	display: flex;
// 	flex-direction: column;
// 	box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
// `;
// const MenuImage = styled.img`
// 	width: 100%;
// 	height: 200px;
// 	object-fit: cover;
// `;
// const MenuInfo = styled.div`
// 	padding: 15px;
// 	background-color: white;
// `;
// const Sebu = styled.div`
// 	padding: 15px 0px;
// `;
// const MenuName = styled.h3`
// 	margin: 0 0 10px 0;
// `;
// const MenuPrice = styled.div`
// 	font-weight: bold;
// 	color: #e44d26;
// `;
// const MenuDescription = styled.div`
// 	font-size: 0.9em;
// 	color: #666;
// 	height: 50px;
// `;
// const MenuQuantity = styled.div`
// 	font-weight: bold;
// 	text-align: right;
// 	color: #e44d26;
// `;
// const Star = styled.div`
// 	display: flex;
// 	justify-content: space-between;
// 	margin-right: 0px;
// `;
// const Description = styled.div`
// 	display: flex;
// 	flex-direction: column;
// 	justify-content: bottom;
// 	margin-right: 0px;
// 	margin-bottom: 0px;
// 	height: 140px;
// `;
// const Type = styled.div`
// 	font-size: 0.9em;
// 	font-weight: bolder;
// 	color: #143a5e;
// `;

// const MenuList = () => {
// 	const [items, setItems] = useState([]);
// 	const { loginMember } = useMemberStore();
// 	const navigate = useNavigate();

// 	useEffect(() => {
// 		fetchItems();
// 	}, [loginMember]);

// 	const fetchItems = async () => {
// 		if (!loginMember || !loginMember.id) return;

// 		try {
// 			const response = await api.get(`/boss/`);
// 			setItems(Array.isArray(response.data) ? response.data : [response.data]);
// 		} catch (error) {
// 			console.error("Error fetching items:", error);
// 		}
// 	};

// 	return (
// 		<MenuGrid>
// 			{items.map((item) => (
// 				<MenuItem key={item.id}>
// 					<MenuInfo>
// 						<MenuName>{item.product}</MenuName>
// 						<Sebu>
// 							<Star>
// 								<MenuPrice>₩ {item.price} 원</MenuPrice>
// 								<Link to={`/review/${item.id}`}>Review</Link>
// 								<FaStar color='#ffcb6b' onClick={() => navigate(`/review/${item.id}`)} />
// 							</Star>
// 						</Sebu>
// 						<Description>
// 							<MenuDescription>{item.body}</MenuDescription>
// 							<MenuQuantity>수량: {item.quantity}</MenuQuantity>
// 							<Type>{item.type}</Type>
// 							<div>
// 								위치: {item.city} {item.district} {item.dong}
// 							</div>
// 							<div>마감 시간: {item.close}</div>
// 						</Description>
// 					</MenuInfo>
// 				</MenuItem>
// 			))}
// 		</MenuGrid>
// 	);
// };

// export default MenuList;
//////////////----------/////////////
// import React, { useState, useEffect } from "react";
// import styled from "styled-components";
// import api from "../../../components/api";
// import useMemberStore from "../../../store/memberStore";
// import noimage from "../component/assets/noimage.png";
// import { FaStar } from "react-icons/fa6";
// import { Link } from "react-router-dom";

// const MenuGrid = styled.div`
// 	display: grid;
// 	grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
// 	gap: 20px;
// 	padding: 20px;
// `;
// const MenuItem = styled.div`
// 	border: 1px solid #ddd;
// 	border-radius: 8px;
// 	overflow: hidden;
// 	display: flex;
// 	flex-direction: column;
// 	box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
// `;
// const MenuImage = styled.img`
// 	width: 100%;
// 	height: 200px;
// 	object-fit: cover;
// `;
// const MenuInfo = styled.div`
// 	padding: 15px;
// 	background-color: white;
// `;
// const Sebu = styled.div`
// 	padding: 15px 0px;
// `;
// const MenuName = styled.h3`
// 	margin: 0 0 10px 0;
// `;
// const MenuPrice = styled.div`
// 	font-weight: bold;
// 	color: #e44d26;
// `;
// const MenuDescription = styled.div`
// 	font-size: 0.9em;
// 	color: #666;
// 	height: 50px;
// `;
// const MenuQuantity = styled.div`
// 	font-weight: bold;
// 	text-align: right;
// 	color: #e44d26;
// `;
// const Star = styled.div`
// 	display: flex;
// 	justify-content: space-between;
// 	margin-right: 0px;
// `;
// const Description = styled.div`
// 	display: flex;
// 	flex-direction: column;
// 	justify-content: bottom;
// 	margin-right: 0px;
// 	margin-bottom: 0px;
// 	height: 140px;
// `;
// const Type = styled.div`
// 	font-size: 0.9em;
// 	font-weight: bolder;
// 	color: #143a5e;
// `;
// const MenuList = () => {
// 	const [items, setItems] = useState([]);
// 	const { loginMember } = useMemberStore();

// 	useEffect(() => {
// 		fetchItems();
// 	}, [loginMember]);

// 	const fetchItems = async () => {
// 		if (!loginMember || !loginMember.id) return;

// 		try {
// 			const response = await api.get(`/boss/`);
// 			setItems(Array.isArray(response.data) ? response.data : [response.data]);
// 		} catch (error) {
// 			console.error("Error fetching items:", error);
// 		}
// 	};

// 	useEffect(() => {
// 		const preloadImage = (src) => {
// 			return new Promise((resolve, reject) => {
// 				const img = new Image();
// 				img.onload = () => resolve(src);
// 				img.onerror = () => reject(new Error(`Failed to load image: ${src}`));
// 				img.src = src;
// 			});
// 		};

// 		items.forEach((item) => {
// 			const [currentPage, setCurrentPage] = useState("menuList");
// 			const imageSrc = item.image.startsWith("http")
// 				? item.image
// 				: `https://ourvege.store${item.image}`;
// 			preloadImage(imageSrc)
// 				.then((src) => console.log("Image preloaded successfully:", src))
// 				.catch((error) => console.error(error));
// 		});
// 	}, [items]);

// 	return (
// 		<MenuGrid>
// 			{items.map((item) => (
// 				<MenuItem key={item.id}>
// 					{/* ㅋㅋ */}
// 					<MenuInfo>
// 						<MenuName>{item.product}</MenuName>
// 						<Sebu>
// 							<Star>
// 								<MenuPrice>₩ {item.price} 원</MenuPrice>

// 								<Link to={`/review/${item.id}`}>Review</Link>
// 								<FaStar color='#ffcb6b' onClick={() => navigate(`/review/${item.id}`)} />
// 							</Star>
// 						</Sebu>
// 						<Description>
// 							<MenuDescription>{item.body}</MenuDescription>
// 							<MenuQuantity>수량: {item.quantity}</MenuQuantity>
// 							<Type>{item.type}</Type>
// 							<div>
// 								위치: {item.city} {item.district} {item.dong}
// 							</div>
// 							<div>마감 시간: {item.close}</div>
// 						</Description>
// 					</MenuInfo>
// 				</MenuItem>
// 			))}
// 		</MenuGrid>
// 	);
// };

// export default MenuList;
