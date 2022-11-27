import Head from 'next/head'
import OverView from './Overview'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers';

export default function Home() {
  return (
    <div className='App'>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <Head>
          <title>Documentinator</title>
          <meta name="description" content="Merge your Physical files with the Digital world" />
          <link rel="icon" href="/favicon.ico" />
        </Head>

        <OverView />
      </LocalizationProvider>
    </div>
  )
}
