import React, {useState, useEffect} from "react";
import { useNavigate } from "react-router-dom";
import { PiPhoneLight } from "react-icons/pi";
import { IoLocationOutline } from "react-icons/io5";
import { CgProfile } from "react-icons/cg";
import { FiMail } from "react-icons/fi";
import { InfoContainer, Profile, UserInfo } from "../components/styles";
import api from '../components/api';
import lion from './img/babylion.jpg'
import styled from "styled-components";

const EditButton = styled.button`
  border: none;
  outline: none;
  overflow: hidden;
  position: relative;
  color: #fff;
  font-weight: 700;
  font-size: 15px;
  background-color: #222;
  padding: 5px 40px;
  margin: 12px;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.20);
  transition: all 300ms ease;

  &:hover {
    background-color: #cdd8cf;
    color: #222;
  }
`

export default function CustomerProfile() {
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

  const handleButton = () => {
    navigate('/mypage/edit')
  }

  if (error) {
    return <div>오류: {error.message}</div>;
  };

  return (
    <div className="profile-container">
      <div className="profile-header">
        <h2>프로필</h2>
        <EditButton onClick={handleButton} >수정하기</EditButton>
      </div>
      <hr></hr>
      <InfoContainer>
        <Profile>
          <img src={lion} alt="profile-img"/>
          <div>
            <h3>{userInfo.username}</h3>
            <p>{userInfo.nickname}</p>
          </div>
        </Profile>
        <UserInfo>
          <p><PiPhoneLight/> {userInfo.phone_number}</p>
          <p><FiMail/> {userInfo.email}</p>
          <p><IoLocationOutline/> {userInfo.city} {userInfo.district} {userInfo.dong} {userInfo.detail_location}</p>
        </UserInfo>
      </InfoContainer>
    </div>
  )
}
