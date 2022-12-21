import Surreal from 'surrealdb.js'
import { trimmer } from '../../../helpers/trimmer';

const db = new Surreal(process.env.NEXT_PUBLIC_DBURL);

export interface IApiUser {
  user: string,
  body: any,
  [key: string]: any
}

const updateDocument = async (userName: string, body: any) => {
  try {
    await db.signin({
      user: process.env.NEXT_PUBLIC_DBUSER!,
      pass: process.env.NEXT_PUBLIC_DBPASS!,
    })

    await db.use(process.env.NEXT_PUBLIC_NS!, process.env.NEXT_PUBLIC_DB!)

    const files = await db.query(`select * from documents where folders="${body.folder}" and name="${body.name}"`)

    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-expect-error
    const file = files[0].result[0]

    const data = {
      name: body.name ? body.name : file.name,
      folders: body.folder ? trimmer(body.folder) : file.folder,
      date: body.date ? body.date : file.date,
      isLocation: body.isLocation ? body.isLocation : file.isLocation,
      givenDate: body.givenDate ? body.givenDate : file.givenDate,
      owner: userName
    }

    await db.create(`documents:${trimmer(body.name)}`, data)
    await db.query(`UPDATE documents:${trimmer(body.name)} SET folder = ${trimmer(body.folder)}`)
    await db.query(`UPDATE ${trimmer(body.folder)} SET categories += ["${body.categorie}"]`)

  } catch (e) { throw (e) }
}
export default updateDocument
