import React from "react";
import "./css/sideBarSK.css";
// // import Sellerid from "../../components/sellerid";
// import styled from "styled-components";
import useMemberStore from "../../../store/memberStore";

// const Wrapper = styled.div`
// 	width: 100%;
// 	transform: scale(0.8);
// 	transform-origin: top left;
// `;

const SideBarSK = ({ setCurrentPage }) => {
	const memberStore = useMemberStore();
	return (
		<div className='marketsidebar'>
			{/* <Wrapper>
				<Sellerid />
			</Wrapper> */}
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
			<button className='marketsidebarbtn' id='Stocks' onClick={() => setCurrentPage("stockspage")}>
				재고관리
			</button>
			<button className='marketsidebarbtn' id='Stats' onClick={() => setCurrentPage("stats")}>
				통계
			</button>
			<button className='marketsidebarbtn' id='menuList' onClick={() => setCurrentPage("menuList")}>
				주문
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
