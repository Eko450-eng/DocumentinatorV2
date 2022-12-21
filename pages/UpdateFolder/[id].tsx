import { Button, TextField, Typography } from '@mui/material'
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import { useRouter } from 'next/router'
import React, { useState } from 'react'
import { useUser } from '../../context/user/UserContext'
import { german } from '../../languages/german'
import updateDocument from '../api/documents/updateDocument'

const UpdateFile = () => {
  const user = useUser()
  const router = useRouter()
  const { id } = router.query


  const [values, setValues] = useState({
    folderLocation: "Zuhause",
    folder: id,
    name: "",
    owner: `${user && user.userName}`,
    givenDate: new Date
  })

  const UpdateFileFunction = async (e: any) => {
    e.preventDefault()
    if (!user) return
    updateDocument(user.userName, values)
  }

  return (
    <form onSubmit={UpdateFileFunction}>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <Typography variant='h2' >{german.addFiles}</Typography>
        <Typography fontSize={20} variant='h2' > Ordner hinzufügen </Typography>
        <TextField
          placeholder={german.name}
          value={values.name}
          onChange={(newValue) => { setValues({ ...values, name: newValue.target.value }) }}
        />

        <DatePicker
          label={german.date}
          value={values.givenDate}
          onChange={(newValue) => { setValues({ ...values, givenDate: newValue! }) }}
          renderInput={(params) => <TextField {...params} />}
        />

        <TextField
          value={values.folderLocation}
          onChange={(newValue) => { setValues({ ...values, folderLocation: newValue.target.value }) }}
          placeholder={german.location}
        />
        <Button type='submit' >{german.add}</Button>
      </LocalizationProvider>
    </form>
  )
}
export default UpdateFile
