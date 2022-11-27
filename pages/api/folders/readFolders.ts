import Surreal from 'surrealdb.js'

const db = new Surreal(process.env.NEXT_PUBLIC_DBURL);

export const readFolders = async (userName: string, searchOptions?: string, sortOrder?: boolean) => {

	try {
		await db.signin({
			user: process.env.NEXT_PUBLIC_DBUSER!,
			pass: process.env.NEXT_PUBLIC_DBPASS!,
		})

		await db.use(process.env.NEXT_PUBLIC_NS!, process.env.NEXT_PUBLIC_DB!)

		const folders = await db.query(
			`select * from folders where owner="${userName}"
			${searchOptions != "" ?
			`and name~"${searchOptions}" order by name ${sortOrder ? "desc" : "asc"}` :
			`order by name ${sortOrder ? "desc" : "asc"}`}`
		)

		return folders[0]

	} catch (e) { console.log(e) }
}
