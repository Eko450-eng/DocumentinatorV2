import { AppBar, Box, Card, CardContent, IconButton, InputBase, Modal, TextField, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { folderStructure } from '../../../interfaces/interfaces'
import { german } from '../../../languages/german'
import { useUser } from '../../../context/user/UserContext'
import { readFolders } from '../../api/folders/readFolders'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFolder, faPlusSquare } from '@fortawesome/free-regular-svg-icons'
import { CreateFolder } from '../../CreateFolder'
import { faArrowDown, faArrowUp, faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons'
import styled from '@emotion/styled'
import { useRouter } from 'next/router'

const style = {
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: "90%",
  border: '2px solid #000',
  margin: "0 auto",
  background: "#0d47a1",
  boxShadow: 24,
  p: 4,
};

export const ViewFolder = () => {
  const user = useUser()
  const router = useRouter()
  const [data, setData] = useState<Array<folderStructure>>()
  const [searchOptions, setSearchOptions] = useState<string>("")
  const [sortOrder, setSortOrder] = useState<boolean>(false)
  const [handleOpen, setOpen] = useState<boolean>(false)

  const handleClose = () => {
    setOpen(false)
  }

  const fetchFolders = async () => {
    if (!user) return
    readFolders(user.userName, searchOptions, sortOrder)
      .then((res: any) => (res && res.result) && setData(res.result))
  }

  useEffect(() => {
    fetchFolders()
  }, [searchOptions, sortOrder, user])

  return (
    <div className='title-wrapper'>
      <div className="inline-div">
        <Typography fontSize={20} variant='h2'>{german.yourFolders}</Typography>
        <IconButton onClick={() => setOpen(!handleOpen)} >
          <FontAwesomeIcon icon={faPlusSquare} color="white" />
        </IconButton>

        <IconButton
          onClick={() => setSortOrder(!sortOrder)}
          value="asc" key="asc">
          {sortOrder ?
            <FontAwesomeIcon icon={faArrowUp} color="white" /> :
            <FontAwesomeIcon icon={faArrowDown} color="white" />
          }
        </IconButton>
      </div>

      <TextField
        onChange={(value) => setSearchOptions(value.target.value)}
        placeholder="Suche"
      />

      <Modal
        open={handleOpen}
        onClose={() => setOpen(false)}
      >
        <Box sx={style}>
          <CreateFolder props={{ handleClose }} />
        </Box>
      </Modal>

      <div className="item-container">
        {data && data.map((data, index) => {
          return (
            <Card
              key={index}
              onClick={
                () => router.push(`/Overview/ViewFile/${data.name}`)
              }
            >
              <CardContent>
                <FontAwesomeIcon icon={faFolder} size={"xl"} color="white" />
                <Typography variant='body1' >{data.name}</Typography>
                <Typography variant='body2' >{data.folderLocation}</Typography>
              </CardContent>
            </Card>
          )
        })}
      </div>
    </div>
  )
}
