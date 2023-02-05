import Link from 'next/link'
import React, { useState } from 'react'
import styles from './small-card.module.css'

export default function SmallCard({
	user_email,
	location_id,
	name,
	ranking,
	type,
	photo,
	rating,
	num_reviews,
	phone,
	address,
	website,
	web_url,
	description,
}) {
	async function handleLike() {
		setColor('#FF0000')
		const data = {
			user_email: user_email,
			location_id: location_id || '',
			name: name || '',
			ranking: ranking || '',
			place_type: type || '',
			photo: photo || '',
			rating: rating || '',
			num_reviews: num_reviews || '',
			phone: phone || '',
			address: address || '',
			website: website || '',
			web_url: web_url || '',
			description: description || '',
		}
		const apiUrlEndpoint = 'http://localhost:3000/api/like'
		const response = await fetch(apiUrlEndpoint, {
			method: 'POST',
			body: JSON.stringify({ data }),
			headers: {
				'Content-Type': 'application/json',
			},
		})
		const res = await response.json()
		console.log(res)
	}
	const [color, setColor] = useState('#ffffff')
	return (
		<>
			{name && (
				<div className={styles['container']}>
					{photo ? (
						<img src={photo} className={styles['card-img']} />
					) : (
						<img src='/holiday-image.jpg' className={styles['card-img']} />
					)}
					{type == 'restaurants' && <img src='/restaurant-small.svg' className={styles['type']} />}
					{type == 'hotels' && <img src='/hotel-small.svg' className={styles['type']} />}
					{type == 'attractions' && <img src='/attraction-small.svg' className={styles['type']} />}
					<div className={styles['right']}>
						<div className={styles['right-top']}>
							<div className={styles['right-top-left']}>
								<div className={styles['name']}>{name}</div>
								<span>{ranking}</span>
							</div>
							<div className={styles['right-top-right']}>
								{web_url && (
									<img
										src='/share.svg'
										onClick={() => {
											navigator.clipboard.writeText(web_url)
										}}
									/>
								)}
								<svg
									width='22'
									height='22'
									viewBox='0 0 22 22'
									fill={color}
									xmlns='http://www.w3.org/2000/svg'
									onClick={handleLike}
								>
									<path
										d='M5.39874 13.0318L5.39873 13.0318C4.40852 11.919 3.729 10.6516 3.729 9.19398C3.729 7.1961 5.49859 5.5625 7.69984 5.5625C8.77468 5.5625 9.75352 6.06848 10.4802 6.76668L10.9998 7.26591L11.5195 6.76668C12.2462 6.06848 13.225 5.5625 14.2998 5.5625C16.5011 5.5625 18.2707 7.1961 18.2707 9.19398C18.2707 10.6516 17.5912 11.919 16.6009 13.0318L16.6009 13.0318C15.6105 14.1448 14.314 15.0979 13.0902 15.9262L13.0902 15.9262L10.9998 17.3412L8.90948 15.9262L8.90946 15.9262C7.68567 15.0979 6.38914 14.1448 5.39874 13.0318ZM11.0349 17.365L11.0349 17.3649L11.0349 17.365Z'
										fill={color}
										stroke='black'
										stroke-width='1.5'
									/>
								</svg>
							</div>
						</div>
						<div className={styles['right-bottom']}>
							<div className={styles['right-bottom-top']}>
								<div className={styles['stars-wrapper']}>
									{rating &&
										[...Array(Math.ceil(Number(rating)))].map((e, index) => (
											<img src='/star.svg' key={index} />
										))}
								</div>
								<div className={styles['right-bottom-left-top-right']}>
									<img src='/users.svg' />
									{num_reviews}
								</div>
							</div>
							{web_url && (
								<Link href={web_url}>
									<img src='/more-info-small.svg' className={styles['more-info']} />
								</Link>
							)}
						</div>
					</div>
				</div>
			)}
		</>
	)
}
