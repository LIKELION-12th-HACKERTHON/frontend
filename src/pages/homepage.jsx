import React from "react";
import "../css/homepage.css";
import FormLogin from "./formlogin";
import vegelogo from "/src/sellers/sellerphotos/vege_logo.png";
import banner1 from "../sellers/sellerphotos/banner1.png";
import Welcome from "./welcome";

export default function MainPage() {
	return (
		<div>
			<div className='body'>
				<div className='container'>
					<nav className='navbar'>
						<div className='logo'>
							<img src={vegelogo} alt='Our Vege Logo' />
						</div>
						<div className='nav-links'>
							<a href='#' className='active'>
								로그인
							</a>
							<a href='#'>회원가입</a>
						</div>
					</nav>
					<div className='container2'>
						<main>
							<div className='login-container'>
								<h2>환영합니다</h2>
								<FormLogin />
							</div>
							<div className='ad-container'>
								<div className='bannerfooter'></div>
								<img src={banner1} className='bannerimg' alt='Our Vege' />
								<div className='bannerfooter'></div>
								<h3>신선한 채소를 집으로!</h3>
								<p>Our Vege와 함께 건강한 식단을 만들어보세요.</p>
							</div>
						</main>
					</div>
				</div>
				<Welcome />
			</div>
		</div>
	);
}
