import FilterSelect from '@/components/common/FilterSelect'
import SmallCard from '@/components/common/SmallCard'
import Navbar from '@/components/home/Navbar'
import React, { useEffect, useState } from 'react'
import styles from '../components/travel.module.css'
import Loader from '../components/common/Loader'
import axios from 'axios'

import { useGlobalContext } from '@/lib/global-context'

export default function Travel() {
	const { user } = useGlobalContext()

	const [place, setPlace] = useState('')
	const [duration, setDuration] = useState('')
	const [type, setType] = useState('restaurants')
	const [cardType, setCardType] = useState('restaurants')
	const [anchor, setAnchor] = useState([11.2588, 75.7804])

	const [attractions, setAttractions] = useState([])
	const [hotels, setHotels] = useState([])
	const [restaurants, setRestaurants] = useState([])

	const [loader, setLoader] = useState(false)

	function handleChange(e) {
		setPlace(e.target.value)
	}

	function handleSelect(e) {
		setDuration(e.target.value)
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

			const options1 = {
				method: 'GET',
				url: `https://travel-advisor.p.rapidapi.com/hotels/list-in-boundary`,
				params: {
					tr_longitude: response?.data?.data[0]?.longitude + 0.03,
					tr_latitude: response?.data?.data[0]?.latitude + 0.03,
					bl_longitude: response?.data?.data[0]?.longitude - 0.03,
					bl_latitude: response?.data?.data[0]?.latitude - 0.03,
					currency: 'INR',
					lunit: 'km',
					lang: 'en_US',
					limit: duration,
				},
				headers: {
					'X-RapidAPI-Key': process.env.NEXT_PUBLIC_RAPID_API_KEY,
					'X-RapidAPI-Host': process.env.NEXT_PUBLIC_RAPID_HOST,
				},
			}
			const response1 = await axios.request(options1)
			console.log(response1)
			setHotels(response1.data.data)
			// setCardType(type)

			const options2 = {
				method: 'GET',
				url: `https://travel-advisor.p.rapidapi.com/attractions/list-in-boundary`,
				params: {
					tr_longitude: response?.data?.data[0]?.longitude + 0.03,
					tr_latitude: response?.data?.data[0]?.latitude + 0.03,
					bl_longitude: response?.data?.data[0]?.longitude - 0.03,
					bl_latitude: response?.data?.data[0]?.latitude - 0.03,
					currency: 'INR',
					lunit: 'km',
					lang: 'en_US',
					limit: duration,
				},
				headers: {
					'X-RapidAPI-Key': process.env.NEXT_PUBLIC_RAPID_API_KEY,
					'X-RapidAPI-Host': process.env.NEXT_PUBLIC_RAPID_HOST,
				},
			}
			const response2 = await axios.request(options2)
			console.log(response2)
			setAttractions(response2.data.data)

			const options3 = {
				method: 'GET',
				url: `https://travel-advisor.p.rapidapi.com/restaurants/list-in-boundary`,
				params: {
					tr_longitude: response?.data?.data[0]?.longitude + 0.03,
					tr_latitude: response?.data?.data[0]?.latitude + 0.03,
					bl_longitude: response?.data?.data[0]?.longitude - 0.03,
					bl_latitude: response?.data?.data[0]?.latitude - 0.03,
					currency: 'INR',
					lunit: 'km',
					lang: 'en_US',
					limit: duration,
				},
				headers: {
					'X-RapidAPI-Key': process.env.NEXT_PUBLIC_RAPID_API_KEY,
					'X-RapidAPI-Host': process.env.NEXT_PUBLIC_RAPID_HOST,
				},
			}
			const response3 = await axios.request(options3)
			console.log(response3)
			setRestaurants(response3.data.data)
			setLoader(false)
		}
		getLocation()
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
					<FilterSelect
						label='Duration:'
						options={options.days}
						width='153px'
						onChange={handleSelect}
					/>
					<div className={styles['filter-i']}>
						<FieldInput
							placeholder='Enter a place'
							name='place'
							value={place}
							onChange={handleChange}
						/>
					</div>
					<img src='/filter-apply.svg' className={styles['apply']} onClick={handleApply} />
				</div>
				<div className={styles['content']}>
					<div className={styles['col-numb']}>
						{[...Array(Math.ceil(Number(duration)))].map((e, index) => (
							<span key={index} className={styles['num']}>
								Day {index + 1}
							</span>
						))}
					</div>
					<div className={styles['col']}>
						{hotels?.length > 0 &&
							hotels.map((item, index) => (
								<div key={index}>
									<SmallCard
										user_email={user[0]?.email}
										location_id={item?.location_id}
										name={item?.name}
										ranking={item?.ranking}
										type='hotels'
										photo={item?.photo?.images?.medium?.url}
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
					<div className={styles['col']}>
						{attractions?.length > 0 &&
							attractions.map((item, index) => (
								<div key={index}>
									<SmallCard
										user_email={user[0]?.email}
										location_id={item?.location_id}
										name={item?.name}
										ranking={item?.ranking}
										type='attractions'
										photo={item?.photo?.images?.medium?.url}
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
					<div className={styles['col']}>
						{restaurants?.length > 0 &&
							restaurants.map((item, index) => (
								<div key={index}>
									<SmallCard
										user_email={user[0]?.email}
										location_id={item?.location_id}
										name={item?.name}
										ranking={item?.ranking}
										type='restaurants'
										photo={item?.photo?.images?.medium?.url}
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
			<Loader show={loader} />
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
