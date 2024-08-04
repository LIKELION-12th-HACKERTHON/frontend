import React from "react";
import styled from "styled-components";
import Logo from "../../components/logo";
import { useNavigate } from "react-router-dom";
import { IoPersonCircleSharp } from "react-icons/io5";
import useMemberStore from "../../../store/memberStore";

const NavContainer = styled.nav`
	padding: 1rem;
	display: flex;
	justify-content: space-between;
	align-items: center;
	background-color: #2d3d50;
	border-bottom: 2px solid #efffff;

	@media (max-width: 768px) {
		flex-direction: column;
		align-items: stretch;
	}
`;

const ButtonGroup = styled.div`
	display: flex;
	gap: 1rem;

	@media (max-width: 768px) {
		margin-top: 1rem;
		justify-content: center;
	}
`;

const NavButton = styled.button`
	padding: 0.5rem 1rem;
	border: none;
	border-radius: 4px;
	background-color: #4a5568;
	color: white;
	cursor: pointer;
	transition: background-color 0.3s;

	&:hover {
		background-color: #2c3e50;
	}
`;

const LogoutButton = styled(NavButton)`
	background-color: #e53e3e;

	&:hover {
		background-color: #c53030;
	}
`;

const MyPageButton = styled(NavButton)`
	display: flex;
	align-items: center;
	justify-content: center;
`;

function SoNav() {
	const navigate = useNavigate();
	const { loginMember, setLoginMember } = useMemberStore();

	function logout() {
		localStorage.clear();
		setLoginMember(null);
		navigate("/");

		setTimeout(() => {
			const currentLoginMember = useMemberStore.getState().loginMember;
			console.log("Current login member:", currentLoginMember);
		}, 2000);
	}

	const handleLogoClick = () => {
		navigate("/");
	};

	return (
		<NavContainer>
			<Logo onClick={handleLogoClick} />
			<ButtonGroup>
				<LogoutButton onClick={logout}>로그아웃</LogoutButton>
				<MyPageButton onClick={() => navigate("/sellershop")}>
					<IoPersonCircleSharp size='1.5rem' />
				</MyPageButton>
			</ButtonGroup>
		</NavContainer>
	);
}

export default SoNav;
