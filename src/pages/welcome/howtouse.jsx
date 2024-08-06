import React from "react";
import { motion } from "framer-motion";
import { FaClipboardList, FaSearch, FaClock, FaWalking } from "react-icons/fa";
import "./howtouse.css";

function Howtouse() {
	const steps = [
		{
			number: 1,
			icon: <FaClipboardList />,
			description:
				"매일 저녁, 우리 동네 식당들이 그날 다 사용하지 못한 신선한 식재료를 우리 사이트에 등록합니다. <br /> 식재료, 간편한 밀키트, 사이드 형식 다양하게 등록합니다.",
		},
		{
			number: 2,
			icon: <FaSearch />,
			description:
				"소비자는 사이트를 통해 실시간으로 제공되는 식재료를 확인하고 원하는 품목을 선택할 수 있습니다.",
		},
		{
			number: 3,
			icon: <FaClock />,
			description:
				"주문 시 원하는 픽업 시간을 설정할 수 있습니다. 식당의 영업 시간 내에서 자유롭게 선택 가능합니다.",
		},
		{
			number: 4,
			icon: <FaWalking />,
			description: "지정된 시간에 해당 식당을 방문하여 식재료를 픽업하시면 됩니다.",
		},
	];

	return (
		<div className='how-to-use-container'>
			<motion.section
				className='how-to-use'
				initial={{ opacity: 0, y: 50 }}
				animate={{ opacity: 1, y: 0 }}
				transition={{ duration: 0.5 }}>
				<h2>이용 방법</h2>
				<div className='content-container'>
					<div className='steps-container'>
						{steps.map((step, index) => (
							<motion.div
								key={index}
								className='step-card'
								initial={{ opacity: 0, y: 50 }}
								animate={{ opacity: 1, y: 0 }}
								transition={{ delay: index * 0.2 }}>
								<div className='step-header'>
									<div className='step-icon'>{React.cloneElement(step.icon, { size: 40 })}</div>
									<div className='step-number'>Step {step.number}</div>
								</div>
								<div className='step-content'>
									<p dangerouslySetInnerHTML={{ __html: step.description }}></p>
								</div>
							</motion.div>
						))}
					</div>
					<motion.div
						className='image-container'
						initial={{ opacity: 0, x: 20 }}
						animate={{ opacity: 1, x: 0 }}
						transition={{ delay: 0.8, duration: 0.5 }}>
						<img src='src/photos/vegewellness.jpg' alt='Vege Wellness' />
					</motion.div>
				</div>
				<motion.p
					className='conclusion'
					initial={{ opacity: 0 }}
					animate={{ opacity: 1 }}
					transition={{ delay: 1 }}>
					쉽고 간편하게 다음 끼니를 더 합리적인 가격으로 준비하고, 건강하게 드실 수 있도록 베지가
					도와줍니다.
				</motion.p>
			</motion.section>
		</div>
	);
}

export default Howtouse;
