import React, { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import api from '../components/api';
import noImage from "./img/no-image.jpg";
import "./css/detailpage.css";
import vegelogo from "../sellers/sellerphotos/vege_logo.png"

export default function Detailpage() {
  const {id} = useParams();
  const [ content, setContent ] = useState([])
  const navigate = useNavigate();
  const defaultImage = noImage

  const handlevegClick = () => {
    navigate("/customer", {replace: true});
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

  const getContent = () => {
    api.get(`/boss/post/${id}`)
      .then((res) => {
        console.log('상세 조회 완료');
        setContent(res.data);
      })
      .catch((err) => {
        console.error('에러: ', err)
      })
  }

  useEffect(()=> {
    getContent();
  }, [id])

  //판매글 상세 조회에서 가져올 것
  return (
    <div>
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
      <div className='store-info'>
        <p>{content.nickname}</p>
        <p>{content.city} {content.district} {content.dong} {content.detail_location}</p>
        <p>영업 종료 시간 {content.close}</p>
      </div>
      <div className='menu-info'>
        <div>
          <img src={content.image || defaultImage} alt='product-picture'/>
        </div>
        <p>{content.product}</p>
        <p>{content.quantity}</p>
        <p>{content.price}</p>
        <p>{content.body}</p>
      </div>
    </div>
  )
}
