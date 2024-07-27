import React from "react";
import '../css/customerhome.css';
import { Outlet } from "react-router-dom";
import homeimg from "./img/customerhomeBanner1.jpg";

export default function CustomerHome() {
  return(
    <div className="customer-home">
      <div className="header">
        <h2>배지</h2>
        <div>
          <span>내정보</span>
          <span>로그아웃</span>
        </div>
      </div>
      <div className="homebanner">
        <img src={homeimg}/>
      </div>
      <Outlet />
    </div>
  )
}