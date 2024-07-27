import React, { useEffect, useState } from "react";
import Sellernav from "./sellernav.jsx";
import "../sellers/sellercss/sellerbanner.css";
import SellerBanner from "./sellerbanner.jsx";

function sellerPage() {
	return (
		<>
			<SellerBanner />
			<Sellernav />
		</>
	);
}

export default sellerPage;
