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
	width: 100vw;
	background-color: #2d3d50;
	border-bottom: 2px solid #efffff;
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
	font-weight: bolder;
	width: 5rem;
	margin-left: 1rem;
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
			<SearchPart>
				<label htmlFor='search-order'></label>
				<SearchOrder id='search-order' />
				<SearchOrderBtn onClick={handleSearch}>검색</SearchOrderBtn>
			</SearchPart>
		</BigPart>
	);
}

export default SoNav;
