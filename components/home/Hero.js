import React from 'react'
import styles from './hero.module.css'

export default function Hero() {
  return (
    <div className={styles['container']}>
        <div className={styles['top']}>
            <div className={styles['navbar']}>
                <img src='/logo.svg' className={styles['logo']} />
                <div className={styles['nav-wrapper']}>
                    <div className={styles['home']}>Home</div>
                    <div className={styles['explore']}>Explore</div>
                    <div className={styles['contact']}>Contact</div>
                </div>
                <img src='/google.svg' className={styles['google']} />
            </div>
        </div>
        <div className={styles['middle']}>
            <div className={styles['title']}>Take a break...</div>
            <div className={styles['bottom']}>
                <img src='/explore-now.svg' className={styles['explore-now']} />
            </div>
            <div className={styles['footer']}>
                <img src='/attach.svg' className={styles['attach-img']} />
                <img src='/instagram.svg' className={styles['instagram-img']} />
                <img src='/twitter.svg' className={styles['twitter-img']} />
            </div>
        </div>
    </div>
  )
}
