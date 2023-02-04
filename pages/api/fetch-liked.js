/*=============================================
=            fetch all liked posts            =
=============================================*/

import { query } from '../../lib/db'

export default async function handler(req, res) {
	try {
		const temp = req.body.data
		const querySql = 'SELECT * FROM starred_places where user_email=?;'
		const valuesParams = Object.values(temp)
		const data = await query({ query: querySql, values: valuesParams })
		res.status(201).json(data)
	} catch (error) {
		res.status(500).json({ error: error.message })
	}
}
