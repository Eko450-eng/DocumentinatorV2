import Surreal from 'surrealdb.js'
import Cookies from 'js-cookie';

const db = new Surreal(process.env.NEXT_PUBLIC_DBURL);

export const readUser = async (user: string, password: string) => {

  const loginMethod = (user: string) => {
    if (/@/.test(user)) return "email"
    return "name"
  }

  try {
    const method = loginMethod(user)

    const token = await db.signin({
      NS: "documentinatordb",
      DB: "documentinatordb",
      SC: "allusers",
      user: user,
      pass: password
    })

    // let comparedPass: any
    // try {
    //   comparedPass = await bcrypt.compare(password, hashedPass[0].result[0].pass)
    // } catch (e) {
    //   throw { error: true, message: `${german.error.userNoExist}` }
    // }

    // if (!comparedPass) throw { error: true, message: `${german.error.wrongPass}` }

    // const res = { userName: userName[0].result[0].name, authenticated: comparedPass }

    // const token = jwt.sign(res!, process.env.NEXT_PUBLIC_LOGINTOKEN!)
    // if (!comparedPass) throw { error: true, message: `${german.error.tryAgain}` }


    // if (comparedPass) {
    //   const cookie = Cookies.get("loginT")

    //   throw { name: name, authenticated: comparedPass }
    // }
    //

    Cookies.set("jwtToken", token, { httpOnly: false })
    Cookies.set("loginT", user, { httpOnly: false })
    throw { name: user, authenticated: token }

  } catch (e) {
    throw (e)
  }
}
