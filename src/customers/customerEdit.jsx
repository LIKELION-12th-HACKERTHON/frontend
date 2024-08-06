import React, { useState, useEffect } from 'react'
import styled from "styled-components";
import api from '../components/api';
import AddressForm from '../components/addressform';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

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

export default function CustomerEdit() {
  const [username, setUsername] = useState('');
  const [nickname, setNickname] = useState('');
  const [userInfo, setUserInfo] = useState({});
  const [city, setCity] = useState({});
  const [district, setDistrict] = useState({});
  const [dong, setDong] = useState({});
  const [detail, setDetail] = useState({});
  const navigate = useNavigate();
  const token = localStorage.getItem("accessToken")

  const getUserInfo = async () => {
    try {
      const response = await api.get('/member/info/', { hearders: {
        Authorization: `Bearer ${token}`}
      });
      console.log('응답 완료', response.data) //확인용
      setUsername(response.data.username);
      setNickname(response.data.nickname);
      setUserInfo(response.data);
      setCity(response.data.city);
      setDistrict(response.data.district);
      setDong(response.data.dong);
      setDetail(response.data.detail);
    } catch (error) {
      console.error('에러: ', error)
    }
  };

  useEffect(() => {
    getUserInfo()
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    const data = {
      username,
      nickname,
      phone_number: userInfo.phone_number,
      city,
      district,
      dong,
      detail_location: detail,
      seller: userInfo.seller
    }
    console.log(data)
    if(window.confirm('회원 정보를 수정하시겠습니까?')) {
      axios.patch(`https://ourvege.store/member/info/detail/${userInfo.id}/`, data, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
      .then (() => {
        console.log('수정 완료');
        alert('회원 정보가 수정되었습니다.')
        navigate('/mypage', {replace: true})
      })
      .catch ((err) => {
        console.log('에러: ', err);
      })
      }
    }

  return (
    <div>
      <div className='profile-header'>
        <h2>회원 정보 수정하기</h2>
        <EditButton onClick={handleSubmit}>수정</EditButton>
      </div>
      <hr></hr>
      <form>
        <label>이름</label>
        <input
          type='text'
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <label>닉네임</label>
        <input
          type='text'
          value={nickname}
          onChange={(e) => setNickname(e.target.value)}
        />
        <h4>주소</h4>
        <label>시</label>
        <input
          type='text'
          value={city}
          onChange={(e) => setCity(e.target.value)}
        />
        <label>구</label>
        <input
          type='text'
          value={district}
          onChange={(e) => setDistrict(e.target.value)}
        />
        <label>동</label>
        <input
          type='text'
          value={dong}
          onChange={(e) => setDong(e.target.value)}
        />
        <label>상세</label>
        <input
          type='text'
          value={detail}
          onChange={(e) => setDetail(e.target.value)}
        />
      </form>
    </div>
  )
}
