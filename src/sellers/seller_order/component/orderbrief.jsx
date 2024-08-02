import React from "react";
import "/src/sellers/seller_order/component/css/orderbrief.css";

function OrderBrief() {
	return (
		<div>
			<div className='orderpart'>
				<div className='card' id='todayOrder'>
					<span>오늘의 주문</span>
					<span>가격 연결</span>
				</div>
				<div className='card' id='totalMoney'>
					<span>총 매출</span>
					<span>가격 연결</span>
				</div>
				<div className='card' id='orderincomplete'>
					<span>대기 중인 주문</span>
					<span>개수 연결</span>
				</div>
				<div className='card' id='ordercomplete'>
					<span>완료한 주문</span>
					<span>개수 연결</span>
				</div>
			</div>
		</div>
	);
}
export default OrderBrief;
