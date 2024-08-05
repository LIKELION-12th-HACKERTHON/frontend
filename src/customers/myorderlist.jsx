import React, { useEffect, useState } from 'react'
import api from '../components/api';

export default function MyorderList() {
  const [orderlist, setOrderlist] = useState([]);

  const getLists = () => {
    api.get(`customer/order/list`)
      .then((res) => {
        console.log('주문 내역 불러오기 완료');
        setOrderlist(res.data);
      })
      .catch((err) => {
        console.log('에러: ', err);
      })
  }

  useEffect(() => {
    getLists()
  }, []);

  return (
    <div>
      {orderlist.map((order) => (
        <div key={order.id}>
          <div>
            <p>{order.customer_nickname}</p>
            <p>{order.nickname}</p>
            <p>{order.progress}</p>
          </div>
        </div>
      ))}
    </div>
  )
}
