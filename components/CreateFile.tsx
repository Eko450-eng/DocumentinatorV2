import { Button, TextField, Typography } from '@mui/material'
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import React, { useState } from 'react'
import { useUser } from '../context/user/UserContext'
import { german } from '../languages/german'
import createDocument from '../pages/api/documents/createDocument'

const CreateFile = ({ props }: { props: { id?: string | string[] | undefined, handleClose: any, fetchFiles: any } }) => {
  const user = useUser()
  const id = props.id ? props.id : "ERROR"

  const [values, setValues] = useState({
    folderLocation: "Zuhause",
    folder: id,
    name: "",
    owner: `${user && user.userName}`,
    givenDate: new Date
  })

  const createFileFunction = async (e: any) => {
    e.preventDefault()
    if (!user) return
    createDocument(user.userName, values)
    props.handleClose()
    props.fetchFiles()
  }

  return (
    <form onSubmit={createFileFunction}>
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
export default CreateFile
