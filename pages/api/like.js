/*=============================================
=              user likes a post              =
=============================================*/

import { query } from '../../lib/db'

export default async function handler(req, res) {
	try {
		const temp = req.body.data
		const querySql =
			'INSERT INTO starred_places (place_id,user_email,name,ranking,place_type,photo,rating,num_reviews,phone,address,website,web_url,description) VALUES (NULL,?,?,?,?,?,?,?,?,?,?,?,?);'
		const valuesParams = Object.values(temp)
		const data = await query({ query: querySql, values: valuesParams })
		res.status(201).json(data)
	} catch (error) {
		res.status(500).json({ error: error.message })
	}
}
