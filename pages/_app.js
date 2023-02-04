import { AnimatePresence, motion } from 'framer-motion'
import { GlobalContextWrapper } from 'lib/global-context'

//CSS
import '../styles/globals.css'
import '../styles/variables.css'
import '../styles/media-queries.css'

//Fonts
import '../assets/fonts/Poppins/stylesheet.css'

import 'firebase-config'

import { useRouter } from 'next/router'
import Head from 'next/head'

function MyApp({ Component, pageProps }) {
	const router = useRouter()

	return (
		<>
			<Head>
				<title>TripTips</title>
			</Head>
			<GlobalContextWrapper>
				<AnimatePresence>
					<motion.div key={router.pathname} initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
						<Component {...pageProps} />
					</motion.div>
				</AnimatePresence>
			</GlobalContextWrapper>
		</>
	)
}

export default MyApp
