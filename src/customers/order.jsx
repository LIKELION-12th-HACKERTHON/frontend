import React, { useEffect, useState } from 'react'
import api from '../components/api';
import { useParams } from 'react-router-dom';
import styled from 'styled-components';

const OrderForm = styled.div`
  display: flex;
	justify-content: space-between;
	width: 70%;
	max-width: 800px;
  margin-bottom: 20px;
`

export default function Order({quantity}) {
  const [ order, setOrder ] = useState(0); //주문 수량
  const [ body, setBody ] = useState(''); //요청사항
  const [ time, setTime ] = useState();
  const [hour, setHour] = useState(1);
  const [minute, setMinute] = useState(0);
  const {id} = useParams();

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
    try {
      const response = await api.post(`/customer/order/${id}/request/`, data, { hearders: {Authorization: `Bearer ${token}`}
      })
      console.log('응답 완료', response);
      setOrder('0');
      setBody('');
      setTime();
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
        <div>
        <label className='time-label'>
          {/* 시간 10시부터 */}
          <select value={hour} onChange={handleHourChange}>
            {[...Array(24)].map((_, i) => (
              <option key={i + 1} value={i + 1}>
                {i + 1}
              </option>
            ))}
          </select>
          시
        </label>
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
        </div>
      </OrderForm>
      <OrderForm>
        <h4>요청사항</h4>
        {/* 토글로 몇가지 제안해도 괜찮을 듯? */}
        <input
          className='request-input'
          type="text"
          value={body}
          onChange={(e) => setBody(e.target.value)}
          placehorder="요청사항을 적어주세요"
        />
      </OrderForm>
      <button onClick={postOrder}>주문</button>
    </div>
  )
}
