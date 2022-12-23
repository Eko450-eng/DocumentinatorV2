import Surreal from 'surrealdb.js'

const db = new Surreal(process.env.NEXT_PUBLIC_DBURL);

export const readCategories = async (userName: string | string[] | undefined, folder: string | string[] | undefined) => {

  try {
    await db.signin({
      user: process.env.NEXT_PUBLIC_DBUSER!,
      pass: process.env.NEXT_PUBLIC_DBPASS!,
    })

    await db.use(process.env.NEXT_PUBLIC_NS!, process.env.NEXT_PUBLIC_DB!)

    const files = await db.query(`select categories from ${folder} where owner=$auth.id`)

    return files

  } catch (e) { throw (e) }
}
