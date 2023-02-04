import Link from 'next/link'
import React, { useEffect } from 'react'
import styles from './navbar.module.css'
import { useGlobalContext } from '@/lib/global-context'

export default function Navbar({ color, border, position, bg, height, userInfo }) {
	const { signIn, user } = useGlobalContext()
	return (
		<div
			className={styles['container']}
			style={{ borderBottom: border, position: position, backgroundColor: bg, height: height }}
		>
			<Link href='/'>
				<div className={styles['logo-wrapper']}>
					<img src='/logo.svg' className={styles['logo']} />
				</div>
			</Link>
			<div className={styles['nav-wrapper']}>
				<Link href='/'>
					<span style={{ color: color }} className={styles['nav-link']}>
						Home
					</span>
				</Link>
				<Link href='/explore'>
					<span style={{ color: color }} className={styles['nav-link']}>
						Explore
					</span>
				</Link>
				<Link href='/contact'>
					<span style={{ color: color }} className={styles['nav-link']}>
						Contact
					</span>
				</Link>
			</div>
			{user?.length > 0 ? (
				<div className={styles['login-wrapper']}>
					{userInfo ? (
						<div className={styles['user-info']} style={{ color: color }}>
							{user[0]?.displayName}
							<span>{user[0]?.email}</span>
						</div>
					) : (
						<></>
					)}

					<Link href='/dashboard'>
						<img src={user[0]?.photoURL} />
					</Link>
				</div>
			) : (
				<img src='/google.svg' onClick={signIn} className={styles['signin']} />
			)}
		</div>
	)
}
