import React from "react";
import "../sellers/sellercss/sellernav.css";
import vegelogo from "./sellerphotos/vege_logo.png";
import { useNavigate } from "react-router-dom";
import useMemberStore from "../store/memberStore";
import { IoPersonCircleSharp } from "react-icons/io5";

export default function Sellernav() {
	const navigate = useNavigate();
	const { loginMember, setLoginMember } = useMemberStore();

	function logout() {
		localStorage.clear();
		setLoginMember(null); // Zustand 스토어의 loginMember 상태를 null로 설정
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
		<div className='navbarwhite'>
			<img
				src={vegelogo}
				className='imgb'
				alt='Logo'
				id='logo'
				onClick={() => navigate("/seller")}
			/>
			<div className='tabBar'>
				{loginMember ? <LogoutButton /> : <LoginButton />}
				{loginMember && <MyPageButton />}
			</div>
		</div>
	);
}
