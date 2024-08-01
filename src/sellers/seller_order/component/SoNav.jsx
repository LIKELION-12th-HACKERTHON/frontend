import React from "react";
import styled from "styled-components";
import Logo from "../../components/logo";
import { useNavigate } from "react-router-dom";

const BigPart = styled.div`
	padding-top: 1%;
	margin-right: 1%;
	display: flex;
	@media (max-width: 768px) {
		flex-direction: column;
	}
`;

const SearchPart = styled.div`
	display: flex;
	flex: 1;
	padding: 20px 0px;
`;

const SearchOrder = styled.input.attrs({ placeholder: "주문 검색어를 입력하세요" })`
	// 여기에 필요한 스타일 추가
`;

const SearchOrderBtn = styled.button`
	width: 5rem;
	margin-left: 1rem;
`;

const BackButton = styled.button`
	// 여기에 필요한 스타일 추가
`;

function SoNav() {
	const navigate = useNavigate();

	const handleSearch = () => {
		// 검색 로직 구현
	};
	const handleLogoClick = () => {
		navigate("/"); // 로고를 클릭했을 때 이동할 경로 설정
	};

	return (
		<BigPart>
			<Logo />
			<div onClick={handleLogoClick} style={{ cursor: "pointer" }}>
				<h1>처음으로</h1>
			</div>
			<SearchPart>
				<label htmlFor='search-order'></label>
				<SearchOrder id='search-order' />
				<SearchOrderBtn onClick={handleSearch}>검색</SearchOrderBtn>
			</SearchPart>
			<BackButton onClick={() => navigate("/sellershop")}>원상복귀</BackButton>
		</BigPart>
	);
}

export default SoNav;
