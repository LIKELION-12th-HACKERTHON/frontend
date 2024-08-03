import React from "react";
import "./css/sideBarSK.css";
import useMemberStore from "../../../store/memberStore";

const SideBarSK = ({ setCurrentPage }) => {
	const memberStore = useMemberStore();
	return (
		<div className='marketsidebar'>
			<div className='marketsidebarbtn' id='logininfo'>
				접속자:
				{memberStore.loginMember.username}
				{memberStore.loginMember.nickname}
			</div>
			<button
				className='marketsidebarbtn'
				id='dashboard'
				onClick={() => setCurrentPage("dashboard")}>
				대시보드
			</button>
			<button
				className='marketsidebarbtn'
				id='Orderss'
				onClick={() => setCurrentPage("orderManagement")}>
				주문관리
			</button>
			<button className='marketsidebarbtn' id='menuList' onClick={() => setCurrentPage("menuList")}>
				재고 현황
			</button>
			<button className='marketsidebarbtn' id='Stocks' onClick={() => setCurrentPage("stockspage")}>
				재고 등록
			</button>
			<button className='marketsidebarbtn' id='Stats' onClick={() => setCurrentPage("stats")}>
				통계
			</button>
			<button className='marketsidebarbtn' id='Review' onClick={() => setCurrentPage("review")}>
				리뷰
			</button>
			<button
				className='marketsidebarbtn'
				id='Sellersetting'
				onClick={() => setCurrentPage("sellersetting")}>
				설정
			</button>
		</div>
	);
};

export default SideBarSK;
