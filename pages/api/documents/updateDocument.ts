import Cookies from 'js-cookie';
import Surreal from 'surrealdb.js'
import { trimmer } from '../../../helpers/trimmer';
import { SurrealFileStructure } from '../../../interfaces/interfaces';

const db = new Surreal(process.env.NEXT_PUBLIC_DBURL);

const updateDocument = async (body: any, folderName: string | string[] | undefined, fileName: string | string[] | undefined, userName: string) => {
  try {
    await db.use(process.env.NEXT_PUBLIC_NS!, process.env.NEXT_PUBLIC_DB!)
    const token = Cookies.get("jwtToken")
    if (!token) return
    db.authenticate(token)

    const files = await db.query(`select * from files where folder="${folderName}" and name="${fileName}"`)
    const fileUnknown = files[0].result
    const file = fileUnknown as Array<SurrealFileStructure>

    console.log(file)

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
