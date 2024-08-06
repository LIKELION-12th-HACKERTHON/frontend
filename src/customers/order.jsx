import React, { useEffect, useState, useRef } from 'react'
import api from '../components/api';
import { useNavigate, useParams } from 'react-router-dom';
import styled from 'styled-components';

const OrderForm = styled.div`
  display: flex;
	justify-content: space-between;
	width: 75%;
	max-width: 800px;
  margin-bottom: 20px;
`
const OrderButton = styled.button`
  width: 50%;
  height: 30px;
  background-color: #B0D9B6;
  border: solid #77A68B;
`

export default function Order({quantity, id}) {
  const [ order, setOrder ] = useState(1); //주문 수량
  const [ body, setBody ] = useState('없음'); //요청사항
  const [ time, setTime ] = useState();
  const [hour, setHour] = useState(1);
  const [minute, setMinute] = useState(0);
  const navigate = useNavigate();
  // const textareaRef = useRef<HTMLTextAreaElement | null>(null);

  // const adjustTextareaHeight = () => {
  //   const textarea = textareaRef.current;
  //   if (textarea) {
  //     textarea.style.height = '1px';
  //     textarea.style.height = `${textarea.scrollHeight}px`;
  //   }
  // }

  function handleMinus() {
    if (order > 0) {
      setOrder(order - 1);
    }
  }

  //보유 수량 보다 많이 올라가지 않게 조정할 것.
  function handlePlus() {
    if (order < quantity) {
      setOrder(order + 1);
    }
  }

  const handleHourChange = (event) => {
    setHour(parseInt(event.target.value));
  };

  const handleMinuteChange = (e) => {
    setMinute(parseInt(e.target.value));
  };

  const formatTime = () => {
    const formattedHour = hour < 10 ? `0${hour}` : hour;
    const formattedMinute = minute < 10 ? `0${minute}` : minute;
    return`${formattedHour}:${formattedMinute}`;
  };

  useEffect(() => {
    setTime(formatTime());
  }, [ hour, minute])

  const postOrder = async () => {
    const token = localStorage.getItem("accessToken")
    const data = {
      order,
      pickup_time: time,
      body
    };
    console.log(data)
    try {
      const response = await api.post(`/customer/order/${id}/request/`, data, { hearders: {Authorization: `Bearer ${token}`}
      })
      console.log('응답 완료', response);
      alert('주문이 완료되었습니다. 결제는 가게에서 수령하면서 해주세요!')
      setOrder('0');
      setBody('');
      setTime();
      navigate('/mypage/orderhistory')
    } catch (error) {
      console.error('에러: ', error);
    }
  }

  return (
    <div className='order-css'>
      <h3>주문하기</h3>
      <OrderForm>
        <h4>수량</h4>
        <div className='quantity-button'>
          <button onClick={handleMinus}>-</button>
          <span>{order}</span>
          <button onClick={handlePlus}>+</button>
        </div>
      </OrderForm>
      <OrderForm>
        <h4>픽업 시간</h4>
        <div className='label-container'>
        <label>
          <select value={minute} onChange={handleMinuteChange}>
            {[0, 10, 20, 30, 40, 50].map((value) => (
              <option key={value} value={value}>
                {value < 10 ? `0${value}` : value}
              </option>
            ))}
          </select>
          분
        </label>
        <label>
          {/* 시간 10시부터 */}
          <select value={hour} onChange={handleHourChange}>
            {[...Array(6)].map((_, i) => (
              <option key={i + 19} value={i + 19}>
                {i + 19}
              </option>
            ))}
          </select>
          시
        </label>
        </div>
      </OrderForm>
      <OrderForm>
        <h4>요청사항</h4>
        {/* 토글로 몇가지 제안해도 괜찮을 듯? */}
        <textarea
          className='request-input'
          type="text"
          value={body}
          onChange={(e) => setBody(e.target.value)}
          placehorder="요청사항을 꼭 입력해주세요"
        />
      </OrderForm>
      <OrderButton onClick={postOrder}>주문</OrderButton>
    </div>
  )
}
