import FilterSelect from '@/components/common/FilterSelect'
import SmallCard from '@/components/common/SmallCard'
import Navbar from '@/components/home/Navbar'
import React, { useState } from 'react'
import styles from '../components/travel.module.css'

export default function Travel() {
	const [place, setPlace] = useState('')
	const [duration, setDuration] = useState('')

	function handleChange(e) {
		setPlace(e.target.value)
	}

	function handleSelect(e) {
		setDuration(e.target.value)
	}

	const options = {
		days: [
			{ value: '1', label: '1' },
			{ value: '2', label: '2' },
			{ value: '3', label: '3' },
			{ value: '4', label: '4' },
			{ value: '5', label: '5' },
			{ value: '6', label: '6' },
			{ value: '7', label: '7' },
		],
	}
	return (
		<>
			<Navbar
				color='black'
				border='1px solid #C0C0C0'
				position='fixed'
				bg='#f7f7f7'
				height='90px'
				userInfo={true}
			/>
			<div className={styles['container']}>
				<div className={styles['filter-wrapper']}>
					<FilterSelect label='Duration:' options={options.days} width='153px' />
					<div className={styles['filter-i']}>
						<FieldInput
							placeholder='Enter a place'
							name='place'
							value={place}
							onChange={handleSelect}
						/>
					</div>
					<img src='/filter-apply.svg' className={styles['apply']} />
				</div>
				<div className={styles['content']}></div>
			</div>
		</>
	)
}

function FieldInput({ placeholder, name, value, onChange }) {
	return (
		<div className={styles['ti-container']}>
			<div className={styles['ti-cover']}>
				<img src='/search.svg' />
			</div>
			<input
				className={styles['text-input']}
				name={name}
				value={value}
				placeholder={placeholder}
				onChange={onChange}
			/>
		</div>
	)
}

{
	/* <SmallCard
				user_email={user[0]?.email}
				location_id={item?.location_id}
				name={item?.name}
				ranking={item?.ranking}
				type={cardType}
				photo={item?.photo?.images?.medium?.url}
				rating={item?.rating}
				num_reviews={item?.num_reviews}
				is_closed={item?.is_closed}
				phone={item?.phone}
				address={item?.address}
				website={item?.website}
				web_url={item?.web_url}
				description={item?.description}
			/> */
}
