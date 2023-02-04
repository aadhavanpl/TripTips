import Link from 'next/link'
import React, { useEffect } from 'react'
import styles from './navbar.module.css'
import { useGlobalContext } from '@/lib/global-context'

export default function Navbar({ color, border, position, bg, height }) {
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
				<span style={{ color: color }}>
					<Link href='/'>Home</Link>
				</span>
				<span style={{ color: color }}>
					<Link href='/explore'>Explore</Link>
				</span>
				<span style={{ color: color }}>
					<Link href='/contact'>Contact</Link>
				</span>
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
