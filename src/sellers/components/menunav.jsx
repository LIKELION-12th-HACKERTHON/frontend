import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { getProducts } from "../practice/api";

const Container = styled.div`
	display: flex;
	width: 76vw;
	height: 100vh;
	margin-left: 0px;
	padding-left: 0px;
`;

const Sidebarmenu = styled.nav`
	width: 200px;
	display: flex;
	flex-direction: column;
	font-size: 1.5rem;
	font-weight: bolder;
	background-color: #f0f0f0;
`;

const Button = styled.button`
	color: black;
	padding: 1em;
	border: none;
	background-color: transparent;
	cursor: pointer;
	transition: all 0.3s ease;

	&.clicked {
		background-color: #fed219;
		color: white;
	}

	&:hover {
		background-color: #e0e0e0;
	}
`;

const ContentArea = styled.div`
	flex-grow: 1;
	overflow-y: auto;
	padding: 20px;
`;

const ProductContainer = styled.div`
	display: flex;
	flex-wrap: wrap;
	justify-content: center;
	gap: 20px;
`;

const ProductCard = styled.div`
	width: 45%;
	border: 1px solid #ddd;
	padding: 10px;
	border-radius: 5px;
	text-align: center;
	box-sizing: border-box;
	display: flex;
	flex-direction: column;
	align-items: center;
`;

const IMG = styled.div`
	width: 10rem;
	height: 10rem;
	background-color: blue;
	display: block;
	margin: 0 auto 10px;
`;

const menuItems = [
	{ id: 0, name: "All", type: "all" },
	{ id: 1, name: "밀키트", type: "meal-kit" },
	{ id: 2, name: "따로따로", type: "additional" },
	{ id: 3, name: "사이드", type: "side" },
	{ id: 4, name: "음료", type: "drink" },
];

export default function Menunav() {
	const [clicked, setClicked] = useState(0);
	const [products, setProducts] = useState([]);

	useEffect(() => {
		getProducts().then((data) => setProducts(data));
	}, []);

	const handleClick = (index) => {
		setClicked(index);
	};

	const filteredProducts =
		menuItems[clicked].type === "all"
			? products
			: products.filter((product) => product.type === menuItems[clicked].type);

	return (
		<Container>
			<Sidebarmenu>
				{menuItems.map((item) => (
					<Button
						key={item.id}
						className={clicked === item.id ? "clicked" : ""}
						onClick={() => handleClick(item.id)}>
						{item.name}
					</Button>
				))}
			</Sidebarmenu>
			<ContentArea>
				<h2>{menuItems[clicked].name}</h2>
				<ProductContainer>
					{filteredProducts.map((product) => (
						<ProductCard key={product.id}>
							<IMG />
							<p>{product.product}</p>
							<p>수량: {product.quantity}</p>
							<p>가격: {product.price}원</p>
						</ProductCard>
					))}
				</ProductContainer>
			</ContentArea>
		</Container>
	);
}
