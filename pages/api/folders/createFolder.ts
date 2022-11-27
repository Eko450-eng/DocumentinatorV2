import Surreal from 'surrealdb.js'
import { trimmer } from '../../../helpers/trimmer';
import { folderStructure } from '../../../interfaces/interfaces';

const db = new Surreal(process.env.NEXT_PUBLIC_DBURL);

export const createFolder = async (userName: string, body: folderStructure) => {

  try {
    await db.signin({
      user: process.env.NEXT_PUBLIC_DBUSER!,
      pass: process.env.NEXT_PUBLIC_DBPASS!,
    })

    await db.use(process.env.NEXT_PUBLIC_NS!, process.env.NEXT_PUBLIC_DB!)

    const data = {
      name: body.name,
      folderLocation: body.folderLocation,
      givenDate: body.givenDate,
      owner: userName,
    }

    await db.create(`folders:${trimmer(body.name)}`, data)

  } catch (e) { throw (e) }
}
