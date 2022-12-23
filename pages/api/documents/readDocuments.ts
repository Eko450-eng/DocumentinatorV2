import Cookies from 'js-cookie';
import Surreal from 'surrealdb.js'
import { trimmer } from '../../../helpers/trimmer';

export const db = new Surreal(process.env.NEXT_PUBLIC_DBURL);

export const readFiles = async (id: string | string[], searchOptions?: string, sortOptions?: string, sortOrder?: boolean) => {

  try {
    await db.use(process.env.NEXT_PUBLIC_NS!, process.env.NEXT_PUBLIC_DB!)
    const token = Cookies.get("jwtToken")
    if (!token) return
    db.authenticate(token)

    const sortValue = () => {
      switch (sortOptions) {
        case "Name":
          return "name"
        case "Kategorie":
          return "isLocation"
        case "Datum":
          return "date"
        default:
          return "name"
      }
    }

    console.log(id)

    const files = await db.query(`select * from files where folder="${trimmer(id as string)}" and owner=$auth.id
			${searchOptions != "" ?
        `and name~"${searchOptions}" order by ${sortValue()} ${sortOrder ? "desc" : "asc"}` :
        `order by name ${sortOrder ? "desc" : "asc"}`}
`)

    return files[0]

  } catch (e) { console.log(e) }
}
