import Cookies from 'js-cookie';
import Surreal from 'surrealdb.js'

const db = new Surreal(process.env.NEXT_PUBLIC_DBURL);

export const readFolders = async (userName: string, searchOptions?: string, sortOrder?: boolean) => {
  try {
    await db.use(process.env.NEXT_PUBLIC_NS!, process.env.NEXT_PUBLIC_DB!)
    const token = Cookies.get("jwtToken")
    if (!token) return
    db.authenticate(token)

    const folders = await db.query(
      `select * from folders where owner = $auth.id
			${searchOptions != "" ?
        `and name~"${searchOptions}" order by name ${sortOrder ? "desc" : "asc"}` :
        `order by name ${sortOrder ? "desc" : "asc"}`}`
    )

    return folders[0]

  } catch (e) { console.log(e) }
}
