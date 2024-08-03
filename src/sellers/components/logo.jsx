import React from "react";
import vegelogo from "../seller_order/component/assets/vege_logo.png";
import vegeimg from "../seller_order/component/assets/vegeimg.png";
import { useNavigate } from "react-router-dom";

const Logo = ({ version = 0, width = "10%", height = "auto" }) => {
	const vegelogolist = [vegelogo, vegeimg];
	const navigate = useNavigate();
	const handleClick = () => navigate("/");

	return (
		<img
			src={vegelogolist[version]}
			alt='Vege 로고'
			style={{ width, height, display: "block", padding: "15px" }}
			onClick={handleClick}
		/>
	);
};

export default Logo;
