import Surreal from 'surrealdb.js'

export const db = new Surreal(process.env.NEXT_PUBLIC_DBURL);

export const readFiles = async (userName: string, id: string | string[], searchOptions?: string, sortOptions?: string, sortOrder?: boolean) => {

  try {
    await db.signin({
      user: process.env.NEXT_PUBLIC_DBUSER!,
      pass: process.env.NEXT_PUBLIC_DBPASS!,
    })

    await db.use(process.env.NEXT_PUBLIC_NS!, process.env.NEXT_PUBLIC_DB!)

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

    const files = await db.query(`select * from documents where folders="${id}" and owner="${userName}"
			${searchOptions != "" ?
        `and name~"${searchOptions}" order by ${sortValue()} ${sortOrder ? "desc" : "asc"}` :
        `order by name ${sortOrder ? "desc" : "asc"}`}
`)

    return files[0]

  } catch (e) { console.log(e) }
}
