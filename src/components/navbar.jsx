import React from "react";
import { useNavigate } from "react-router-dom";
import vegelogo from "/src/sellers/sellerphotos/vege_logo.png";

import "../css/navbar.css";

export default function Navbar() {
	const navigate = useNavigate();

	const handleClickLogin = (event) => {
		event.preventDefault();
		navigate("/login");
	};

	const handlClickCustomer = (event) => {
		event.preventDefault();
		navigate("/customer");
	};

	const handlClickSeller = (event) => {
		event.preventDefault();
		navigate("/seller");
	};

	return (
		<div className='navbar'>
			<img
				src={vegelogo}
				className='imgb'
				alt='Logo'
				id='logo'
				onClick={() => navigate("/seller")}
			/>
			<div className='logofont'>{Logo} 배지</div> {/*배고픈 당신을 위해 지금 바로 준비해드려요 */}
			<button className='loginbtn' onClick={handlClickCustomer}>
				고객
			</button>
			<button className='loginbtn' onClick={handlClickSeller}>
				사장님
			</button>
			<button className='loginbtn' onClick={handleClickLogin}>
				로그인
			</button>
		</div>
	);
}
