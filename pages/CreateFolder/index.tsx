import { Button, TextField, Typography } from '@mui/material'
import React, { useState } from 'react'
import { useUser } from '../../context/user/UserContext'
import { folderStructure } from '../../interfaces/interfaces'
import { DatePicker } from '@mui/x-date-pickers'
import { createFolder } from '../api/folders/createFolder'
import { german } from '../../languages/german'

export const CreateFolder = ({ props }: { props: any }) => {
  const user = useUser()

  const [values, setValues] = useState<folderStructure>({
    folderLocation: "Zuhause",
    name: "",
    owner: user!.userName,
    givenDate: new Date
  })

  const createFolderFunction = async (e: any) => {
    e.preventDefault()
    if (!user) return
    createFolder(user.userName, values)
    props.handleClose()
  }

  return (
    <form onSubmit={createFolderFunction}>
      <Typography fontSize={20} variant='h2' >{german.addFolders}</Typography>
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
    </form>
  )
}
