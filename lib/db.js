import mysql from 'mysql2/promise'

export async function query({ query, values = [] }) {
	const dbconnection = await mysql.createConnection({
		host: 'mockstockdb.mysql.database.azure.com',
		user: 'sahelriaz',
		password: 'Deebugs123',
		database: 'trip-tips',
		port: 3306,
		ssl: {
			rejectUnauthorized: false,
		},
	})

	try {
		const [results] = await dbconnection.execute(query, values)
		dbconnection.end()
		return results
	} catch (error) {
		throw Error(error.message)
		return { error }
	}
}
