import React from "react";
import "./css/sideBarSK.css";
import useMemberStore from "../../../store/memberStore";

const SideBarSK = ({ currentPage, setCurrentPage }) => {
	const memberStore = useMemberStore();

	const getButtonClass = (pageName) => {
		return `marketsidebarbtn ${currentPage === pageName ? "active" : ""}`;
	};

	return (
		<div className='marketsidebar'>
			<div className='user-info'>
				<div className='user-avatar'>{memberStore.loginMember.username[0]}</div>
				<div className='user-details'>
					<div className='user-name'>{memberStore.loginMember.username}</div>
					<div className='user-nickname'>{memberStore.loginMember.nickname}</div>
				</div>
			</div>
			<button className={getButtonClass("dashboard")} onClick={() => setCurrentPage("dashboard")}>
				대시보드
			</button>
			<button
				className={getButtonClass("orderManagement")}
				onClick={() => setCurrentPage("orderManagement")}>
				주문관리
			</button>
			<button className={getButtonClass("menuList")} onClick={() => setCurrentPage("menuList")}>
				재고 현황
			</button>
			<button className={getButtonClass("stockspage")} onClick={() => setCurrentPage("stockspage")}>
				재고 등록
			</button>
			<button className={getButtonClass("review")} onClick={() => setCurrentPage("review")}>
				리뷰
			</button>
			<button
				className={getButtonClass("sellersetting")}
				onClick={() => setCurrentPage("sellersetting")}>
				설정
			</button>
		</div>
	);
};

export default SideBarSK;
