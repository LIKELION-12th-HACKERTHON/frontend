import React from "react";
import { motion } from "framer-motion";
import { FaLeaf, FaHeart, FaBrain } from "react-icons/fa";
import "./wellnessdefinition.css";

function WellnessDefinition() {
	return (
		<motion.div
			className='wellness-definition'
			initial={{ opacity: 0, y: 20 }}
			animate={{ opacity: 1, y: 0 }}
			transition={{ duration: 0.5 }}>
			<motion.h1
				initial={{ opacity: 0 }}
				animate={{ opacity: 1 }}
				transition={{ delay: 0.2, duration: 0.5 }}>
				웰니스의 새로운 정의
			</motion.h1>
			<motion.p
				initial={{ opacity: 0 }}
				animate={{ opacity: 1 }}
				transition={{ delay: 0.4, duration: 0.5 }}>
				웰니스는 단순한 질병 부재가 아닌 다양한 측면의 균형을 추구하는 과정입니다.
			</motion.p>
			<div className='wellness-icons'>
				<motion.div
					className='icon-container'
					whileHover={{ scale: 1.1 }}
					whileTap={{ scale: 0.9 }}>
					<FaLeaf className='wellness-icon' />
					<span>신체적 건강</span>
				</motion.div>
				<motion.div
					className='icon-container'
					whileHover={{ scale: 1.1 }}
					whileTap={{ scale: 0.9 }}>
					<FaHeart className='wellness-icon' />
					<span>정서적 안정</span>
				</motion.div>
				<motion.div
					className='icon-container'
					whileHover={{ scale: 1.1 }}
					whileTap={{ scale: 0.9 }}>
					<FaBrain className='wellness-icon' />
					<span>정신적 성장</span>
				</motion.div>
			</div>
			<motion.p
				className='highlight'
				initial={{ opacity: 0 }}
				animate={{ opacity: 1 }}
				transition={{ delay: 0.6, duration: 0.5 }}>
				VEGE와 함께하는 신선한 웰니스, 당신의 삶에 자연을 담다
			</motion.p>
		</motion.div>
	);
}

export default WellnessDefinition;
