import { useEffect, useState, useContext, createContext } from 'react'
import { useRouter } from 'next/router'
import { userAccessToken, fetchUser } from '../lib/utils/fetchUserDetails'
import { getAuth, signInWithPopup, GoogleAuthProvider } from 'firebase/auth'
import { FirebaseApp } from '../firebase-config'

const GlobalContext = createContext()
export function GlobalContextWrapper({ children }) {
	const [user, setUser] = useState(null)
	const [accessToken, setAccessToken] = useState('')
	const router = useRouter()

	const firebaseAuth = getAuth(FirebaseApp)
	const provider = new GoogleAuthProvider()

	/*=============================================
	=   auto login if they have logged in before  =
	=============================================*/
	useEffect(() => {
		const tempUser = fetchUser()
		setUser(tempUser)
		const tempAccessToken = userAccessToken()
		setAccessToken(tempAccessToken)
	}, [])

	useEffect(() => {
		if (!user || !user?.length) return
	}, [user])

	async function signIn() {
		const { user } = await signInWithPopup(firebaseAuth, provider)
		const { refreshToken, providerData } = user
		localStorage.setItem('user', JSON.stringify(providerData))
		localStorage.setItem('accessToken', JSON.stringify(refreshToken))

		const tempUser = fetchUser()
		setUser(tempUser)
		const tempAccessToken = userAccessToken()
		setAccessToken(tempAccessToken)
	}

	function signOut() {
		localStorage.clear()
		sessionStorage.clear()
		setisTeacher(false)
		window.location.replace('http://localhost:3000/')
	}

	async function fetchUserInfo(data) {
		const apiUrlEndpointUser = 'http://localhost:3000/fetch-user'
		const response = await fetch(apiUrlEndpointUser, {
			method: 'POST',
			body: JSON.stringify({ data }),
			headers: {
				'Content-Type': 'application/json',
			},
		})
		const res = await response.json()
		return res
	}
	return (
		<GlobalContext.Provider
			value={{
				user,
				accessToken,
				signIn,
				signOut,
				fetchUserInfo,
			}}
		>
			{children}
		</GlobalContext.Provider>
	)
}

export function useGlobalContext() {
	return useContext(GlobalContext)
}
