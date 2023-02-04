import Link from 'next/link'
import React, { useEffect } from 'react'
import styles from './navbar.module.css'
import { useGlobalContext } from '@/lib/global-context'

export default function Navbar({ color }) {
	const { signIn, user } = useGlobalContext()
	useEffect(() => {
		console.log(user)
	}, [user])
	return (
		<div className={styles['container']}>
			<div className={styles['logo-wrapper']}>
				<img src='/logo.svg' className={styles['logo']} />
			</div>
			<div className={styles['nav-wrapper']}>
				<span style={{ color: color }}>Home</span>
				<span style={{ color: color }}>Explore</span>
				<span style={{ color: color }}>Contact</span>
			</div>

			{user?.length > 0 ? (
				<div className={styles['login-wrapper']}>
					<div className={styles['user-info']}>
						{user[0]?.displayName}
						<span>{user[0]?.email}</span>
					</div>
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
