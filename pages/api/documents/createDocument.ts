import Surreal from 'surrealdb.js'
import { trimmer } from '../../../helpers/trimmer';

const db = new Surreal(process.env.NEXT_PUBLIC_DBURL);

export interface IApiUser {
  user: string,
  body: any,
  [key: string]: any
}

const createDocument = async (userName: string, body: any) => {
  try {
    await db.signin({
      user: process.env.NEXT_PUBLIC_DBUSER!,
      pass: process.env.NEXT_PUBLIC_DBPASS!,
    })

    await db.use(process.env.NEXT_PUBLIC_NS!, process.env.NEXT_PUBLIC_DB!)

    const data = {
      name: body.name,
      folders: trimmer(body.folder),
      date: body.date,
      isLocation: body.isLocation,
      givenDate: body.givenDate,
      categorie: body.categorie,
      owner: userName
    }

    await db.create(`files:${trimmer(body.name)}`, data)
    await db.query(`UPDATE files:${trimmer(body.name)} SET folder = ${trimmer(body.folder)}`)
    await db.query(`UPDATE files:${trimmer(body.folder)} SET categories += ["${body.categorie}"]`)

  } catch (e) { throw (e) }
}
export default createDocument
