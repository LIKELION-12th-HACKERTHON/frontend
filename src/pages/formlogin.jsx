import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "../css/signup.css";
import AddressForm from "../components/addressform";
import useMemberStore from "../store/memberStore";
import shopimg from "../sellers/sellerphotos/shoprestraunt.png";
import clientimg from "../sellers/sellerphotos/client.png";
import Sellernav from "../sellers/sellernav";
import Cookies from "js-cookie";

export default function FormLogin() {
	const [isExpanded, seetIsExpanded] = useState(false);
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
	const [image, setImage] = useState(clientimg); // 초기 이미지를 고객 이미지로 설정

	const signupAPI = (event) => {
		event.preventDefault();

		console.log(formData);

		const API = "https://ourvege.store/member/signup/";
		axios
			.post(
				API,
				{
					...formData,
					city: address.city,
					district: address.district,
					dong: address.dong,
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
		const APIlogin = "https://ourvege.store/member/login/";

		const loginData = {
			seller: formData.seller,
			username: formData.username,
			password: formData.password,
		};

		console.log("Login request data:", loginData); // username 대신 loginData로 수정

		try {
			const response = await axios.post(APIlogin, loginData, {
				headers: {
					"Content-Type": "application/json",
				},
			});

			console.log("로그인 응답:", response.data);
			window.alert("로그인완료!");
			memberStore.setLoginMember(response.data.user);

			if (formData.seller === "구매자") {
				navigate("/customer");
			} else {
				navigate("/sellershop");
			}
		} catch (error) {
			console.error("로그인 실패", error.response?.data || error.message);
			if (error.response) {
				console.error("서버 응답:", error.response.data);
				console.error("상태 코드:", error.response.status);
				console.error("헤더:", error.response.headers);
			}
			window.alert("로그인에 실패했습니다. 다시 시도해주세요.");
		}
	};

	const [showform, setShowForm] = useState("login");
	const handleShowSignup = () => {
		setShowForm("signup");
		setIsExpanded(true);
	};
	const handleShowLogin = () => {
		setShowForm("login");
		setIsExpanded(false);
	};

	const handleChange = (e) => {
		const { name, value } = e.target;
		console.log(value);
		setFormData({
			...formData,
			[name]: value,
		});

		// 'seller' 값이 변경될 때 이미지를 변경
		if (name === "seller") {
			showImg(value);
		}
	};

	const showImg = (seller) => {
		if (seller === "구매자") {
			setImage(clientimg);
		} else if (seller === "사장님" || seller === "판매자") {
			setImage(shopimg);
		}
	};

	const handleClickBack = (event) => {
		event.preventDefault();
		navigate("/"); // Main page path로 이동
	};

	const form1 = (
		<div className='jobform'>
			<div className='photoandjob'>
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
							고객님
						</label>
					</div>
				</div>
			</div>
			<div className='form1'>
				<form onSubmit={signupAPI}>
					<div className='formcontent'>
						<div className='firstpart'>
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
								<div className='thdiv'>{formData.seller === "구매자" ? "닉네임" : "가게 이름"}</div>
								<input
									name='nickname'
									id='nickname'
									placeholder={formData.seller === "구매자" ? "nickname" : "가게 이름"}
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
						</div>

						<div className='adresspart'>
							<div className='formdivdiv'>
								<div className='thdiv' id='adth'>
									{formData.seller === "구매자" ? "주소" : "가게 주소"}
								</div>
								<AddressForm onAddressSelect={setAddress} />
							</div>
						</div>

						<div className='formdivdiv' id='btns'>
							<button className='loginbtn' type='submit'>
								회원가입
							</button>
							<button className='backbtn' onClick={handleClickBack}>
								되돌아가기
							</button>
						</div>
					</div>
				</form>
			</div>
		</div>
	);

	const form2 = (
		<div className='jobform'>
			<div className='photoandjob'>
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
							고객님
						</label>
					</div>
				</div>
			</div>
			<div className='form2'>
				<form onSubmit={login}>
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

					{/* <div className='formdivdiv'>
						<div className='thdiv'></div>
						<input
							name='email'
							placeholder='email'
							autoComplete='off'
							onChange={handleChange}
							required
						/>
					</div> */}

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
		</div>
	);

	return (
		<div className={`login-container ${showform === "signup" ? "signup-mode" : "login-mode"}`}>
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
		</div>
	);
}
