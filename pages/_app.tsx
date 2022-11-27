import { ThemeProvider } from '@mui/system'
import type { AppProps } from 'next/app'
import { UserProvider } from '../context/user/UserContext'
import '../styles/main.scss'
import theme from '../styles/ProvidedThemeMUI'
import Bar from './menue/Bar'

export default function App({ Component, pageProps }: AppProps) {
  return (
    <UserProvider>
      <ThemeProvider theme={theme} >
        <Component {...pageProps} />
        <Bar />
      </ThemeProvider>
    </UserProvider>
  )
}

