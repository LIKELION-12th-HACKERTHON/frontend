import React, { useEffect, useState } from "react";
import axios from "axios";
import useMemberStore from "../../../store/memberStore";
import "./settingcompo.css";

const Sellersettingcompo = () => {
	const [storeData, setStoreData] = useState(null);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(null);
	const [isEditing, setIsEditing] = useState(false);
	const [editData, setEditData] = useState({});
	const setReviews = useMemberStore((state) => state.setReviews);

	useEffect(() => {
		fetchMemberInfo();
	}, [setReviews]);

	const fetchMemberInfo = async () => {
		try {
			setLoading(true);
			const token = localStorage.getItem("accessToken");
			if (!token) {
				throw new Error("로그인이 필요합니다.");
			}

			const response = await axios.get("https://ourvege.store/member/info/", {
				headers: {
					Authorization: `Bearer ${token}`,
				},
			});

			console.log("Member info:", response.data);
			setStoreData(response.data);
			setEditData({
				nickname: response.data.nickname,
				username: response.data.username,
			});
			setReviews(response.data.reviews);
		} catch (error) {
			console.error("Error fetching member data:", error);
			setError(error.response?.data?.message || error.message);
		} finally {
			setLoading(false);
		}
	};

	const handleEdit = () => {
		setIsEditing(true);
	};

	const handleCancel = () => {
		setIsEditing(false);
		setEditData({
			nickname: storeData.nickname,
			username: storeData.username,
		});
	};

	const handleChange = (e) => {
		setEditData({ ...editData, [e.target.name]: e.target.value });
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		try {
			const token = localStorage.getItem("accessToken");
			const response = await axios.patch(
				`https://ourvege.store/member/info/detail/${storeData.id}/`,
				editData,
				{
					headers: {
						Authorization: `Bearer ${token}`,
					},
				}
			);
			setStoreData((prevData) => ({ ...prevData, ...response.data }));
			setIsEditing(false);
			alert("정보가 성공적으로 수정되었습니다.");
		} catch (error) {
			console.error("Error updating data:", error);
			alert("정보 수정에 실패했습니다.");
		}
	};

	if (loading) return <div>로딩 중...</div>;
	if (error) return <div>에러: {error}</div>;
	if (!storeData) return <div>데이터를 찾을 수 없습니다.</div>;

	return (
		<div className='store-settings'>
			<h1 className='store-title'>{storeData.nickname || "가게"} 정보</h1>
			<form onSubmit={handleSubmit} className='store-info22'>
				<div className='info-group22'>
					<h2>위치 정보</h2>
					{["city", "district", "dong"].map((field) => (
						<p key={field}>
							<strong>{field.charAt(0).toUpperCase() + field.slice(1)}:</strong>
							{isEditing ? (
								<input type='text' name={field} value={editData[field]} onChange={handleChange} />
							) : (
								storeData[field]
							)}
						</p>
					))}
				</div>
				<div className='info-group22'>
					<h2>사용자 정보</h2>
					<p>
						<strong>닉네임:</strong>
						{isEditing ? (
							<input
								id='abcd'
								type='text'
								name='nickname'
								value={editData.nickname}
								onChange={handleChange}
							/>
						) : (
							storeData.nickname
						)}
					</p>
					<p>
						<strong>사용자 이름:</strong>
						{isEditing ? (
							<input
								id='abcd'
								type='text'
								name='username'
								value={editData.username}
								onChange={handleChange}
							/>
						) : (
							storeData.username
						)}
					</p>
				</div>

				{isEditing ? (
					<div className='button-group'>
						<button type='submit' className='save-button'>
							저장
						</button>
						<button type='button' onClick={handleCancel} className='cancel-button'>
							취소
						</button>
					</div>
				) : (
					<button type='button' onClick={handleEdit} className='edit-button'>
						정보 수정
					</button>
				)}
			</form>
		</div>
	);
};

export default Sellersettingcompo;
