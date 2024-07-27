import React from "react";
import Sellernav from "./sellernav.jsx";
import Sellerid from "./components/sellerid.jsx";
import styled from "styled-components";
import Dsellershop from "./practice/dsellershop.jsx";
import Menunav from "./components/menunav.jsx";

const Maincontents = styled.div`
	display: flex;
	justify-content: space-around;
`;
const IdCard = styled.div`
	display: flex;

	justify-content: flex-end;
	align-items: stretch;
	margin-right: 10px;
	max-width: 100vw;
`;

export default function Sellershop() {
	return (
		<>
			<Sellernav />
			<h1>사장님의 가게 현황</h1>
			<Maincontents>
				<Menunav />
				<Dsellershop />
				<IdCard>
					<Sellerid />
				</IdCard>
			</Maincontents>
		</>
	);
}
