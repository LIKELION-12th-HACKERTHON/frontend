import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "../css/signup.css";
import AddressForm from "../components/addressform";
import useMemberStore from "../store/memberStore";

export default function FormLogin() {
	const memberStore = useMemberStore();

	const navigate = useNavigate();
	const [address, setAddress] = useState({
		city: "",
		district: "",
		dong: "",
	});
	const [formData, setFormData] = useState({
		username: "",
		email: "",
		password1: "",
		password2: "",
		nickname: "",
		phone_number: "",
		seller: "구매자",
	});

	const signupAPI = (event) => {
		event.preventDefault();

		console.log(formData);

		const API = "https://ourvege.store/member/signup/";
		axios
			.post(
				API,
				{
					...formData,
					city: address.city, // city 필드 추가
					district: address.district, // district 필드 추가
					dong: address.dong, // dong 필드 추가
				},
				{
					headers: {
						"Content-Type": "application/json",
					},
				}
			)
			.then((result) => {
				console.log(result);
				window.alert("회원가입완료!");
				if (formData.seller === "구매자") {
					navigate("/customer");
				} else {
					navigate("/seller");
				}
			})
			.catch((error) => {
				window.alert("회원가입이 정상적으로 되지 않았습니다.");
				console.log(error.response.data);
			});
	};

	const login = async (event) => {
		event.preventDefault();
		const API = "https://ourvege.store/member/login/";
		try {
			const response = await axios.post(API, {
				username: formData.username,
				email: formData.email,
				password: formData.password,
			});
			console.log("로그인성공", response.data.user.username);
			navigate(`/sellershop`);
			//상태관리에 저장
			memberStore.setLoginMember(response.data.user);
		} catch (error) {
			console.error("로그인실패", error.response?.data || error.message);
		}
	};

	const [showform, setShowForm] = useState("signup");
	const handleShowSignup = () => {
		setShowForm("signup");
	};
	const handleShowLogin = () => {
		setShowForm("login");
	};

	const handleChange = (e) => {
		console.log(e.target.value);
		setFormData({
			...formData,
			[e.target.name]: e.target.value,
		});
	};

	const handlepage = (event) => {
		event.preventDefault();
		navigate("/seller");
	};
	const handleClickBack = (event) => {
		event.preventDefault();
		navigate("/"); // Main page path로 이동
	};

	const form1 = (
		<div className='form1'>
			<form onSubmit={signupAPI}>
				<div className='job'>
					<div className='owner'>
						<input id='owner' name='seller' type='radio' value='판매자' onChange={handleChange} />
						<label htmlFor='owner' id='ownerLabel'>
							사장님
						</label>
					</div>

					<div className='customer'>
						<input
							id='customer'
							name='seller'
							type='radio'
							value='구매자'
							defaultChecked={true}
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
						onChange={handleChange}
						required
					/>
				</div>

				<div className='formdivdiv'>
					<div className='thdiv'>이메일</div>
					<input
						name='email'
						id='email'
						placeholder='@gmail.com'
						autoComplete='none'
						onChange={handleChange}
						required
					/>
				</div>

				<div className='formdivdiv'>
					<div className='thdiv'>비밀번호</div>
					<input
						name='password1'
						id='pw1'
						placeholder='password'
						autoComplete='off'
						onChange={handleChange}
						required
					/>
				</div>

				<div className='formdivdiv'>
					<div className='thdiv'> 비밀번호 재확인</div>
					<input
						name='password2'
						id='pw2'
						placeholder='password'
						autoComplete='off'
						onChange={handleChange}
						required
					/>
				</div>

				<div className='formdivdiv'>
					<div className='thdiv'>닉네임</div>
					<input
						name='nickname'
						id='nickname'
						placeholder='nickname'
						autoComplete='off'
						onChange={handleChange}
						required
					/>
				</div>

				<div className='formdivdiv'>
					<div className='thdiv'>전화번호</div>
					<input
						name='phone_number'
						id='phone_number'
						placeholder='010 -'
						autoComplete='off'
						onChange={handleChange}
						required
					/>
				</div>

				<div className='formdivdiv'>
					<div className='thdiv' id='adth'>
						주소
					</div>
					<AddressForm onAddressSelect={setAddress} />
				</div>

				<div className='formdivdiv' id='btns'>
					<button className='loginbtn' type='submit'>
						회원가입
					</button>
					<button className='backbtn' onClick={handleClickBack}>
						되돌아가기
					</button>
				</div>
			</form>
		</div>
	);

	const form2 = (
		<div className='form2'>
			<form onSubmit={login}>
				<div className='job'>
					<div className='owner'>
						<span className='owner'>
							<input id='owner' name='job' type='radio' value='owner' />
							<label htmlFor='owner' id='ownerLabel'>
								사장님
							</label>
						</span>
					</div>

					<div className='customer'>
						<span className='customer'>
							<input id='customer' name='job' type='radio' value='customer' defaultChecked={true} />
							<label htmlFor='customer' id='customerLabel'>
								고객
							</label>
						</span>
					</div>
				</div>

				<div className='formdivdiv'>
					<div className='thdiv'>아이디</div>
					<input
						name='username'
						placeholder='id'
						autoComplete='off'
						onChange={handleChange}
						required
					/>
				</div>

				<div className='formdivdiv'>
					<div className='thdiv'>이메일</div>
					<input
						name='email'
						placeholder='email'
						autoComplete='off'
						onChange={handleChange}
						required
					/>
				</div>

				<div className='formdivdiv'>
					<div className='thdiv'>비밀번호</div>
					<input
						name='password'
						placeholder='password'
						autoComplete='off'
						onChange={handleChange}
						required
					/>
				</div>

				<div className='formdivdiv' id='btns'>
					<button className='loginbtn'>로그인</button>
					<button className='backbtn' onClick={handleClickBack}>
						되돌아가기
					</button>
				</div>
			</form>
		</div>
	);

	return (
		<>
			<div className='navlogin'>
				<div className={`show_signup ${showform === "signup" ? "active" : ""}`}>
					<button className='btn' id='sgp' onClick={() => setShowForm("signup")}>
						회원가입
					</button>
				</div>
				<div className={`show_login ${showform === "login" ? "active" : ""}`}>
					<button className='btn' id='lgn' onClick={() => setShowForm("login")}>
						로그인
					</button>
				</div>
			</div>
			{showform === "signup" ? form1 : form2}
		</>
	);
}
