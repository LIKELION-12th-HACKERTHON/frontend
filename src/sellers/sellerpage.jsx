import React from "react";
import Navcolor from "./sellernav.jsx";
import banner from "../sellers/sellerphotos/vegebanner4.png";
import banner1 from "../sellers/sellerphotos/vegebanner.png";
import mainbanner from "../sellers/sellerphotos/vegebanner3.png";
import "../sellers/sellercss/sellerpage.css";
import styled from "styled-components";

function SellerPage() {
	const StyledDiv = styled.div`
		width: 100vw;
		height: 2vw;
		background-color: white;
	`;

	return (
		<>
			<Navcolor />
			<StyledDiv />
			<div className='main-container'>
				<img src={mainbanner} className='bannerveg1' alt='vegebanner' />

				{/* <div className='roww'>
					<img src={banner} className='bannerveg' alt='vegebanner' />
					<img src={banner1} className='bannerveg' alt='vegebanner' />
				</div> */}
			</div>
		</>
	);
}

export default SellerPage;
