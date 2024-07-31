import React from "react";
import Navbar from "../components/navbar";
import "../css/homepage.css";
import SellerBanner from "../sellers/sellerbanner";
import styled from "styled-components";
import FormLogin from "./formlogin";

// const AllContentInsMainPage = styled.div`
// 	display: flex;
// 	flex-direction: column;
// 	height: 100vh;
// 	justify-content: space-between;
// `;
// const Maincontentbanner = styled.div`
// 	margin: auto;
// 	width: fit-content;
// 	text-align: center;
// `;

export default function MainPage() {
	return (
		<div>
			<body>
				<div class='container'>
					<nav class='navbar'>
						<div class='logo'>
							<img src='logo.png' alt='Our Vege Logo' />
						</div>
						<div class='nav-links'>
							<a href='#' class='active'>
								로그인
							</a>
							<a href='#'>회원가입</a>
						</div>
					</nav>
					<main>
						<div class='login-container'>
							<h2>환영합니다</h2>
							<FormLogin />
						</div>
						<div class='ad-container'>
							<h3>신선한 채소를 집으로!</h3>
							<p>Our Vege와 함께 건강한 식단을 만들어보세요.</p>
							{/* <SellerBanner /> */}
							<a href='#' class='btn-ad'>
								지금 주문하기
							</a>
						</div>
					</main>
				</div>
			</body>
		</div>

		// <AllContentInsMainPage>
		// 	<Navbar />
		// 	<Maincontentbanner>
		// 		<SellerBanner />
		// 	</Maincontentbanner>
		// </AllContentInsMainPage>
	);
}
