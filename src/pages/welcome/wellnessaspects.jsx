import React from "react";
import { motion } from "framer-motion";
import { FaDumbbell, FaUsers, FaCoins, FaYinYang, FaLeaf, FaBrain } from "react-icons/fa";

import "./wellnessaspects.css";

function WellnessAspects() {
	const aspects = [
		{
			icon: FaDumbbell,
			title: "신체적 웰니스",
			points: ["신선한 식재료로 건강한 식단을 촉진 및 개선"],
		},
		{
			icon: FaBrain,
			title: "정신적 웰니스",
			points: ["식사 준비 스트레스를 감소", "건강한 식사로 자기 관리 의식을 상승"],
		},
		{
			icon: FaUsers,
			title: "사회적 웰니스",
			points: ["지역 사회 상호작용을 증진.", "식재료 공유로 공동체 의식을 강화"],
		},
	];

	const additionalAspects = [
		{
			icon: FaLeaf,
			title: "환경적 웰니스",
			points: ["식품 폐기물을 감소", "환경 보호에 기여"],
		},
		{
			icon: FaCoins,
			title: "경제적 웰니스",
			points: ["저렴한 가격", "합리적인 소비"],
		},
	];

	return (
		<motion.section
			className='wellness-aspects'
			initial={{ opacity: 0 }}
			animate={{ opacity: 1 }}
			transition={{ duration: 0.8 }}>
			<motion.h2
				initial={{ y: -20, opacity: 0 }}
				animate={{ y: 0, opacity: 1 }}
				transition={{ delay: 0.2, duration: 0.5 }}>
				웰니스의 다양한 측면
			</motion.h2>
			<div className='aspects-container'>
				{aspects.map((aspect, index) => (
					<motion.div
						key={index}
						className='aspect'
						initial={{ opacity: 0, y: 20 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ delay: index * 0.2 + 0.5, duration: 0.5 }}>
						<aspect.icon className='aspect-icon' size='2em' />
						<h3>{aspect.title}</h3>
						<ul>
							{aspect.points.map((point, i) => (
								<li key={i}>{point}</li>
							))}
						</ul>
					</motion.div>
				))}
			</div>
			<div className='additional-aspects-container'>
				{additionalAspects.map((aspect, index) => (
					<motion.div
						key={index}
						className='aspect'
						initial={{ opacity: 0, y: 20 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ delay: index * 0.2 + 0.5, duration: 0.5 }}>
						<aspect.icon className='aspect-icon' size='2em' />
						<h3>{aspect.title}</h3>
						<ul>
							{aspect.points.map((point, i) => (
								<li key={i}>{point}</li>
							))}
						</ul>
					</motion.div>
				))}
			</div>
		</motion.section>
	);
}

export default WellnessAspects;
