import Card from '@/components/common/Card'
import Navbar from '@/components/home/Navbar'
import { Draggable, Map, Marker } from 'pigeon-maps'
import React, { useEffect, useState } from 'react'
import styles from '../components/explore.module.css'
import axios from 'axios'
import Loader from '../components/common/Loader'

import { useGlobalContext } from '@/lib/global-context'

export default function Explore() {
	const { user } = useGlobalContext()

	const [data, setData] = useState([])
	const [type, setType] = useState('attractions')

	const [anchor, setAnchor] = useState([11.2588, 75.7804])
	const [center, setCenter] = useState([11.2588, 75.7804])

	const [lat, setLat] = useState([11.2588, 11.285])
	const [long, setLong] = useState([75.7804, 75.8])

	const [zoom, setZoom] = useState(11)

	const [loader, setLoader] = useState(false)

	useEffect(() => {
		async function getData() {
			setLoader(true)
			console.log(anchor[0], anchor[1])
			const options = {
				method: 'GET',
				url: `https://travel-advisor.p.rapidapi.com/${type}/list-in-boundary`,
				params: {
					tr_longitude: anchor[1] + 0.01,
					tr_latitude: anchor[0] + 0.01,
					bl_longitude: anchor[1] - 0.01,
					bl_latitude: anchor[0] - 0.01,
					currency: 'INR',
					lunit: 'km',
					lang: 'en_US',
				},
				headers: {
					'X-RapidAPI-Key': process.env.NEXT_PUBLIC_RAPID_API_KEY,
					'X-RapidAPI-Host': process.env.NEXT_PUBLIC_RAPID_HOST,
				},
			}
			const response = await axios.request(options)
			console.log(response)
			setData(response.data.data)
			setLoader(false)
		}
		getData()
	}, [type, anchor])
	return (
		<div className={styles['container']}>
			<Navbar color='black' border='1px solid #C0C0C0' position='fixed' bg='#f7f7f7' />
			<div className={styles['wrapper']}>
				<div className={styles['left']}>
					<div className={styles['map-container']}>
						<div className={styles['map-cover']}>
							<Map
								defaultZoom={11}
								width={380}
								height={380}
								center={center}
								zoom={zoom}
								onBoundsChanged={({ center, zoom }) => {
									setCenter(center)
									setZoom(zoom)
								}}
							>
								<Draggable anchor={anchor} onDragEnd={setAnchor}>
									<Marker width={40} color='#eb3a44' />
								</Draggable>
							</Map>
						</div>
					</div>
				</div>
				<div className={styles['right']}>
					<div className={styles['total-results']}>
						<span>{data?.length} results found!</span>
						<div className={styles['line']}></div>
					</div>
					<div className={styles['content']}>
						{data?.length > 0 &&
							data.map((item, index) => (
								<div key={index}>
									<Card
										name={item?.name}
										ranking={item?.ranking}
										type={type}
										photo={item?.photo?.images?.medium?.url}
										rating={item?.rating}
										num_reviews={item?.num_reviews}
										is_closed={item?.is_closed}
										phone={item?.phone}
										address={item?.address}
										website={item?.website}
										web_url={item?.web_url}
										description={item?.description}
										user_email={user[0]?.email}
									/>
								</div>
							))}
					</div>
				</div>
			</div>
			<Loader show={loader} />
		</div>
	)
}
