import Surreal from 'surrealdb.js'

const db = new Surreal(process.env.NEXT_PUBLIC_DBURL);

export const addCategories = async (folder: string | string[] | undefined, query:string | string[] | undefined) => {
	console.log(folder)

	try {
		await db.signin({
			user: process.env.NEXT_PUBLIC_DBUSER!,
			pass: process.env.NEXT_PUBLIC_DBPASS!,
		})

		await db.use(process.env.NEXT_PUBLIC_NS!, process.env.NEXT_PUBLIC_DB!)

		const files = await db.query(`update ${folder} set categories += ["${query}"]`)

		return files

	} catch (e) { console.log(e) }
}
