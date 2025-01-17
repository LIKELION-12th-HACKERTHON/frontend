import React, { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import api from '../components/api';
import noImage from "./img/no-image.jpg";
import "./css/detailpage.css";
import vegelogo from "../sellers/sellerphotos/vege_logo.png";
import { IoLocationOutline } from "react-icons/io5";
import { FaRegClock } from "react-icons/fa6";
import Order from './order';
import Review from './review';

export default function Detailpage() {
  const {id} = useParams();
  const [ content, setContent ] = useState([]);
  const [ loading, setLoading ] = useState(true)
  const [ quantity, setQuantity ] = useState(0);
  const [ reviews, setReviews] = useState([]);
  //const [ firstContent, setfirstContent] = useState();
  const navigate = useNavigate();
  const defaultImage = noImage

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

  const getContent = () => {
    setLoading(true)
    const token = localStorage.getItem("accessToken")
    api.get(`/customer/seller/${id}`, { hearders: {
      Authorization: `Bearer ${token}`}
    })
      .then((res) => {
        console.log('상세 조회 완료');
        console.log(res.data)
        setContent(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error('에러: ', err)
        setLoading(false);
      })
  }

  useEffect(()=> {
    getContent();
  }, [id])

  const handleNumber =(number) => {
    const formattedNumber = new Intl.NumberFormat('en-US').format(number);
    return(formattedNumber)
  };

  const imgPath = `https://ourveg.store${content.image}`

  if (loading) {
    return <div>목록을 불러오는 중</div>
  }

  //판매글 상세 조회에서 가져올 것
  return (
    <div className='detail-page'>
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
        <h2>{content[0].nickname}</h2>
        <p><IoLocationOutline/>{content[0].city} {content[0].district} {content[0].dong} {content[0].detail_location}</p>
        <p><FaRegClock/>영업 종료 시간: {content[0].close}</p>
      </div>
      {content && content.map((c) => (
        <div className='one-order'
        key={c.id}
        style={{ cusrsor: "pointer"}}>
          <div>
            <div className='menu-info'>
              <div className='img-container'>
                <img
              src={`https://ourvege.store${c.image}`}
                  alt={c.product}
                onError={(e) => {
                console.error("Image load failed:", e.target.src);
                e.target.src = defaultImage;
                }}/>
              </div>
              <div className='menu-info-detail'>
                <p className='menu-name'>{c.product}</p>
                <p>현재 수량: {c.quantity}개</p>
                <p>가격: {handleNumber(c.price)}원</p>
                <p>{c.body}</p>
              </div>
              <div>
                <Order quantity={c.quantity} id={c.id}/>
              </div>
            </div>
            <div className='review-container'>
              <Review id={c.user}/>
            </div>
          </div>
        </div>
      ))}
      {/* <div className='store-info'>
        <h2>{content.nickname}</h2>
        <p><IoLocationOutline/>{content.city} {content.district} {co)ntent.dong} {content.detail_location}</p>
        <p><FaRegClock/>영업 종료 시간: {content.close}</p>
      </div>
      <div className='menu-info'>
        <div className='img-container'>
          <img
          src={`https://ourvege.store${content.image}`}
					alt={content.product}
					onError={(e) => {
						console.error("Image load failed:", e.target.src);
						e.target.src = defaultImage;
					}}
          />
        </div>
        <div className='info-container'>
          <p className='menu-name'>{content.product}</p>
          <p>현재 수량: {content.quantity}개</p>
          <p>가격: {handleNumber(content.price)}원</p>
          <p>{content.body}</p>
        </div>
      </div>
      <Order quantity = {quantity}/> */}
    </div>
  )
}
