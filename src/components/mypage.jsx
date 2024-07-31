import React, {useState, useEffect} from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import api from "./api";
import { PiPhoneLight } from "react-icons/pi";
import { IoLocationOutline } from "react-icons/io5";
import { CgProfile } from "react-icons/cg";
import { InfoContainer, Profile } from "./styles";
import { FiHome } from "react-icons/fi";

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 90vw;
  height: 50px;
  margin: 20px;
  button {
    background-color: #B0D9B6;
    border: solid;
    border-radius: 10px;
    text-align: center;
    font-size: 15px;
    padding: 10px 30px;
  }
`

export default function Mypage() {
  //데이터 받아오기 전까지 임시 사용 css위해
  const [userInfo, setUserInfo] = useState({
    id: "lion",
    username: "멋사",
    nickname: "lion",
    city: "서울시",
    district: "동대문구",
    dong: "이문동",
    detailLocation: "한국외대",
    phonenumber: "010-0000-0000",
    seller: "판매자",
  });
  const [error, setError] = useState(null);
  const navigate = useNavigate();


  //아직 헤더 요청 안넣음!

  const getUserInfo = async () => {
    try {
      const response = await api.get('/member/info/');
      console.log('응답 완료', response.data) //확인용
      setUserInfo(response.data);
    } catch (error) {
      console.error('에러: ', error)
      setError(error);
    }
  };

  useEffect(() => {
    //getUserInfo()
  }, []);

  const navigateHome = () => {
    navigate("/customer", {replace: true})
  };

  const handlelogout = () => {
    if (window.confirm("정말 로그아웃 하시겠습니까?")) {
      navigate("/", {replace: true})
      //쿠키 삭제 로직 추가 예정
    }
  }

  if (error) {
    return <div>오류: {error.message}</div>;
  };

  return (
    <div>
      <Header>
        <button onClick={navigateHome} style={{cursor: "pointer"}}>홈 <FiHome/></button>
        <h2>My Page</h2>
        <button onClick={handlelogout} style={{cursor: "pointer"}}>로그아웃</button>
      </Header>
      <InfoContainer>
        <Profile>
          <CgProfile size = {70} style={{color: '#77A68B'}}/>
          <p>{userInfo.username}</p>
          <span>{userInfo.nickname}</span>
        </Profile>
        <div>
          <p><PiPhoneLight/> {userInfo.phonenumber}</p> 
          <p><IoLocationOutline/> {userInfo.city} {userInfo.district} {userInfo.dong} {userInfo.detailLocation}</p>
        </div>
      </InfoContainer>      
    </div>
  )
}
