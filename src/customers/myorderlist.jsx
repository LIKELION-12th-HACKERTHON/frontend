import React, { useEffect, useState } from "react";
import api from "../components/api";
import { useNavigate } from "react-router-dom";
import "./css/orderlist.css";
import { FaStore } from "react-icons/fa";

export default function MyorderList() {
	const [orderlist, setOrderlist] = useState([]);
	const navigate = useNavigate();

	const getLists = () => {
		api
			.get(`customer/order/list`)
			.then((res) => {
				console.log("주문 내역 불러오기 완료", res.data);
				setOrderlist(res.data);
			})
			.catch((err) => {
				console.log("에러: ", err);
			});
	};

	useEffect(() => {
		getLists();
	}, []);

	const handleClick = (id) => {
		navigate(`detail/${id}`);
	};

	return (
		<div className='orderlist-container'>
			<h2>구매 목록</h2>
			<div className='orderlist-content'>
				{orderlist.map((order) => (
					<div key={order.id} onClick={() => handleClick(order.id)} className='order-card'>
						<div className='order-header'>
							<div className='shop-info'>
								<FaStore className='icon' />
								<span className='shopNickname'>{order.nickname}</span>
							</div>
							<div className={`orderprogress ${order.progress.toLowerCase()}`}>
								{order.progress}
							</div>
						</div>
						<div className='order-details'>
							<div className='productname'>{order.product}</div>
							<div className='order-number'>{order.order}</div>
						</div>
						<div>
							<div className='order-footer'>
								<div className='price'>₩ {order.price.toLocaleString()}</div>
								<div className='order-date'>{order.order_date}</div>
							</div>
						</div>
					</div>
				))}
			</div>
		</div>
	);
}
