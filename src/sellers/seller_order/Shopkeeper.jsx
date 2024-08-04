import React, { useState } from "react";
import "./component/css/Dashboard.css";
import SoNav from "./component/SoNav.jsx";
import SideBarSK from "./component/sideBarSK.jsx";
import Dashboard from "./Shopkeeperpages/Dashboard";
import OrderManagement from "./Shopkeeperpages/orderManagement";
import Stockspage from "./Shopkeeperpages/stockspage";
import Stats from "./Shopkeeperpages/stats";
import Sellersetting from "./Shopkeeperpages/sellersetting";
import MenuList from "./Shopkeeperpages/MenuList.jsx";
import ReviewPage from "./Shopkeeperpages/ReviewPage.jsx";

const Shopkeeper = () => {
	const [currentPage, setCurrentPage] = useState("dashboard");

	const renderPage = () => {
		switch (currentPage) {
			case "dashboard":
				return <Dashboard />;
			case "orderManagement":
				return <OrderManagement />;
			case "stockspage":
				return <Stockspage />;
			case "stats":
				return <Stats />;
			case "menuList":
				return <MenuList />;
			case "sellersetting":
				return <Sellersetting />;
			case "review":
				return <ReviewPage />;
			default:
				return <Dashboard />;
		}
	};

	return (
		<div>
			<SoNav />
			<div className='maincontent'>
				<div className='marketsidebar'>
					<SideBarSK currentPage={currentPage} setCurrentPage={setCurrentPage} />{" "}
				</div>
				<div className='mainpart'>{renderPage()}</div>
			</div>
		</div>
	);
};

export default Shopkeeper;
