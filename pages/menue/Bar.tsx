import { faHome, faRightFromBracket, faRightToBracket, faUser, faUserPlus } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { BottomNavigation, BottomNavigationAction } from '@mui/material'
import { Box } from '@mui/system'
import { useRouter } from 'next/router'
import React from 'react'
import { useUser, useUserLoggerOffer } from '../../context/user/UserContext'
import { german } from '../../languages/german'

const Bar = () => {
  const user = useUser()
  const router = useRouter()
  const signOut = useUserLoggerOffer()

  return (
    <Box sx={{
      position: "fixed",
      bottom: 0,
      width: "100vw",
    }}>
      <BottomNavigation
        style={{ background: "darkSlategray" }}
        showLabels
      >
        {user && <BottomNavigationAction label={german.bar.profile} icon={<FontAwesomeIcon icon={faUser} color="white" />} />}
        {user && <BottomNavigationAction onClick={() => router.push("/")} label={german.bar.home} icon={<FontAwesomeIcon icon={faHome} color="white" />} />}
        {user && <BottomNavigationAction onClick={() => {
          signOut()
          router.push("/")
        }} label={german.bar.logout} icon={<FontAwesomeIcon icon={faRightFromBracket} color="white" />} />}
        {!user && <BottomNavigationAction onClick={() => router.push("/login")} label={german.bar.login} icon={<FontAwesomeIcon icon={faRightToBracket} color="white" />} />}
        {!user && <BottomNavigationAction onClick={() => router.push("/register")} label={german.bar.register} icon={<FontAwesomeIcon icon={faUserPlus} color="white" />} />}
      </BottomNavigation>
    </Box>
  )
}

export default Bar
