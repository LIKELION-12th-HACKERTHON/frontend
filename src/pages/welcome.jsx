import React from "react";
import { Element } from "react-scroll";
import { motion } from "framer-motion";
import WellnessDefinition from "./welcome/wellnessdefinition";
import WellnessAspects from "./welcome/wellnessaspects";
import HowToUse from "./welcome/howtouse";
import WellnessLifestyle from "./welcome/wellnesslifestyle";
import "./welcome.css";

function Welcome() {
	return (
		<div className='Welcomediv'>
			<motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1 }}>
				<Element name='definition'>
					<WellnessDefinition />
				</Element>
				<Element name='aspects'>
					<WellnessAspects />
				</Element>
				<Element name='howto'>
					<HowToUse />
				</Element>
				<Element name='lifestyle'>
					<WellnessLifestyle />
				</Element>
			</motion.div>
		</div>
	);
}

export default Welcome;
