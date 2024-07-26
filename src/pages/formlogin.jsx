import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../css/signup.css";
import AddressForm from "../components/addressform";

export default function FormLogin() {
	const [showform, setShowForm] = useState("signup");
	const navigate = useNavigate();
	const [formData, setFormData] = useState({
		job: "",
		name: "",
		userid: "",
		password: "",
		email: "",
		phnum: "",
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
		event.preventDefault(); // Prevent the default form submission
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

	const handleSubmit = (event) => {
		event.preventDefault();
		const {
			job,
			name,
			userid,
			password,
			email,
			phnum,
			address,
			extraAddress,
			sigungu,
			detailAddress,
		} = formData;
		console.log(
			job,
			name,
			userid,
			password,
			email,
			phnum,
			address,
			extraAddress,
			sigungu,
			detailAddress
		);
		// Handle the form submission logic here (e.g., API call)
	};

	return (
		<>
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

						<tr>
							<th>이름</th>
							<input
								name='name'
								id='name'
								placeholder='name'
								autoComplete='off'
								required
								onChange={handleChange}
							/>
						</tr>

						<tr>
							<th>아이디</th>
							<input
								name='userid'
								id='id'
								placeholder='id'
								autoComplete='off'
								required
								onChange={handleChange}
							/>
						</tr>

						<tr>
							<th>비밀번호</th>
							<input
								name='password'
								id='pw'
								placeholder='password'
								autoComplete='off'
								required
								onChange={handleChange}
							/>
						</tr>

						<tr>
							<th>이메일</th>
							<input
								name='email'
								id='email'
								placeholder='@gmail.com'
								autoComplete='off'
								required
								onChange={handleChange}
							/>
						</tr>
						<tr>
							<th>전화번호</th>
							<input
								name='phnum'
								id='phone'
								placeholder='010 -'
								autoComplete='off'
								required
								onChange={handleChange}
							/>
						</tr>
						<tr id='adth'>
							<th>주소</th>
							<AddressForm onAddressSelect={handleAddressSelect}></AddressForm>
						</tr>
						<tr id='btns'>
							<td colSpan='2'>
								<button type='submit' className='loginbtn' onClick={handleMultipleActions}>
									회원가입
								</button>
								<button type='reset' className='backbtn' onClick={handleClickBack}>
									되돌아가기
								</button>
							</td>
						</tr>
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

						<tr>
							<th>아이디</th>
							<input
								name='userid'
								placeholder='id'
								autoComplete='off'
								required
								onChange={handleChange}
							/>
						</tr>

						<tr>
							<th>비밀번호</th>
							<input
								name='password'
								placeholder='password'
								autoComplete='off'
								required
								onChange={handleChange}
							/>
						</tr>

						<tr id='btns'>
							<td colSpan='2'>
								<button type='submit' className='loginbtn' onClick={handleMultipleActions}>
									로그인
								</button>
								<button type='reset' className='backbtn' onClick={handleClickBack}>
									되돌아가기
								</button>
							</td>
						</tr>
					</form>
				</div>
			)}
		</>
	);
}
