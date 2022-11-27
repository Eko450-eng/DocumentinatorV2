import Surreal from 'surrealdb.js'
import bcrypt from 'bcryptjs'
import { IUser } from '../../../interfaces/interfaces';
import { trimmer } from '../../../helpers/trimmer';
import { german } from '../../../languages/german';

const db = new Surreal(process.env.NEXT_PUBLIC_DBURL);


export const createUser = async (user: IUser) => {

  try {
    await db.signin({
      user: process.env.NEXT_PUBLIC_DBUSER!,
      pass: process.env.NEXT_PUBLIC_DBPASS!,
    })

    await db.use(process.env.NEXT_PUBLIC_NS!, process.env.NEXT_PUBLIC_DB!)

    const password = await bcrypt.hash(user.password, 10)

    const userNameExists: any = await db.query(`select * from users where name="${user.name}"`)
    const emailExists: any = await db.query(`select * from users where email="${user.email}"`)

    const data = {
      name: trimmer(user.name),
      email: user.email,
      pass: password,
    }

    if (userNameExists[0].result!.length >= 1) throw { type: "Error", message: `${german.error.userNameExists}` }
    if (emailExists[0].result!.length >= 1) throw { type: "Error", message: `${german.error.emailExists}` }

    await db.create(`users:${trimmer(user.name)}`, data)
    throw { type: "Success", message: `${german.success.welcome}` }
  } catch (e) { throw (e) }
}
