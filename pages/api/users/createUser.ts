import Surreal from 'surrealdb.js'
import { IUser } from '../../../interfaces/interfaces';
import { german } from '../../../languages/german';
import Cookies from 'js-cookie';
import jwt from 'jsonwebtoken';

const db = new Surreal(process.env.NEXT_PUBLIC_DBURL);


export const createUser = async (user: IUser) => {

  try {

    const token = await db.signup({
      NS: process.env.NEXT_PUBLIC_NS,
      DB: process.env.NEXT_PUBLIC_DB,
      SC: "allusers",
      email: user.email,
      user: user.name,
      pass: user.password
    })

    const userNameExists: any = await db.query(`select * from user where user="${user.name}"`)
    if (userNameExists) throw { type: "Error", message: `${german.error.userNameExists}` }
    const emailExists: any = await db.query(`select * from user where email="${user.email}"`)
    if (emailExists) throw { type: "Error", message: `${german.error.emailExists}` }

    const tokenNew = jwt.sign(token, process.env.NEXT_PUBLIC_LOGINTOKEN!)

    Cookies.set("loginT", tokenNew, { httpOnly: false })

    throw { type: "Success", message: `${german.success.welcome}` }
  } catch (e) { throw (e) }
}
