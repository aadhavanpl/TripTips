import React, { useEffect, useState } from 'react'
import styles1 from '../components/dashboard-profile-card.module.css'
import styles from '../components/dashboard.module.css'
import Navbar from '@/components/home/Navbar'

import { useGlobalContext } from '@/lib/global-context'
import Card from '@/components/common/Card'

export default function Dashboard() {
	const { user } = useGlobalContext()
	const [fetched, setFetched] = useState([])

	useEffect(() => {
		async function getFetched() {
			if (!user || !user?.length) return
			const data = { user_email: user[0]?.email }
			const apiUrlEndpoint = 'http://localhost:3000/api/fetch-liked'
			const response = await fetch(apiUrlEndpoint, {
				method: 'POST',
				body: JSON.stringify({ data }),
				headers: {
					'Content-Type': 'application/json',
				},
			})
			const res = await response.json()
			console.log(res)
			setFetched(res)
		}
		getFetched()
	}, [user])
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
				<div className={styles['dashboard-vertical-wrapper']}>
					<span className={styles['morning']}>Dashboard:</span>
					{user && user.length > 0 && (
						<DashboardProfileCard
							name={user[0]?.displayName}
							email={user[0]?.email}
							img={user[0]?.photoURL}
						/>
					)}
				</div>
				<div className={styles['dashboard-vertical-wrapper']}>
					<span className={styles['sub-heading']}>Liked locations: </span>
					<div className={styles['cover']}>
						<div className={styles['left']}>
							<div className={styles['left-cover']}>
								<img src='/restaurant.svg' width='84px' height='19px' />
								{fetched?.length > 0 &&
									fetched.map((item, index) => (
										<div key={index}>{item.place_type == 'restaurants' && <>{item?.name}</>}</div>
									))}
							</div>
							<div className={styles['left-cover']}>
								<img src='/hotel.svg' width='51px' height='19px' />
								{fetched?.length > 0 &&
									fetched.map((item, index) => (
										<div key={index}>{item.place_type == 'hotels' && <>{item?.name}</>}</div>
									))}
							</div>
							<div className={styles['left-cover']}>
								<img src='/attraction.svg' width='83px' height='19px' />
								{fetched?.length > 0 &&
									fetched.map((item, index) => (
										<div key={index}>{item.place_type == 'attractions' && <>{item?.name}</>}</div>
									))}
							</div>
						</div>
						<div className={styles['right']}>
							{fetched?.length > 0 &&
								fetched.map((item, index) => (
									<div key={index}>
										<Card
											user_email={user[0]?.email}
											location_id={item?.location_id}
											name={item?.name}
											ranking={item?.ranking}
											type={item?.place_type}
											photo={item?.photo}
											rating={item?.rating}
											num_reviews={item?.num_reviews}
											is_closed={item?.is_closed}
											phone={item?.phone}
											address={item?.address}
											website={item?.website}
											web_url={item?.web_url}
											description={item?.description}
										/>
									</div>
								))}
						</div>
					</div>
				</div>
			</div>
		</>
	)
}

function DashboardProfileCard({ name, email, img }) {
	return (
		<div className={styles1['container']}>
			<div className={styles1['wrapper']}>
				{img && <img src={img} />}
				<div className={styles1['name-wrapper']}>
					{name}
					{email && <span>{email}</span>}
				</div>
			</div>
		</div>
	)
}
