import React, {useState, useEffect} from "react";
import { Outlet, Link, useNavigate } from "react-router-dom";
import styled from "styled-components";
import vegelogo from "../sellers/sellerphotos/vege_logo.png";
import "../css/homepage.css"

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px;
	background-color: white;
	box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);

  span {
    margin-right: 15px;
    color: #77a68b;
    font-weight: 600;
  }
  h2 {
    color: #17403C
  }
`


export default function Mypage() {
  const navigate = useNavigate();

  const navigateHome = () => {
    navigate("/customer", {replace: true})
  };

  const handlelogout = () => {
    if (window.confirm("정말 로그아웃 하시겠습니까?")) {
      localStorage.removeItem("accessToken")
      navigate("/", {replace: true})
    }
  }

  return (
    <div className="mypage-css">
      <Header>
        <div className="logo"
        onClick={navigateHome}
        style={{cursor: "pointer"}}>
          <img src={vegelogo} alt="logo"/>
        </div>
        <h2>My Page</h2>
        <div className='nav-links'>
					<span
            onClick={handlelogout}
            style={{cursor: "pointer"}}
          >로그아웃</span>
				</div>
      </Header>
      <div className="under-page">
      <div className="sidebar">
        <nav>
          <ul>
            <li>
              <Link to='profile'>프로필</Link>
            </li>
            <li>
              <Link to='orderhistory'>구매 목록</Link>
            </li>
          </ul>
        </nav>
        <div>
          <p>멋쟁이 사자처럼 해커톤</p>
        </div>
      </div>
      <div className="detail">
        <Outlet/>
      </div>
      </div>
    </div>
  )
}
