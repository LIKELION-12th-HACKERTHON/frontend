import React, { useEffect, useState } from "react";
import "./Itemsubmit.css";
import api from "../../../components/api";
import { useNavigate } from "react-router-dom";

const Itemsubmit = () => {
	const selectTypelist = ["밀키트", "따로따로", "사이드", "음료"];
	const [selected, setSelected] = useState(selectTypelist[0]);
	const [nowTime, setNowTime] = useState(null);
	const [orderItem, setOrderItem] = useState({
		type: selected,
		product: "",
		close: "",
		quantity: 0,
		price: 0,
		body: "",
		image: null,
	});

	const navigate = useNavigate();

	useEffect(() => {
		const token = localStorage.getItem("accessToken");
		if (!token) {
			alert("로그인이 필요합니다.");
			navigate("/login");
		}
	}, [navigate]);

	const handleSelect = (e) => {
		setSelected(e.target.value);
		setOrderItem({ ...orderItem, type: e.target.value });
	};

	const handleChange = (e) => {
		const { name, value, type } = e.target;
		setOrderItem({
			...orderItem,
			[name]: type === "file" ? e.target.files[0] : value,
		});
	};

	const onTime = () => {
		const currentTime = new Date().toLocaleString();
		setNowTime(currentTime);
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		onTime();

		const formData = new FormData();
		for (const key in orderItem) {
			if (key === "image" && orderItem[key] instanceof File) {
				formData.append(key, orderItem[key], orderItem[key].name);
			} else {
				formData.append(key, orderItem[key]);
			}
		}

		try {
			const response = await api.post("/boss/post/", formData, {
				headers: { "Content-Type": "multipart/form-data" },
			});
			console.log(response.data);
			alert("상품이 등록되었습니다.");
		} catch (error) {
			console.error("Error submitting form:", error);
			if (error.response && error.response.status === 401) {
				alert("인증에 실패했습니다. 다시 로그인해주세요.");
			} else {
				alert("상품 등록에 실패했습니다.");
			}
		}
	};

	return (
		<div className='item-submit-container'>
			<h1 className='item-submit-title'>상품 등록</h1>
			<form className='item-submit-form' onSubmit={handleSubmit}>
				<div className='form-group'>
					<label htmlFor='type'>상품 유형</label>
					<select id='type' name='type' onChange={handleSelect} value={selected}>
						{selectTypelist.map((item) => (
							<option value={item} key={item}>
								{item}
							</option>
						))}
					</select>
				</div>
				<div className='form-group'>
					<label htmlFor='product'>상품명</label>
					<input
						id='product'
						name='product'
						placeholder='상품명을 입력하세요'
						onChange={handleChange}
					/>
				</div>
				<div className='form-group'>
					<label htmlFor='close'>마감일</label>
					<input id='close' name='close' type='time' onChange={handleChange} />
				</div>
				<div className='form-group'>
					<label htmlFor='price'>가격</label>
					<input
						id='price'
						name='price'
						type='number'
						placeholder='가격을 입력하세요'
						onChange={handleChange}
					/>
				</div>
				<div className='form-group'>
					<label htmlFor='quantity'>수량</label>
					<input
						id='quantity'
						name='quantity'
						type='number'
						placeholder='수량을 입력하세요'
						onChange={handleChange}
					/>
				</div>
				<div className='form-group'>
					<label htmlFor='body'>상품 설명</label>
					<textarea
						id='body'
						name='body'
						placeholder='상품 설명을 입력하세요'
						onChange={handleChange}
					/>
				</div>
				<div className='form-group'>
					<label htmlFor='image'>상품 이미지</label>
					<input id='image' name='image' type='file' accept='image/*' onChange={handleChange} />
				</div>
				<button type='submit' className='submitbtn'>
					등록
				</button>
				{nowTime && <p>기록된 시간: {nowTime}</p>}
			</form>
		</div>
	);
};

export default Itemsubmit;
