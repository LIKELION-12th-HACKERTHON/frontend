import React from "react";
import '../css/customerhome.css';
import Searchbar from "./searchbar";

export default function CustomerHome() {
  return(
    <div>
      <div className="header">
        <h2>배지</h2>
        <div>
          <span>내정보</span>
          <span>로그아웃</span>
        </div>
      </div>
      <div>
        <h1>어떤 지역의 가게를 찾으시나요?</h1>
        <Searchbar/>
        <p>자주 찾는 지역</p>
      </div>
    </div>
  )
}