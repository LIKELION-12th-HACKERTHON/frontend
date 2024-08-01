import React from "react";
import "/src/sellers/seller_order/component/css/RecentOrder.css";

export default function RecentOrder() {
	return (
		<div className='OrderList'>
			<div className='orderbar'>
				<div className='row'>
					<h3>주문번호</h3>
				</div>
				<div className='row'>
					<h3>시간</h3>
				</div>
				<div className='row'>
					<h3>고객명</h3>
				</div>
				<div className='row'>
					<h3>주문내역</h3>
				</div>
				<div className='row'>
					<h3>총액</h3>
				</div>
				<div className='row'>
					<h3>상태</h3>
				</div>
				<div className='row'>
					<h3>액션</h3>
				</div>
			</div>
		</div>
	);
}
