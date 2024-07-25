import React from "react";
import "../sellers/sellercss/sellernav.css";
import logowhite from "../sellers/sellerphotos/vegelogoback.png";
import logogreen from "../sellers/sellerphotos/greenlogo.png";
import { useNavigate } from "react-router-dom";

function SellerNavgreen() {
	const navigate = useNavigate();
	return (
		<div className='navbargreen'>
			<img src={logowhite} id='logo' alt='Logo' onClick={() => navigate("/seller")} />
			<div className='tabBar'>
				<span>My page</span>
			</div>
		</div>
	);
}

function SellerNavwhite() {
	const navigate = useNavigate();
	return (
		<div className='navbarwhite'>
			<img src={logogreen} alt='Logo' id='logo' onClick={() => navigate("/seller")} />
			<div className='tabBar'>
				<button onClick={() => navigate("/sellershop")}>My page</button>
			</div>
		</div>
	);
}

function Navcolor() {
	// const useGreenNav = true // Example condition
	const useGreenNav = false; // Example condition

	return <>{useGreenNav ? <SellerNavgreen /> : <SellerNavwhite />}</>;
}

export default Navcolor;
