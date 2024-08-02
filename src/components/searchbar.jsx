import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

const InputWrapper = styled.div`
	display: flex;
	justify-content: center;
	align-items: center;
	margin: 30px;
`;

const Input = styled.input`
	width: 90vw;
	max-width: 500px;
	height: 30px;
	&:focus {
		border-color: #b0d9b6;
		border-width: 1.5px;
		outline: none;
	}
`;
const Button = styled.button`
	display: inline-flex;
	align-items: center;
	background-color: #d2d2d2;
	margin-left: 20px;
	height: 43px;
	border-radius: 5px;
	font-size: 15px;
	&:hover {
		transform: scale(1.1);
		background-color: #b0d9b6;
	}
`;

export default function Searchbar() {
	const [keyword, setKeyword] = useState("");
	const navigate = useNavigate();

	const handleSearch = (e) => {
		if (e) e.preventDefault();
		if (keyword.trim()) {
			navigate(`/customer/search/${encodeURIComponent(keyword.trim())}`);
		}
	};

	const onChange = (e) => {
		setKeyword(e.target.value);
	};

	const activeEnter = (e) => {
		if (e.key === "Enter") {
			handleSearch();
		}
	};

	return (
		<InputWrapper>
			<Input placeholder='ex.이문동' value={keyword} onChange={onChange} onKeyDown={activeEnter} />
			<Button onClick={handleSearch}>검색</Button>
		</InputWrapper>
	);
}
