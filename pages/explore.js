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
	const [type, setType] = useState('restaurants')
	const [cardType, setCardType] = useState('restaurants')

	const [anchor, setAnchor] = useState([11.2588, 75.7804])
	const [center, setCenter] = useState([11.2588, 75.7804])

	const [zoom, setZoom] = useState(11)
	const [place, setPlace] = useState('')

	const [loader, setLoader] = useState(false)

	function handleChange(e) {
		setPlace(e.target.value)
	}

	function handleApply() {
		async function getLocation() {
			setLoader(true)
			const params = {
				access_key: '3d8576ab0112b7d771c4d036de518c2b',
				query: place,
				headers: {
					'Content-Type': 'application/json',
				},
			}
			const response = await axios.get('http://api.positionstack.com/v1/forward', { params })
			setAnchor([response?.data?.data[0]?.latitude, response?.data?.data[0]?.longitude])
			setCenter([response?.data?.data[0]?.latitude, response?.data?.data[0]?.longitude])
			setLoader(false)
		}
		getLocation()
	}

	useEffect(() => {
		async function getData() {
			setLoader(true)
			const options = {
				method: 'GET',
				url: `https://travel-advisor.p.rapidapi.com/${type}/list-in-boundary`,
				params: {
					tr_longitude: anchor[1] + 0.03,
					tr_latitude: anchor[0] + 0.03,
					bl_longitude: anchor[1] - 0.03,
					bl_latitude: anchor[0] - 0.03,
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
			setCardType(type)
			setLoader(false)
		}
		getData()
	}, [anchor])
	return (
		<div className={styles['container']}>
			<Navbar
				color='black'
				border='1px solid #C0C0C0'
				position='fixed'
				bg='#f7f7f7'
				height='90px'
				userInfo={true}
			/>
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
					<div className={styles['search-wrapper']}>
						<FieldInput
							placeholder='Enter a place'
							name='place'
							value={place}
							onChange={handleChange}
						/>
						<div className={styles['filter-button-wrapper']}>
							<FilterButton
								value='restaurants'
								name='Restaurants'
								checked={type == 'restaurants'}
								onClick={() => setType('restaurants')}
							/>
							<FilterButton
								value='attractions'
								name='Attractions'
								checked={type == 'attractions'}
								onClick={() => setType('attractions')}
							/>
							<FilterButton
								value='hotels'
								name='Hotels'
								checked={type == 'hotels'}
								onClick={() => setType('hotels')}
							/>
						</div>
						<img src='/apply.svg' onClick={handleApply} className={styles['apply']} />
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
										like={true}
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

function FilterButton({ name, checked, onClick }) {
	return (
		<div
			className={`${styles['filter-container']} ${checked ? styles['checked'] : ''}`}
			onClick={onClick}
		>
			<img src='/tick.svg' />
			{name}
		</div>
	)
}
