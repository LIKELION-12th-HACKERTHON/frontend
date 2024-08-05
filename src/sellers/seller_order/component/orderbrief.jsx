import React from "react";
import useMemberStore from "../../../store/memberStore";
import { FaShoppingCart, FaStar, FaHourglassHalf, FaCheckCircle } from "react-icons/fa";
import "./orderbrief.css";

const OrderBrief = () => {
	const { getWaitingOrdersCount, getProcessingOrdersCount } = useMemberStore();

	const reviews = useMemberStore((state) => state.reviews) || [];
	const reviewCount = reviews.length;

	// 이 값들은 실제 데이터로 대체해야 합니다
	const todayOrders = 15;

	return (
		<div className='order-brief'>
			<div className='card' id='todayOrder'>
				<FaShoppingCart className='icon' />
				<div className='card-content'>
					<h3>오늘의 주문</h3>
					<span className='count'>{todayOrders}</span>
				</div>
			</div>
			<div className='card' id='totalReviews'>
				<FaStar className='icon' />
				<div className='card-content'>
					<h3>전체 리뷰</h3>
					<span className='count'>{reviewCount}</span>
				</div>
			</div>
			<div className='card' id='orderIncomplete'>
				<FaHourglassHalf className='icon' />
				<div>
					<h3>대기 중인 주문</h3>
					<span className='count'>{getWaitingOrdersCount()}</span>
				</div>
			</div>

			<div className='card' id='orderComplete'>
				<FaCheckCircle className='icon' />
				<div className='card-content'>
					<h3>완료한 주문</h3>
					<span className='count'>{getProcessingOrdersCount()}</span>
				</div>
			</div>
		</div>
	);
};

export default OrderBrief;
