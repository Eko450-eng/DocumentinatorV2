import React from 'react'
import Typography from '@mui/material/Typography'
import { useUser, useUserUpdater } from '../../context/user/UserContext'
import { ViewFolder } from './ViewFolder'
import Login from '../login'

export const OverView = () => {
  const user = useUser()
  const userUpdater = useUserUpdater()

  return (
    <div className='title-wrapper'>
      <Typography fontSize={30} variant='h1'>Documentinator</Typography>
      {(user && user.authenticated) && <ViewFolder />}
      {(!user || !user.authenticated) && <Login />}
    </div>
  )
}
