import React from 'react'
import Typography from '@mui/material/Typography'
import { useUser, useUserUpdater } from '../../context/user/UserContext'
import Login from '../login'
import ViewFolder from './ViewFolder'

const OverView = () => {
  const user = useUser()

  return (
    <div className='title-wrapper'>
      <Typography fontSize={30} variant='h1'>Documentinator</Typography>
      {(user && user.authenticated) && <ViewFolder />}
      {(!user || !user.authenticated) && <Login />}
    </div>
  )
}
export default OverView
