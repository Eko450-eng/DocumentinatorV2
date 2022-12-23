import Cookies from 'js-cookie';
import { createContext, useContext, useEffect, useState } from 'react'
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
  const token = Cookies.get("jwtToken")
  const userName = Cookies.get("loginT")

  const log = async () => {
    if (!token || !userName) return
    const validation: UserValidation = {
      authenticated: true,
      userName: userName
    }

    return validation
  }

  const signOut = () => {
    Cookies.remove("jwtToken")
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
