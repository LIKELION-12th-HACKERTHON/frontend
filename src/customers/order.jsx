import axios from 'axios';
import React, { useState } from 'react'
import api from '../components/api';
import { useParams } from 'react-router-dom';

export default function Order() {
  const [ order, setOrder ] = useState(0); //주문 수량
  const [ body, setBody ] = useState(''); //요청사항
  const [ time, setTime ] = useState()
  const {id} = useParams();

  function handleMinus() {
    if (order > 0) {
      setorder(order - 1);
    }
  }

  //보유 수량 보다 많이 올라가지 않게 조정할 것.
  function handlePlus() {
    if (order) {
      setOrder(order + 1);
    }
  }

  const postOrder = async () => {
    const data = {
      order,
      pickup_time: time,
      body
    };
    try {
      const response = await api.post(`/customer/oder/${id}/request/`)
      console.log('응답 완료', response);
      setOrder('0');
      setBody('');
      setTime();
    } catch (error) {
      console.error('에러: ', error);
    }
  }

  return (
    <div>
      <h3>주문하기</h3>
      <div>
        <h4>수량</h4>
        <button onClick={handleMinus}>-</button>
        <span>{order}</span>
        <button onClick={handlePlus}>+</button>
      </div>
      <div>
        <h4>픽업 시간</h4>
      </div>
      <div>
        <h4>주문 요청사항</h4>
        {/* 토글로 몇가지 제안해도 괜찮을 듯? */}
        <imput
          type="text"
          value={body}
          onChange={(e) => setBody(e.target.value)}
          placehorder="요청사항을 적어주세요"
        />
      </div>
    </div>
  )
}
