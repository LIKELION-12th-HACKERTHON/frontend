import React from "react";
import Sellernav from "./sellernav.jsx";
import aiphoto1 from "../sellers/sellerphotos/aiphoto1.png";
import aiphoto2 from "../sellers/sellerphotos/aiphoto2.png";
import mainbanner from "../sellers/sellerphotos/vegebanner3.png";
import "../sellers/sellercss/sellerpage.css";
import styled from "styled-components";

function SellerPage() {
	const StyledDiv = styled.div`
		height: 2vw;
		background-color: white;
		padding: 0;
		margin: 0;
	`;
	const Aibanner = styled.img`
		width: 35vw;
		height: 35vw;
		background-color: white;
		padding: 0;
		margin: 0;
	`;
	const Bodystyle = styled.div`
		display: flex;
		flex-direction: row;
		height: 30vw;
		border-radius: 5px;
		width: 100vw;
	`;
	const Textdiv = styled.div`
		display: flex;
		flex-direction: column;
		height: 50vw;
	`;
	const Texth1 = styled.h1`
		line-height: 3vw;
		font-family: "AppleMyungjo";
		font-style: italic;
		margin-left: 4rem;
		padding-top: 3rem;
	`;

	return (
		<StyledDiv>
			<Sellernav />

			<div className='main-container'>
				<img src={mainbanner} className='bannerveg1' alt='vegebanner' />

				{/* <div className='roww'>
					<img src={banner} className='bannerveg' alt='vegebanner' />
					<img src={banner1} className='bannerveg' alt='vegebanner' />
				</div> */}
			</div>
			{/* <StyledDiv /> */}

			<Bodystyle>
				<Aibanner src={aiphoto1} className='aiphoto1' alt='aiphoto' />
				<Textdiv>
					<Texth1>Vitality 활력 : 신선한 채소가 제공하는 건강과 활력</Texth1>
					<Texth1> Essence 본질 : 자연의 본질을 담은 신선한 재료</Texth1>
					<Texth1> Green 그린 : 환경을 생각한 친환경적이고 지속 가능한 식재료</Texth1>
					<Texth1> Easy Meal : 간편하게 준비할 수 있는 요리 키트</Texth1>
				</Textdiv>
			</Bodystyle>
		</StyledDiv>
	);
}

export default SellerPage;
