import React, { useEffect, useState } from 'react'
import api from '../components/api';
import { useParams } from 'react-router-dom';
import styled from 'styled-components';
import { PiStarFill, PiStarLight } from "react-icons/pi";

const StarSection = styled.div`
  .star {
    color: yellow;
    font-size: 30px;
  }
`

export default function OrderDetail() {
  const [content, setContent] = useState({});
  const [review, setReview] = useState('');
  const [rating, setRating] = useState(3);
  const token = localStorage.getItem("accessToken");
  const {id} = useParams();

  const getContent = () => {
    api.get(`/customer/order/${id}/`, { hearders: {
      Authorization: `Bearer ${token}`}
    })
    .then((res) => {
      console.log('주문 상세 조회 완료');
      console.log(res.data);
      setContent(res.data);
    })
    .catch((err) => {
      console.log('에러: ', err)
    })
  }

  useEffect(()=> {
    getContent();
  }, [])

  function Star() {  
    return (
      <div>
        {[...Array(rating)].map((a, i) => (
          <PiStarFill className="star-lg" key={i} onClick={() => setRating(i + 1)} />
        ))}
        {[...Array(5 - rating)].map((a, i) => (
          <PiStarLight className="star-lg" key={i} onClick={() => setRating(rating + i + 1)} />
        ))}
      </div>
    );
  }

  const postReview = (e) => {
    e.preventDefault()
    api.post(`/customer/order/${id}/review/`, {
      rating,
      comment: review
    }, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
    .then (() => {
      console.log('리뷰 작성 완료')
    })
    .catch ((err) => {
      console.log('에러: ', err);
    })
  }

  return (
    <div>
      <div>
        <h2>주문 상세</h2>
        <p>{content.product}</p>
      </div>
      <div>
        <h2>리뷰 쓰기</h2>
        <Star/>
        <input
          type='text'
          value={review}
          onChange={(e) => setReview(e.target.value)}
        />
        <button onClick={postReview}>작성</button>
      </div>
    </div>
  )
}
