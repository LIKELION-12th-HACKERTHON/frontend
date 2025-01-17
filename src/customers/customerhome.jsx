import React from "react";
import '../css/customerhome.css';
import { Outlet, useNavigate } from "react-router-dom";
import homeimg from "./img/customer_banner_new.png";
import vegelogo from "../sellers/sellerphotos/vege_logo.png"

export default function CustomerHome() {
  const navigate = useNavigate();

  const handlevegClick = () => {
    navigate("/customer", {replace: true});
  };

  const handlelogout = () => {
    if (window.confirm("정말 로그아웃 하시겠습니까?")) {
      localStorage.removeItem("accessToken")
      navigate("/", {replace: true})
    }
  }

  const handleMypage = () => {
    navigate("/mypage")
  }

  return(
    <div className="customer-home">
      <nav className='navbar'>
				<div className='logo'>
					<img 
            src={vegelogo}
            alt='Our Vege Logo'
            onClick={handlevegClick}
            style={{ cursor: "pointer"}}
          />
				</div>
				<div className='nav-links'>
					<span
            className='active'
            onClick={handleMypage}
            style={{cursor: "pointer"}}
          >내정보</span>
					<span
            onClick={handlelogout}
            style={{cursor: "pointer"}}
          >로그아웃</span>
				</div>
			</nav>
      <div className="homebanner">
        <img src={homeimg}/>
      </div>
      <Outlet />
    </div>
  )
}