import React from "react";
import "../sellercss/sellerid.css";
import chefphoto from "../sellercss/minions.webp";
import { useNavigate } from "react-router-dom";

function Sellerid() {
	const navigate = useNavigate();

	return (
		<div className='sellerid'>
			<div className='chefphotodiv'>
				<img src={chefphoto} className='chefphoto' alt='Chef' />
			</div>
			<div className='info'>
				<div className='nameinfo'>
					<strong>USERNAME:</strong> <strong>STUART</strong>
				</div>
				<div className='nameinfo'>
					<strong>USERSHOP:</strong> <strong>썹웨이</strong>
				</div>
				<div>
					<button onClick={() => navigate("/sellershop")}>나의 가게로 바로가기</button>
				</div>
				<div>
					<button>설정</button>
				</div>
			</div>
		</div>
	);
}

export default Sellerid;
