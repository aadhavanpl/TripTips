import React, { useState } from 'react'
import styles from './my-map.module.css'
import { Draggable, Map, Marker } from 'pigeon-maps'

export default function MyMap() {
	const [anchor, setAnchor] = useState([50.879, 4.6997])
	const [center, setCenter] = useState([50.879, 4.6997])
	const [zoom, setZoom] = useState(11)

	return (
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
	)
}
