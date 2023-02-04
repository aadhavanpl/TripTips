import React from 'react'
import styles from './loader.module.css'

export default function Loader({ show }) {
	return (
		<>
			{show && (
				<div className={styles['loader']}>
					<span></span>
				</div>
			)}
		</>
	)
}
