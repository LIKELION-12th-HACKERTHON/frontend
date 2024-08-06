import React, { useEffect, useState } from "react";
import api from "../components/api";
import { useParams } from "react-router-dom";
import { PiStarFill, PiStarLight } from "react-icons/pi";
import { FaCalendarAlt, FaUtensils } from "react-icons/fa";
import "/src/customers/css/orderdetail.css";

export default function OrderDetail() {
	const [content, setContent] = useState({});
	const [review, setReview] = useState("");
	const [rating, setRating] = useState(3);
	const token = localStorage.getItem("accessToken");
	const { id } = useParams();

	const getContent = () => {
		api
			.get(`/customer/order/${id}/`, {
				headers: {
					Authorization: `Bearer ${token}`,
				},
			})
			.then((res) => {
				console.log("주문 상세 조회 완료");
				setContent(res.data);
			})
			.catch((err) => {
				console.log("에러: ", err);
			});
	};

	useEffect(() => {
		getContent();
	}, []);

	function Star() {
		return (
			<div className='star-rating'>
				{[...Array(5)].map((_, i) => (
					<span key={i} onClick={() => setRating(i + 1)}>
						{i < rating ? <PiStarFill className='star filled' /> : <PiStarLight className='star' />}
					</span>
				))}
			</div>
		);
	}

	const postReview = (e) => {
		e.preventDefault();
		api
			.post(
				`/customer/order/${id}/review/`,
				{
					rating,
					comment: review,
				},
				{
					headers: {
						Authorization: `Bearer ${token}`,
					},
				}
			)
			.then(() => {
				console.log("리뷰 작성 완료");
				setReview("");
				// 여기에 성공 메시지나 리뷰 목록 새로고침 등의 로직을 추가할 수 있습니다.
			})
			.catch((err) => {
				console.log("에러: ", err);
			});
	};

	return (
		<div className='order-detail-container'>
			<h2>주문 상세</h2>
			<div className='order-info'>
				<div className='order-date'>{content.order_date}</div>
				<div className='order-product'>메뉴: {content.product}</div>
			</div>
			<div className='review-section'>
				<h2>리뷰 작성</h2>
				<Star />
				<form onSubmit={postReview} className='review-form'>
					<textarea
						value={review}
						onChange={(e) => setReview(e.target.value)}
						placeholder='리뷰를 작성해주세요...'
					/>
					<button type='submit'>작성</button>
				</form>
			</div>
		</div>
	);
}
