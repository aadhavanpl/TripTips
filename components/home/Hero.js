import Link from 'next/link'
import React from 'react'
import styles from './hero.module.css'
import Navbar from './Navbar'

export default function Hero() {
	return (
		<div className={styles['container']}>
			<Navbar color='#ffffff' />
			<div className={styles['middle']}>
				<div className={styles['title']}>Take a break...</div>
				<Link href='/explore'>
					<img src='/explore-now.svg' className={styles['explore-now']} />
				</Link>
				<div className={styles['footer']}>
					<Link href='https://mockstock.live'>
						<img src='/attach.svg' className={styles['attach-img']} />
					</Link>
					<Link href='https://www.instagram.com/aadhavan_lenin/'>
						<img src='/instagram.svg' className={styles['instagram-img']} />
					</Link>
					<Link href='https://twitter.com/RiazSahel'>
						<img src='/twitter.svg' className={styles['twitter-img']} />
					</Link>
				</div>
			</div>
		</div>
	)
}
