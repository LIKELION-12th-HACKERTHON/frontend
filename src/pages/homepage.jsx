import React from "react";
import Navbar from "../components/navbar";
import "../css/homepage.css";
import SellerBanner from "../sellers/sellerbanner";
import styled from "styled-components";

const AllContentInsMainPage = styled.div`
	display: flex;
	flex-direction: column;
	height: 100vh;
	justify-content: space-between;
`;
const Maincontentbanner = styled.div`
	margin: auto;
	width: fit-content;
	text-align: center;
`;

export default function MainPage() {
	return (
		<AllContentInsMainPage>
			<Navbar />
			<Maincontentbanner>
				<SellerBanner />
			</Maincontentbanner>
		</AllContentInsMainPage>
	);
}
