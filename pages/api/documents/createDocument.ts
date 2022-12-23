import Cookies from 'js-cookie';
import Surreal from 'surrealdb.js'
import { trimmer } from '../../../helpers/trimmer';

const db = new Surreal(process.env.NEXT_PUBLIC_DBURL);

const createDocument = async (userName: string, body: any) => {
  try {
    await db.use(process.env.NEXT_PUBLIC_NS!, process.env.NEXT_PUBLIC_DB!)
    const token = Cookies.get("jwtToken")
    if (!token) return
    db.authenticate(token)

    const data = {
      name: body.name,
      folder: trimmer(body.folder),
      date: body.date,
      isLocation: body.isLocation,
      givenDate: body.givenDate,
      owner: userName
    }

    await db.create(`files:${(body.name)}`, data)

  } catch (e) { throw (e) }
}
export default createDocument
