import Surreal from 'surrealdb.js'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import Cookies from 'js-cookie';
import { german } from '../../../languages/german';

const db = new Surreal(process.env.NEXT_PUBLIC_DBURL);

export const readUser = async (name: string, password: string) => {

  const loginMethod = (name: string) => {
    if (/@/.test(name)) return "email"
    return "name"
  }

  try {
    await db.signin({
      user: process.env.NEXT_PUBLIC_DBUSER!,
      pass: process.env.NEXT_PUBLIC_DBPASS!,
    })

    await db.use(process.env.NEXT_PUBLIC_NS!, process.env.NEXT_PUBLIC_DB!)

    const method = loginMethod(name)

    const hashedPass: any = await db.query(`select pass from users where ${method}="${name}"`)
    const userName: any = await db.query(`select name from users where ${method}="${name}"`)

    let comparedPass: any

    try {
      comparedPass = await bcrypt.compare(password, hashedPass[0].result[0].pass)
    } catch (e) {
      throw { error: true, message: `${german.error.userNoExist}` }
    }

    if (!comparedPass) throw { error: true, message: `${german.error.wrongPass}` }

    const res = { userName: userName[0].result[0].name, authenticated: comparedPass }

    const token = jwt.sign(res!, process.env.NEXT_PUBLIC_LOGINTOKEN!)
    if (!comparedPass) throw { error: true, message: `${german.error.tryAgain}` }


    if (comparedPass) {
      Cookies.set("loginT", token, { httpOnly: false })
      throw { name: name, authenticated: comparedPass }
    }

  } catch (e) {
    throw (e)
  }
}

