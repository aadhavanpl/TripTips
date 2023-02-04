import React from 'react'
import styles from './my-map.module.css'
import { Map, Marker } from 'pigeon-maps'

export default function MyMap() {
	const coordinates = { lat: 0, lng: 0 } < Map
	return (
		<Map defaultCenter={[24.659341, 50.864017]} defaultZoom={11} width={380} height={380}>
			<Marker width={20} anchor={[24.659341, 50.864017]} />
		</Map>
	)
}
