import React from "react";
import vegelogo from "../seller_order/component/assets/vege_logo.png";
import vegeimg from "../seller_order/component/assets/vegeimg.png";

const Logo = ({ version = 0, width = "10%", height = "auto" }) => {
	const vegelogolist = [vegelogo, vegeimg];

	return (
		<img
			src={vegelogolist[version]}
			alt='Vege 로고'
			style={{ width, height, display: "block", padding: "15px" }}
		/>
	);
};

export default Logo;
