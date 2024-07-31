import React from "react";
import Sellernav from "./sellernav.jsx";
import "../sellers/sellercss/sellerbanner.css";
import SellerBanner from "./sellerbanner.jsx";

function SellermainPage() {
	return (
		<>
			<Sellernav />
			<SellerBanner />
		</>
	);
}

export default SellermainPage;
