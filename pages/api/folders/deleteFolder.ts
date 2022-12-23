import Cookies from 'js-cookie';
import Surreal from 'surrealdb.js'
import { trimmer } from '../../../helpers/trimmer';

const db = new Surreal(process.env.NEXT_PUBLIC_DBURL);

export const deleteFolder = async (folderName: string) => {

  try {
    await db.use(process.env.NEXT_PUBLIC_NS!, process.env.NEXT_PUBLIC_DB!)
    const token = Cookies.get("jwtToken")
    if (!token) return
    db.authenticate(token)

    await db.use(process.env.NEXT_PUBLIC_NS!, process.env.NEXT_PUBLIC_DB!)

    await db.delete(`folders:${trimmer(folderName)}`)

  } catch (e) { console.log(e) }
}
