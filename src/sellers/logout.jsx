import React from "react";
import "../sellers/sellercss/sellernav.css";
import { useNavigate } from "react-router-dom";
import useMemberStore from "../store/memberStore";
import { IoPersonCircleSharp } from "react-icons/io5";

export default function Logout() {
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
	const LoginButton = () => (
		<button className='loginbuttonclass' onClick={() => navigate("/login")}>
			로그인
		</button>
	);

	const LogoutButton = () => (
		<button className='logoutbuttonclass' onClick={logout}>
			로그아웃
		</button>
	);

	const MyPageButton = () => (
		<button className='mypagebuttonclass' onClick={() => navigate("/sellershop")}>
			<IoPersonCircleSharp size='2rem' />
		</button>
	);

	return (
		<div className='tabBar'>
			{loginMember ? <LogoutButton /> : <LoginButton />}
			{loginMember && <MyPageButton />}
		</div>
	);
}
