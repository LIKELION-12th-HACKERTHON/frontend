import React from "react";

const Form1s = () => {
	return (
		<div className='jobform'>
			<div className='photoandjob'>
				<div className='job'>
					<div className='owner'>
						<input id='owner' name='seller' type='radio' value='판매자' onChange={handleChange} />
						<label htmlFor='owner' id='ownerLabel'>
							저는 가게를 운영하는 사장이예요
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
							음식을 구매하는 고객이예요
						</label>
					</div>
					<div className='phtodiv'>
						<img src={image} className='sellertype' alt='seller type' />{" "}
					</div>
				</div>
			</div>
			<div className='form1'>
				<form onSubmit={signupAPI}>
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
						<div className='thdiv'>가게명</div>
						<input
							name='nickname'
							id='nickname'
							placeholder='가게명'
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
							가게주소
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
		</div>
	);
};

export default Form1s;
