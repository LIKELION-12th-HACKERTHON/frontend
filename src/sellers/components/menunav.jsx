import React, { useState } from "react";
import styled from "styled-components";

export default function Menunav() {
	const Sidebarmenu = styled.div`
		display: flex;
		flex-direction: column;
		font-size: 4rem;
		font-weight: bolder;
		line-height: 10rem;
	`;

	const Button = styled.button`
		color: black;
		// font-size: 1em;
		// margin-top: 2em;
		// padding: 1em 1em;
		border-radius: 3px;
		align-content: right;
		background-color: transparent;
		cursor: pointer;

		&.clicked {
			border-right: 2px solid #17403c;
			background-color: #fed219;
			color: white;
		}
	`;

	const [clicked, setClicked] = useState(null);

	const handleClick = (index) => {
		setClicked(index);
	};

	return (
		<Sidebarmenu>
			<Button className={clicked === 0 ? "clicked" : ""} onClick={() => handleClick(0)}>
				All
			</Button>
			<Button className={clicked === 1 ? "clicked" : ""} onClick={() => handleClick(1)}>
				밀키트
			</Button>
			<Button className={clicked === 2 ? "clicked" : ""} onClick={() => handleClick(2)}>
				따로따로
			</Button>
			<Button className={clicked === 3 ? "clicked" : ""} onClick={() => handleClick(3)}>
				사이드
			</Button>
			<Button className={clicked === 4 ? "clicked" : ""} onClick={() => handleClick(4)}>
				음료
			</Button>
		</Sidebarmenu>
	);
}
