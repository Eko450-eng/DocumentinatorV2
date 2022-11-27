import Cookies from 'js-cookie';
import { createContext, useContext, useEffect, useState } from 'react'
import jwt from 'jsonwebtoken'
import { useRouter } from 'next/router';

export interface UserValidation {
  userName: string,
  authenticated: boolean,
  [key: string]: any,
}

const UserProviderContext = createContext<UserValidation | null>(null)
const UserUpdater = createContext<any>(null as any)
const UserLoggerOffer = createContext<any>(null as any)

export const useUser = () => {
  return useContext(UserProviderContext)
}

export const useUserUpdater = () => {
  return useContext(UserUpdater)
}

export const useUserLoggerOffer = () => {
  return useContext(UserLoggerOffer)
}

export const UserProvider = ({ children }: any) => {
  const router = useRouter()
  const [user, setUser] = useState<UserValidation | null>(null as any)
  const token = Cookies.get("loginT")
  const LOGINTOKEN = process.env.NEXT_PUBLIC_LOGINTOKEN

  const log = async () => {
    if (!token) return
    const validation: UserValidation | any = jwt.verify(token, LOGINTOKEN ? LOGINTOKEN : "")
    return await validation
  }

  const signOut = () => {
    Cookies.remove("loginT")
    router.push('/')
    setUser(null)
  }

  const changeUser = async () => {
    const validated: UserValidation | any = log()
    if (await validated) return setUser(await validated)
    setUser(null)
  }

  useEffect(() => {
    changeUser()
  }, [])

  return (
    <UserProviderContext.Provider value={user}>
      <UserUpdater.Provider value={changeUser}>
        <UserLoggerOffer.Provider value={signOut}>
          {children}
        </UserLoggerOffer.Provider>
      </UserUpdater.Provider>
    </UserProviderContext.Provider>
  )
}
