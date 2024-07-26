import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import "../css/signup.css";
import AddressForm from "../components/addressform";

export default function FormLogin() {
	const [showform, setShowForm] = useState("signup");
	const navigate = useNavigate();
	const [formData, setFormData] = useState({
		job: "",
		username: "",
		email: "",
		password1: "",
		password2: "",
		nickname: "",
		phone_number: "",
		address: "",
		extraAddress: "",
		sigungu: "",
		detailAddress: "",
	});

	const handleShowSignup = () => setShowForm("signup");
	const handleShowLogin = () => setShowForm("login");
	const handleClickBack = (event) => {
		event.preventDefault();
		navigate("/"); // Navigate to the main page
	};

	const handleMultipleActions = (event) => {
		handlelinkjob(event);
		handleSubmit(event);
	};

	const handlelinkjob = (event) => {
		event.preventDefault();
		const { job } = formData;
		if (job === "owner") {
			navigate("/seller");
		} else {
			navigate("/customer");
		}
	};

	const handleChange = (e) => {
		const { name, value } = e.target;
		setFormData((prevState) => ({
			...prevState,
			[name]: value,
		}));
	};

	const handleAddressSelect = (addressData) => {
		setFormData((prevState) => ({
			...prevState,
			...addressData,
		}));
	};

	const handleSubmit = async (event) => {
		event.preventDefault();
		const {
			job,
			username,
			email,
			password1,
			password2,
			nickname,
			phone_number,
			address,
			extraAddress,
			sigungu,
			detailAddress,
		} = formData;
		if (password1 !== password2) {
			alert("비밀번호가 일치하지 않습니다.");
			return;
		}

		// API 요청을 위한 데이터 구성
		const requestData = {
			job,
			username,
			email,
			password1,
			password2, // 서버에 확인 비밀번호도 전송
			nickname,
			phone_number,
			address,
			extraAddress,
			sigungu,
			detailAddress,
		};

		try {
			// 회원가입 API 요청
			const response = await axios.post("https://ourvege.shop/member/signup/", requestData);

			if (response.status !== 200) {
				// 서버 응답이 정상적이지 않은 경우
				throw new Error(`HTTP error! status: ${response.status}`);
			}

			// 회원가입 성공 처리
			alert("회원가입이 성공적으로 완료되었습니다.");
			navigate("/login");
		} catch (error) {
			console.error("회원가입 중 오류가 발생했습니다:", error);
			alert("회원가입 중 오류가 발생했습니다. 다시 시도해주세요.");
		}
	};

	return (
		<>
			<button onClick={() => navigate("/")}>Homepage</button>
			<div className='navlogin'>
				<div className={`show_signup ${showform === "signup" ? "active" : ""}`}>
					<button className='btn' id='sgp' onClick={handleShowSignup}>
						회원가입
					</button>
				</div>
				<div className={`show_login ${showform === "login" ? "active" : ""}`}>
					<button className='btn' id='lgn' onClick={handleShowLogin}>
						로그인
					</button>
				</div>
			</div>
			{showform === "signup" ? (
				<div className='form1'>
					<form onSubmit={handleSubmit}>
						<div className='job'>
							<div className='owner'>
								<input
									id='owner'
									name='job'
									type='radio'
									value='owner'
									checked={formData.job === "owner"}
									onChange={handleChange}
								/>
								<label htmlFor='owner' id='ownerLabel'>
									사장님
								</label>
							</div>

							<div className='customer'>
								<input
									id='customer'
									name='job'
									type='radio'
									value='customer'
									checked={formData.job === "customer"}
									onChange={handleChange}
								/>
								<label htmlFor='customer' id='customerLabel'>
									고객
								</label>
							</div>
						</div>

						<div className='formdivdiv'>
							<div className='thdiv'>이름</div>
							<input
								name='username'
								id='name'
								placeholder='name'
								autoComplete='off'
								required
								onChange={handleChange}
							/>
						</div>
						<div className='formdivdiv'>
							<div className='thdiv'>이메일</div>
							<input
								name='email'
								id='email'
								placeholder='@gmail.com'
								autoComplete='off'
								required
								onChange={handleChange}
							/>
						</div>
						<div className='formdivdiv'>
							<div className='thdiv'>비밀번호</div>
							<input
								name='password1'
								id='pw'
								placeholder='password'
								autoComplete='off'
								required
								onChange={handleChange}
							/>
						</div>
						<div className='formdivdiv'>
							<div className='thdiv'>비밀번호 재확인</div>
							<input
								name='password2'
								id='pw'
								placeholder='password'
								autoComplete='off'
								required
								onChange={handleChange}
							/>
						</div>
						<div className='formdivdiv'>
							<div className='thdiv'>닉네임</div>
							<input
								name='nickname'
								id='nickname'
								placeholder='nickname'
								autoComplete='off'
								required
								onChange={handleChange}
							/>
						</div>

						<div className='formdivdiv'>
							<div className='thdiv'>전화번호</div>
							<input
								name='phone_number'
								id='phone'
								placeholder='010 -'
								autoComplete='off'
								required
								onChange={handleChange}
							/>
						</div>
						<div className='formdivdiv' id='adth'>
							<div className='thdiv'>주소</div>
							<AddressForm onAddressSelect={handleAddressSelect}></AddressForm>
						</div>
						<div className='formdivdiv' id='btns'>
							<div className='trspan' colSpan='2'>
								<button type='submit' className='loginbtn'>
									{/* onClick={handleMultipleActions} */}
									회원가입
								</button>
								<button type='reset' className='backbtn' onClick={handleClickBack}>
									되돌아가기
								</button>
							</div>
						</div>
					</form>
				</div>
			) : (
				<div className='form2'>
					<form onSubmit={handleSubmit}>
						<div className='job'>
							<div className='owner'>
								<span className='owner'>
									<input
										id='owner'
										name='job'
										type='radio'
										value='owner'
										checked={formData.job === "owner"}
										onChange={handleChange}
									/>
									<label htmlFor='owner' id='ownerLabel'>
										사장님
									</label>
								</span>
							</div>

							<div className='customer'>
								<span className='customer'>
									<input
										id='customer'
										name='job'
										type='radio'
										value='customer'
										checked={formData.job === "customer"}
										onChange={handleChange}
									/>
									<label htmlFor='customer' id='customerLabel'>
										고객
									</label>
								</span>
							</div>
						</div>

						<div className='formdivdiv'>
							<div className='thdiv'>이메일</div>
							<input
								name='email'
								placeholder='email@naver.com'
								autoComplete='off'
								required
								onChange={handleChange}
							/>
						</div>

						<div className='formdivdiv'>
							<div className='thdiv'>비밀번호</div>
							<input
								name='password1'
								placeholder='password'
								autoComplete='off'
								required
								onChange={handleChange}
							/>
						</div>

						<div className='formdivdiv' id='btns'>
							<div className='trspan' colSpan='2'>
								<button type='submit' className='loginbtn'>
									{/* onClick={handleMultipleActions */}
									로그인
								</button>
								<button type='reset' className='backbtn' onClick={handleClickBack}>
									되돌아가기
								</button>
							</div>
						</div>
					</form>
				</div>
			)}
		</>
	);
}
