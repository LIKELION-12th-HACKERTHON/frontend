// Dsellershop.js
import React, { useEffect, useState } from "react";
import { getProducts, updateProductQuantity } from "../practice/api";
import "./dsellershop.css";
import styled from "styled-components";

const IMG = styled.div`
	width: 10rem;
	height: 10rem;
	background-color: blue;
	display: block;
	margin: 0 auto 10px;
`;

const ProductContainer = styled.div`
	display: flex;
	flex-wrap: wrap;
	justify-content: center;
	gap: 20px;
`;

const ProductCard = styled.div`
	width: 45%; // Adjust width to fit two items per row
	border: 1px solid #ddd;
	padding: 10px;
	border-radius: 5px;
	text-align: center;
	box-sizing: border-box;
	display: flex;
	flex-direction: column;
	align-items: center;
`;

const Dsellershop = () => {
	const [products, setProducts] = useState([]);

	useEffect(() => {
		getProducts().then((data) => setProducts(data));
	}, []);

	const handleQuantityChange = (id, newQuantity) => {
		updateProductQuantity(id, newQuantity).then((response) => {
			if (response.success) {
				setProducts(
					products.map((product) =>
						product.id === id ? { ...product, quantity: newQuantity } : product
					)
				);
			}
		});
	};

	return (
		<div className='sellershop'>
			<h1>가게 재고 파악</h1>
			<ProductContainer>
				{products.map((product) => (
					<ProductCard key={product.id}>
						<IMG />
						<p>{product.product}</p>
						<div className='quantity-control'>
							<button onClick={() => handleQuantityChange(product.id, product.quantity - 1)}>
								-
							</button>
							<span>{product.quantity}</span>
							<button onClick={() => handleQuantityChange(product.id, product.quantity + 1)}>
								+
							</button>
						</div>
					</ProductCard>
				))}
			</ProductContainer>
		</div>
	);
};

export default Dsellershop;
