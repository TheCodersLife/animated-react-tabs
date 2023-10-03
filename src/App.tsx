/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from 'react';
import { AnimatePresence, Variants, motion } from 'framer-motion'

import styles from './App.module.scss'

const tabs = [
	{
		name: 'tab1',
		label: 'Tab 1',
		render: () => {
			return <p>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Incidunt eveniet asperiores beatae cumque quae repudiandae sequi expedita eum architecto hic. Quidem dolores quaerat nemo pariatur modi aspernatur eum blanditiis repellat?</p>
		}
	},
	{
		name: 'tab2',
		label: 'Tab 2',
		render: () => {
			return <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Expedita in non earum natus explicabo est aspernatur porro molestias fugiat eaque dignissimos, accusantium qui fugit praesentium ad cumque dolore temporibus excepturi.</p>
		}
	},
	{
		name: 'tab3',
		label: 'Tab 3',
		render: () => {
			return <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Quis eos sequi ducimus voluptas, accusamus amet? Ducimus, velit doloremque atque est quidem ullam nisi quod. Aut quisquam ipsa exercitationem mollitia ratione?</p>
		}
	}
];

const tabContentVariants: Variants = {
	initial: {
		y: 10,
		opacity: 0
	},
	enter: {
		y: 0,
		opacity: 1
	},
	exit: {
		y: -10,
		opacity: 0
	}
}

function App() {

	const [activeTab, setActiveTab] = useState<any>(tabs[0])

	const handleClick = (e: any, tab: any) => {
		e.preventDefault()

		setActiveTab(tab)
	}

	const isSelected = (tab: any) => activeTab.name === tab.name

	return (
		<div className={styles.tabWrapper}>

			<div className={styles.tabHeader}>
				{tabs.map((tab) => (
					<div
						key={tab.name}
						className={[styles.tabItem, isSelected(tab) ? styles.selected : ''].join(' ')}
					>
						<a href='#' onClick={(e: any) => handleClick(e, tab)} >
							{tab.label}
						</a>

						{isSelected(tab) && <motion.div layoutId='indicator' className={styles.indicator} />}
					</div>
				))}
			</div>

			<div className={styles.tabContent}>
				<AnimatePresence mode='wait'>
					<motion.div
						key={activeTab.name || "empty"}
						variants={tabContentVariants}
						initial="initial"
						animate="enter"
						exit="exit"
						transition={{
							duration: .3
						}}
					>
						{activeTab && activeTab?.render()}
					</motion.div>
				</AnimatePresence>
			</div>

		</div>
	)
}

export default App
