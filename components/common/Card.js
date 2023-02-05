import { async } from '@firebase/util'
import Link from 'next/link'
import React, { useEffect, useState } from 'react'
import styles from './card.module.css'

export default function Card({
	user_email,
	location_id,
	name,
	ranking,
	type,
	photo,
	rating,
	num_reviews,
	is_closed,
	phone,
	address,
	website,
	web_url,
	description,
	like,
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
					{type == 'restaurants' && <img src='/restaurant.svg' className={styles['type']} />}
					{type == 'hotels' && <img src='/hotel.svg' className={styles['type']} />}
					{type == 'attractions' && <img src='/attraction.svg' className={styles['type']} />}
					<div className={styles['right']}>
						<div className={styles['right-top']}>
							<div className={styles['right-top-left']}>
								<div className={styles['name']}>{name}</div>
								<span>{ranking}</span>
							</div>
							<div className={styles['right-top-right']}>
								<div className={styles['right-top-right-top']}>
									{web_url && (
										<img
											src='/share.svg'
											onClick={() => {
												navigator.clipboard.writeText(web_url)
											}}
										/>
									)}
									{like && (
										<svg
											width='18'
											height='15'
											viewBox='0 0 18 15'
											fill={color}
											xmlns='http://www.w3.org/2000/svg'
											onClick={handleLike}
										>
											<path
												d='M2.83878 9.26183L2.83877 9.26182C1.75221 8.04081 1 6.6427 1 5.0298C1 2.80688 2.96701 1 5.4 1C6.5943 1 7.67825 1.56199 8.48038 2.33266L9 2.83189L9.51962 2.33266C10.3218 1.56199 11.4057 1 12.6 1C15.033 1 17 2.80687 17 5.0298C17 6.64271 16.2478 8.04082 15.1612 9.2618L15.1612 9.26182C14.0748 10.4827 12.6544 11.5264 11.3186 12.4305L11.3186 12.4305L9 14L6.68139 12.4305L6.68137 12.4305C5.34559 11.5264 3.92519 10.4827 2.83878 9.26183Z'
												fill={color}
												stroke='black'
												stroke-width='1.5'
											/>
										</svg>
									)}
								</div>
								{is_closed ? <img src='/closed.svg' /> : <img src='/open.svg' />}
							</div>
						</div>

						<div className={styles['line']}></div>
						<div className={styles['right-bottom']}>
							<div className={styles['right-bottom-left']}>
								<div className={styles['right-bottom-left-top']}>
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
								{description ? (
									<div className={styles['content']}>{description}</div>
								) : (
									<div className={styles['content']}>
										<span>Description not provided</span>
									</div>
								)}
							</div>
							<div className={styles['right-bottom-right']}>
								{phone && (
									<div className={styles['right-bottom-right-info']}>
										<img src='/phone.svg' />
										<span>{phone}</span>
									</div>
								)}
								{address && (
									<div className={styles['right-bottom-right-info']}>
										<img src='/map.svg' />
										<span>{address}</span>
									</div>
								)}
								{website && (
									<div className={styles['right-bottom-right-info']}>
										<img src='/website.svg' />
										<span>{website}</span>
									</div>
								)}
								{web_url && (
									<Link href={web_url}>
										<img src='/more-info.svg' className={styles['more-info']} />
									</Link>
								)}
							</div>
						</div>
					</div>
				</div>
			)}
		</>
	)
}
