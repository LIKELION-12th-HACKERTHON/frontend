import React, { useEffect, useState } from "react";
import banner1 from "../sellers/sellerphotos/banner1.png";
import banner2 from "../sellers/sellerphotos/banner2.webp";
import banner3 from "../sellers/sellerphotos/banner3.webp";
import banner4 from "../sellers/sellerphotos/banner4.webp";
import "../sellers/sellercss/sellerbanner.css";

function SellerBanner() {
	const photos = [banner1, banner2, banner3, banner4];
	const colors = ["#ffffff", "#03bf62", "#ffffff", "#ffd301"];
	const [imgIndex, setImgIndex] = useState(0);
	const [backIndex, setBackIndex] = useState(0);

	useEffect(() => {
		const interval = setInterval(() => {
			setImgIndex((prevIndex) => (prevIndex + 1) % photos.length);
		}, 3000);

		return () => clearInterval(interval);
	}, [photos.length]);

	useEffect(() => {
		const backInterval = setInterval(() => {
			setBackIndex((prevIndex) => (prevIndex + 1) % colors.length);
		}, 3000);

		return () => clearInterval(backInterval);
	}, [colors.length]);

	return (
		<>
			<div className='sellerBanner-img-container' style={{ backgroundColor: colors[backIndex] }}>
				<img src={photos[imgIndex]} className='sellerBanner-bannerv' alt='vegebanner' />
			</div>
		</>
	);
}

export default SellerBanner;
