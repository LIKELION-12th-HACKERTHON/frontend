import React from "react";
import "../sellers/sellercss/sellernav.css";
import logogreen from "../sellers/sellerphotos/greenlogo.png";
import { useNavigate } from "react-router-dom";
import useMemberStore from "../store/memberStore";
import { IoPersonCircleSharp } from "react-icons/io5";

export default function Sellernav() {
	const navigate = useNavigate();
	const { loginMember, setLoginMember } = useMemberStore();

	function logout() {
		setLoginMember(null);
		navigate("/");
		console.log("Current login member:", loginMember);
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
		<button className='mypagebuttonclass' onClick={navigate("/sellershop")}>
			<IoPersonCircleSharp size='2rem' />
		</button>
	);

	return (
		<div className='navbarwhite'>
			<img
				src={logogreen}
				className='imgb'
				alt='Logo'
				id='logo'
				onClick={() => navigate("/seller")}
			/>
			<div className='tabBar'>
				{loginMember ? <LogoutButton /> : <LoginButton />}
				{loginMember && <MyPageButton />}
				{/* <button onClick={() => navigate("/sellershop")}>My page</button> */}
			</div>
		</div>
	);
}
