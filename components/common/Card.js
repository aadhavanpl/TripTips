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
}) {
	return (
		<div className={styles['container']}>
			<img src={photo} className={styles['card-img']} />
			{type == 'restaurant' && <img src='/restaurant.svg' className={styles['type']} />}
			{type == 'hotel' && <img src='/hotel.svg' className={styles['type']} />}
			{type == 'attractions' && <img src='/attraction.svg' className={styles['type']} />}
			<div className={styles['right']}>
				<div className={styles['right-top']}>
					<div className={styles['right-top-left']}>
						{name}
						<span>{ranking}</span>
					</div>
					<div className={styles['right-top-right']}>
						<div className={styles['right-top-right-top']}>
							<img src='/share.svg' />
							<img src='/like.svg' />
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
						<div className={styles['right-bottom-right-info']}>
							<img src='/phone.svg' />
							{phone}
						</div>
						<div className={styles['right-bottom-right-info']}>
							<img src='/map.svg' />
							{address}
						</div>
						<div className={styles['right-bottom-right-info']}>
							<img src='/website.svg' />
							{website}
						</div>
						{/* <Link href={web_url}> */}
						<img src='/more-info.svg' className={styles['more-info']} />
						{/* </Link> */}
					</div>
				</div>
			</div>
		</div>
	)
}
