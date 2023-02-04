import React from 'react'
import styles from './form.module.css'

export default function FilterSelect({ label, options, name, value, width, onChange }) {
	return (
		<div className={styles['container']}>
			<label className={styles['label']}>{label}</label>
			<div className={styles['wrapper']}>
				<select
					className={styles['select']}
					name={name}
					value={value}
					style={{ width: `${width}` }}
					onChange={onChange}
				>
					{options.map((item) => (
						<option key={item.value} value={item.value}>
							{item.label}
						</option>
					))}
				</select>
			</div>
		</div>
	)
}
