import Surreal from 'surrealdb.js'
import { trimmer } from '../../../helpers/trimmer';

const db = new Surreal(process.env.NEXT_PUBLIC_DBURL);

export interface IApiUser {
  user: string,
  body: any,
  [key: string]: any
}

export interface SurrealFileStructure {
  folder: string,
  givenDate: any,
  date: any,
  isLocation: string,
  id: string,
  name: string,
  owner: string
}

const updateDocument = async (body: any, folderName: string | string[] | undefined, fileName: string | string[] | undefined, userName: string) => {
  try {
    await db.signin({
      user: process.env.NEXT_PUBLIC_DBUSER!,
      pass: process.env.NEXT_PUBLIC_DBPASS!,
    })

    await db.use(process.env.NEXT_PUBLIC_NS!, process.env.NEXT_PUBLIC_DB!)

    console.log(body.folder)
    console.log(folderName)
    const files = await db.query(`select * from files where folders="${folderName}" and name="${fileName}"`)
    const fileUnknown = files[0].result
    const file = fileUnknown as Array<SurrealFileStructure>

    const data = {
      name: body.name ? body.name : file[0].name,
      folders: body.folder ? trimmer(body.folder) : file[0].folder,
      date: body.date ? body.date : file[0].date,
      isLocation: body.isLocation ? body.isLocation : file[0].isLocation,
      givenDate: body.givenDate ? body.givenDate : file[0].givenDate,
      owner: userName
    }

    await db.change(`files:${fileName}`, data)
  } catch (e) { throw (e) }
}
export default updateDocument
