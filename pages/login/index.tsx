import React, { useState } from 'react'
import { NotificationsProvider, showNotification } from '@mantine/notifications'
import { Button, IconButton, InputAdornment, OutlinedInput, TextField, Typography } from '@mui/material'
import { readUser } from '../api/users/readUser'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faXmarkCircle } from '@fortawesome/free-regular-svg-icons'
import { useRouter } from 'next/router'
import { useUser } from '../../context/user/UserContext'
import { german } from '../../languages/german'

interface State {
  password: string;
  showPassword: boolean;
}

export default function Login() {
  const user = useUser()
  const router = useRouter()
  if (user) router.push("/")

  const [email, setEmail] = useState<string>("")
  const route = useRouter()
  const [values, setValues] = useState<State>({
    password: '',
    showPassword: false,
  });

  const handleChange =
    (prop: keyof State) => (event: React.ChangeEvent<HTMLInputElement>) => {
      setValues({ ...values, [prop]: event.target.value });
      console.log()
    };


  const handleClickShowPassword = () => {
    setValues({
      ...values,
      showPassword: !values.showPassword,
    });
  };

  const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
  };


  const handleLogin = (e: any) => {
    e.preventDefault()
    readUser(email, values.password)
      .catch((e) => {
        if (e.error) {
          showNotification({
            title: `${german.error.unknownError}`,
            message: e.message,
            color: "red",
            icon: <FontAwesomeIcon icon={faXmarkCircle} />
          })
          return
        }
        if (!e.error) route.reload()
      })
  }

  return (
    <NotificationsProvider>
      <form onSubmit={(e) => handleLogin(e)} className="title-wrapper">
        <Typography color="white" variant='h2'>{german.bar.login}</Typography>
        <TextField placeholder={german.email} onChange={(v) => setEmail(v.target.value)} />
        <OutlinedInput
          color="success"
          placeholder={german.password}
          id="outlined-adornment-password"
          type={values.showPassword ? 'text' : 'password'}
          value={values.password}
          onChange={handleChange('password')}
          endAdornment={
            <InputAdornment position="end">
              <IconButton
                size='small'
                aria-label="toggle password visibility"
                onClick={handleClickShowPassword}
                onMouseDown={handleMouseDownPassword}
                edge="end"
              >
                {values.showPassword ? `${german.hide}` : `${german.show}`}
              </IconButton>
            </InputAdornment>
          }
          label={german.password}
        />
        <Button type='submit'>{german.bar.login}</Button>
      </form>
    </NotificationsProvider>
  )
}
