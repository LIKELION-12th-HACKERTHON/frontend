import React, { useEffect, useState } from "react";
import axios from "axios";
import useMemberStore from "../../../store/memberStore";
import { useParams } from "react-router-dom";
import "./settingcompo.css";

const Sellersettingcompo = () => {
	const [storeData, setStoreData] = useState(null);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(null);
	const memberStore = useMemberStore();

	useEffect(() => {
		const fetchStoreData = async () => {
			try {
				setLoading(true);
				const storeId = memberStore.loginMember.id;
				console.log(`Fetching data for store with id: ${storeId}`);
				const response = await axios.get(`https://ourvege.store/boss/post/${storeId}`);
				setStoreData(response.data);
				console.log("Store data:", response.data);
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
	if (!storeData) return <div>데이터를 찾을 수 없습니다.</div>;

	return (
		<div className='store-settings'>
			<h1 className='store-title'>{storeData.nickname || "가게"} 정보</h1>
			<div className='store-info'>
				<div className='info-group'>
					<h2>가게 정보</h2>
					<p>
						<strong>생성일:</strong> {new Date(storeData.created_at).toLocaleString()}
					</p>
					<p>
						<strong>마감 시간:</strong> {storeData.close}
					</p>
				</div>
				<div className='info-group'>
					<h2>위치 정보</h2>
					<p>
						<strong>도시:</strong> {storeData.city}
					</p>
					<p>
						<strong>구역:</strong> {storeData.district}
					</p>
					<p>
						<strong>동:</strong> {storeData.dong}
					</p>
					<p>
						<strong>상세 위치:</strong> {storeData.detail_location}
					</p>
				</div>
			</div>
			<button className='edit-button'>정보 수정</button>
		</div>
	);
};
export default Sellersettingcompo;
