import { Button, TextField, Typography } from '@mui/material'
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import React, { useState } from 'react'
import { useUser } from '../../context/user/UserContext'
import { german } from '../../languages/german'
import updateDocument from '../api/documents/updateDocument'

const UpdateFile = ({ props }: { props: { folderName: string | string[] | undefined, fileName: string } }) => {
  const user = useUser()

  const [values, setValues] = useState({
    folderLocation: "Zuhause",
    folder: props.folderName,
    name: props.fileName,
    owner: `${user && user.userName}`,
    givenDate: new Date
  })

  const UpdateFileFunction = async (e: any) => {
    e.preventDefault()
    if (!user) return
    updateDocument(values, props.folderName, props.fileName, user.userName)
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
