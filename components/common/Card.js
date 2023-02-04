import { async } from '@firebase/util'
import Link from 'next/link'
import React from 'react'
import styles from './card.module.css'

export default function Card({
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
	user_email,
}) {
	async function handleLike() {
		const data = {
			user_email: user_email,
			name: name,
			ranking: ranking,
			place_type: type,
			photo: photo,
			rating: rating,
			num_reviews: num_reviews,
			phone: phone,
			address: address,
			website: website,
			web_url: web_url,
			description: description,
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
										<Link href={web_url}>
											<img src='/share.svg' />
										</Link>
									)}
									<img src='/like.svg' onClick={handleLike} />
								</div>
								{is_closed ? <img src='/closed.svg' /> : <img src='/open.svg' />}
								<div className={styles['right-top-right-bottom']}></div>
							</div>
						</div>

						<div className={styles['line']}></div>
						<div className={styles['right-bottom']}>
							<div className={styles['right-bottom-left']}>
								<div className={styles['right-bottom-left-top']}>
									{rating && <img src='/stars.svg' />}
									<div className={styles['right-bottom-left-top-right']}>
										<img src='/users.svg' />
										{num_reviews}
									</div>
								</div>
								<div className={styles['content']}>{description}</div>
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
