import React, { useEffect, useState } from 'react'
import api from '../components/api';
import { useNavigate } from 'react-router-dom';

export default function MyorderList() {
  const [orderlist, setOrderlist] = useState([]);
  const navigate = useNavigate();

  const getLists = () => {
    api.get(`customer/order/list`)
      .then((res) => {
        console.log('주문 내역 불러오기 완료', res.data);
        setOrderlist(res.data);
      })
      .catch((err) => {
        console.log('에러: ', err);
      })
  }

  useEffect(() => {
    getLists()
  }, []);

  const handleClick = (id) => {
    navigate(`detail/${id}`)
  }

  return (
    <div>
      {orderlist.map((order) => (
        <div
        key={order.id}
        onClick={() => handleClick(order.id)}
        style={{ cursor: "pointer"}}
        >
          <div>
            <p>{order.customer_nickname}</p>
            <p>{order.nickname}</p>
            <p>{order.progress}</p>
          </div>
          <div>
            <p>{order.product}</p>
            <p>{order.order}</p>
            <p>{order.price}</p>
            <p>{order.date}</p>
          </div>
        </div>
      ))}
    </div>
  )
}
