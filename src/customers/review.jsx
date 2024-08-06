import React, { useEffect, useState } from "react";
import axios from "axios";
import useMemberStore from "../store/memberStore";
import "./css/customerreview.css";

const Review = (id) => {
	const [reviews, setReviews] = useState([]);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(null);
	const memberStore = useMemberStore();
  const storeId = id.id

	useEffect(() => {
		const fetchStoreData = async () => {
			try {
				setLoading(true);
				console.log(`Fetching data for store with id: ${storeId}`);
				const response = await axios.get(
					`https://ourvege.store/customer/seller/${storeId}/reviews/`
				);
				console.log("Store data:", response.data); // Store data log

				setReviews(response.data);
			} catch (error) {
				console.error("Error fetching data:", error);
				setError(error.response?.data?.message || error.message);
			} finally {
				setLoading(false);
			}
		};
		fetchStoreData();
	}, [memberStore.loginMember.id]);

	if (loading) return <div>로딩 중...</div>;
	if (error) return <div>에러: {error}</div>;
	if (!reviews || reviews.length === 0) return <div>리뷰가 없습니다.</div>;

	console.log("Reviews:", reviews); // Reviews log

	return (
		<div className='review-page'>
			<h1 className='store-name'>리뷰</h1>
			<div className='review-list'>
				{reviews.map((review) => (
					<div key={review.id} className='review-card'>
						<div className='review-header'>
							<span className='order-number'>주문 번호: {review.order}</span>
							<span className='review-date'>
								{new Date(review.created_at).toLocaleDateString()}
							</span>
						</div>
						<div className='review-body'>
							<p className='review-customer'>고객: {review.customer}</p>
							<div className='review-rating'>
								평점: {Array(review.rating).fill("★").join("")}
								{Array(5 - review.rating)
									.fill("☆")
									.join("")}
							</div>
							<p className='review-comment'>{review.comment}</p>
						</div>
					</div>
				))}
			</div>
		</div>
	);
};

export default Review;

