import React from "react";
import styled from "styled-components";

export default function Menunav() {
	const Sidebarmenu = styled.div`
		display: flex;
		flex-direction: column;
		font-size: 4rem;
		font-weight: bolder;
		line-height: 10rem;
	`;

	return (
		<Sidebarmenu>
			<buttonsty>
				<button>밀키트</button>
			</buttonsty>
			<buttonsty>
				<button>따로따로</button>
			</buttonsty>
			<buttonsty>
				<button>사이드</button>
			</buttonsty>
			<buttonsty>
				<button>음료</button>
			</buttonsty>
		</Sidebarmenu>
	);
}
