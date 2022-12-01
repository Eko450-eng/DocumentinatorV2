import React, { useState } from 'react'
import { NotificationsProvider, showNotification } from '@mantine/notifications'
import { Button, IconButton, InputAdornment, OutlinedInput, TextField, Typography } from '@mui/material'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useRouter } from 'next/router'
import { useUser } from '../../context/user/UserContext'
import { german } from '../../languages/german'
import { IUser, LoginState } from '../../interfaces/interfaces'
import { createUser } from '../api/users/createUser'
import { faExclamation } from '@fortawesome/free-solid-svg-icons'

export default function Register() {
  const user = useUser()
  const router = useRouter()
  if (user) router.push("/")

  const [showPassword, setShowPassword] = useState<boolean>(false)

  const [values, setValues] = useState<IUser>({
    name: "",
    email: "",
    password: '',
  });

  const errorMessage = {
    length: (values.password.length < 8),
    upperCase: !/[A-Z]/gm.test(values.password),
    lowerCase: !/[a-z]/gm.test(values.password),
    number: !/[0-9]/gm.test(values.password),
    symbol: !/[!@#\$%\^\&*\)\(+=._-]/gm.test(values.password),
  }

  const handleChange =
    (prop: keyof LoginState) => (event: React.ChangeEvent<HTMLInputElement>) => {
      setValues({ ...values, [prop]: event.target.value });
    };

  const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
  };

  const register = (e: any) => {
    e.preventDefault()
    if (Object.values(errorMessage).some(value => value === true)) {
      showNotification({
        title: "Woopsie",
        message: german.error.passwordGeneral,
        icon: <FontAwesomeIcon icon={faExclamation} />,
        color: "red"
      })
    }
    else if (values.email.length < 10) {
      showNotification({
        title: "Woopsie",
        message: german.error.provideEmail,
        icon: <FontAwesomeIcon icon={faExclamation} />,
        color: "red"
      })
    }
    else if (values.name.length < 4) {
      showNotification({
        title: "Woopsie",
        message: german.error.provideName,
        icon: <FontAwesomeIcon icon={faExclamation} />,
        color: "red"
      })
    }
    createUser(values)
      .catch((e) => {
        if (e.type == "Error") return showNotification({
          title: "Woopsie",
          message: e.message,
          icon: <FontAwesomeIcon icon={faExclamation} />,
          color: "red"
        })
        router.push("/")
      })
  }


  return (
    <NotificationsProvider>
      <form onSubmit={(e) => register(e)} className="title-wrapper">
        <Typography color="white" variant='h2'>{german.bar.register}</Typography>
        <TextField placeholder={german.email} onChange={(v) => setValues({ ...values, email: v.target.value })} />
        <TextField placeholder={german.name} onChange={(v) => setValues({ ...values, name: v.target.value })} />
        <OutlinedInput
          error={Object.values(errorMessage).some(value => value === true)}
          color="success"
          placeholder={german.password}
          id="outlined-adornment-password"
          type={showPassword ? 'text' : 'password'}
          value={values.password}
          onChange={handleChange('password')}
          endAdornment={
            <InputAdornment position="end">
              <IconButton
                size='small'
                aria-label="toggle password visibility"
                onClick={() => setShowPassword(!showPassword)}
                onMouseDown={handleMouseDownPassword}
                edge="end"
              >
                {showPassword ? `${german.hide}` : `${german.show}`}
              </IconButton>
            </InputAdornment>
          }
          label={german.password}
        />
        {errorMessage.length && <Typography variant="body2">{german.error.passwordLength}</Typography>}
        {errorMessage.lowerCase && <Typography variant="body2">{german.error.passwordLowerCase}</Typography>}
        {errorMessage.upperCase && <Typography variant="body2">{german.error.passwordUpperCase}</Typography>}
        {errorMessage.number && <Typography variant="body2">{german.error.passwordNumber}</Typography>}
        {errorMessage.symbol && <Typography variant="body2">{german.error.passwordSymbol}</Typography>}
        <Button type='submit'>{german.bar.login}</Button>
      </form>
    </NotificationsProvider>
  )
}
