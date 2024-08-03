// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import useMemberStore from "../../../store/memberStore";
// import "./reviewpage.css";

// const ReviewPage = () => {
// 	const [storeData, setStoreData] = useState(null);
// 	const [loading, setLoading] = useState(true);
// 	const [error, setError] = useState(null);
// 	const memberStore = useMemberStore();
// 	const setReviews = useMemberStore((state) => state.setReviews);

// 	useEffect(() => {
// 		const fetchStoreData = async () => {
// 			try {
// 				setLoading(true);
// 				const storeId = memberStore.loginMember.id;
// 				console.log(`Fetching data for store with id: ${storeId}`);
// 				const response = await axios.get(`https://ourvege.store/boss/post/${storeId}`);
// 				setStoreData(response.data);
// 				console.log("Store data:", response.data);
// 				setReviews(response.data.reviews);
// 			} catch (error) {
// 				console.error("Error fetching data:", error);
// 				setError(error.response?.data?.message || error.message);
// 			} finally {
// 				setLoading(false);
// 			}
// 		};
// 		fetchStoreData();
// 	}, [memberStore.loginMember.id, setReviews]);

// 	if (loading) return <div>로딩 중...</div>;
// 	if (error) return <div>에러: {error}</div>;
// 	if (!storeData) return <div>데이터를 찾을 수 없습니다.</div>;

// 	console.log("Reviews:", storeData.reviews);

// 	return (
// 		<div className='review-page'>
// 			<h1 className='store-name'>{storeData.nickname} 리뷰</h1>
// 			<div className='review-list'>
// 				{storeData.reviews && storeData.reviews.length > 0 ? (
// 					storeData.reviews.map((review) => (
// 						<div key={review.id} className='review-card'>
import React, { useEffect, useState } from "react";
import axios from "axios";
import useMemberStore from "../../../store/memberStore";
import "./reviewpage.css";

const ReviewPage = () => {
	const [storeData, setStoreData] = useState(null);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(null);
	const memberStore = useMemberStore();
	const setReviews = useMemberStore((state) => state.setReviews);

	useEffect(() => {
		const fetchStoreData = async () => {
			try {
				setLoading(true);
				const storeId = memberStore.loginMember.id;
				console.log(`Fetching data for store with id: ${storeId}`);
				const response = await axios.get(`https://ourvege.store/boss/post/${storeId}`);
				setStoreData(response.data);
				console.log("Store data:", response.data);
				setReviews(response.data.reviews);
			} catch (error) {
				console.error("Error fetching data:", error);
				setError(error.response?.data?.message || error.message);
			} finally {
				setLoading(false);
			}
		};
		fetchStoreData();
	}, [memberStore.loginMember.id, setReviews]);

	if (loading) return <div>로딩 중...</div>;
	if (error) return <div>에러: {error}</div>;
	if (!storeData) return <div>데이터를 찾을 수 없습니다.</div>;

	console.log("Reviews:", storeData.reviews);

	return (
		<div className='review-page'>
			<h1 className='store-name'>{storeData.nickname} 리뷰</h1>
			<div className='review-list'>
				{storeData.reviews && storeData.reviews.length > 0 ? (
					storeData.reviews.map((review) => (
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
					))
				) : (
					<p className='no-reviews'>리뷰가 없습니다.</p>
				)}
			</div>
		</div>
	);
};

export default ReviewPage;
