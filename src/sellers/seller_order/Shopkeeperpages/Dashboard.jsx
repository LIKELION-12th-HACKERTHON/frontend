import React from "react";
import OrderBrief from "../component/orderbrief.jsx";
import RecentOrder from "../component/RecentOrder.jsx";
import "../component/css/Dashboard.css";

const Dashboard = () => {
	return (
		<div>
			<OrderBrief />
			<RecentOrder />
		</div>
	);
};

export default Dashboard;
