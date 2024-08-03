import React, {useState, useEffect} from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import api from "./api";
import { PiPhoneLight } from "react-icons/pi";
import { IoLocationOutline } from "react-icons/io5";
import { CgProfile } from "react-icons/cg";
import { FiMail } from "react-icons/fi";
import { InfoContainer, Profile, UserInfo } from "./styles";
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
  //데이터 받아오기 전까지 임시 사용 css위해
  const [userInfo, setUserInfo] = useState({});
  const [error, setError] = useState(null);
  const navigate = useNavigate();


  //아직 헤더 요청 안넣음!

  const getUserInfo = async () => {
    const token = localStorage.getItem("accessToken")
    try {
      const response = await api.get('/member/info/', { hearders: {
        Authorization: `Bearer ${token}`}
      });
      console.log('응답 완료', response.data) //확인용
      setUserInfo(response.data);
    } catch (error) {
      console.error('에러: ', error)
      setError(error);
    }
  };

  useEffect(() => {
    getUserInfo()
  }, []);

  const navigateHome = () => {
    navigate("/customer", {replace: true})
  };

  const handlelogout = () => {
    if (window.confirm("정말 로그아웃 하시겠습니까?")) {
      localStorage.removeItem("accessToken")
      navigate("/", {replace: true})
    }
  }

  if (error) {
    return <div>오류: {error.message}</div>;
  };

  return (
    <div>
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
      <InfoContainer>
        <h3>회원 정보</h3>
        <div className="myinfo-box">
          <Profile>
            <CgProfile size = {70} style={{color: '#77A68B'}}/>
            <p>{userInfo.username}</p>
            <span>{userInfo.nickname}</span>
          </Profile>
          <UserInfo>
          <h4>회원님은 {userInfo.seller} 입니다.</h4>
            <p><PiPhoneLight/> {userInfo.phone_number}</p>
            <p><FiMail/> {userInfo.email}</p>
            <p><IoLocationOutline/> {userInfo.city} {userInfo.district} {userInfo.dong} {userInfo.detail_location}</p>
          </UserInfo>
        </div>
      </InfoContainer>
      <h3>주문내역</h3>
    </div>
  )
}
