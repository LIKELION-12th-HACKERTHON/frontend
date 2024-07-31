import React from "react";
import '../css/customerhome.css';
import { Outlet, useNavigate } from "react-router-dom";
import homeimg from "./img/customerhomeBanner1.jpg";

export default function CustomerHome() {
  const navigate = useNavigate();

  const handlevegClick = () => {
    navigate("/", {replace: true});
  };

  const handlelogout = () => {
    if (window.confirm("정말 로그아웃 하시겠습니까?")) {
      navigate("/", {replace: true})
      //쿠키 삭제 로직 추가 예정
    }
  }

  const handleMypage = () => {
    navigate("/mypage")
  }

  return(
    <div className="customer-home">
      <div className="header">
        <h2 onClick={handlevegClick} style={{ cursor: "pointer"}}>배지</h2>
        <div>
          <span onClick={handleMypage} style={{cursor: "pointer"}}>내정보</span>
          <span onClick={handlelogout} style={{cursor: "pointer"}}>로그아웃</span>
        </div>
      </div>
      <div className="homebanner">
        <img src={homeimg}/>
      </div>
      <Outlet />
    </div>
  )
}