import React, { useEffect } from "react";
import chefphoto from "../sellercss/minions.webp";
import { useNavigate } from "react-router-dom";
import useMemberStore from "../../store/memberStore";
import "../sellercss/sellerid.css";

function Sellerid() {
	const navigate = useNavigate();
	const memberStore = useMemberStore();

	useEffect(() => {
		console.log(`===시작===`);
		console.log(memberStore.loginMember);
	}, []);

	return (
		<div className='sellerid'>
			<div className='chefphotodiv'>
				<img src={chefphoto} className='chefphoto' alt='Chef' />
			</div>
			<div className='info'>
				<div className='nameinfo'>
					<div className='sellerinfo'>USERNAME:</div>{" "}
					<div className='sellerinfo'>{memberStore.loginMember.username}</div>
				</div>
				<div className='nameinfo'>
					<div className='sellerinfo'>USERSHOP:</div>{" "}
					<div className='sellerinfo'>{memberStore.loginMember.nickname}</div>
				</div>
				<div>
					<button onClick={() => navigate("/shopkeeper")}>나의 가게로 바로가기</button>
				</div>
				<div>
					<button>설정</button>
				</div>
			</div>
		</div>
	);
}

export default Sellerid;
