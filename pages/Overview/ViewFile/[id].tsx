import { readFiles } from '../../api/documents/readDocuments'
import { Box, Card, CardContent, IconButton, Modal, TextField, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { german } from '../../../languages/german'
import { useUser } from '../../../context/user/UserContext'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFolder, faPlusSquare } from '@fortawesome/free-regular-svg-icons'
import { faArrowDown, faArrowUp } from '@fortawesome/free-solid-svg-icons'
import { useRouter } from 'next/router'
import { FileStructure } from '../../../interfaces/interfaces'
import CreateFile from '../../CreateFile'

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

const ViewFile = () => {
  const router = useRouter()
  const user = useUser()
  const { id } = router.query
  const [data, setData] = useState<Array<FileStructure>>([])

  const [searchOptions, setSearchOptions] = useState<string>("")
  const [sortOrder, setSortOrder] = useState<boolean>(false)
  const [handleOpen, setOpen] = useState<boolean>(false)

  const handleClose = () => { setOpen(false) }
  const fetchFiles = async () => {
    readFiles(user!.userName, id!, searchOptions)
      .then((res: any) => (res && res.result) && setData(res.result))
  }

  useEffect(() => {
    if (!user) return
    fetchFiles()
  }, [id, user, sortOrder, searchOptions, setOpen])

  return (
    <div className='title-wrapper'>
      <div className="inline-div">
        <Typography fontSize={20} variant='h2' color="white">{german.yourFiles}</Typography>
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
        <Box sx={style} >
          <CreateFile props={id} handleClose={() => handleClose()} />
        </Box>
      </Modal>

      <div className="item-container">
        {data && data.map((data, index) => {
          return (
            <Card
              key={index}
            >
              <CardContent>
                <FontAwesomeIcon icon={faFolder} size={"xl"} color="white" />
                <Typography variant='body1' >{data.name}</Typography>
                <Typography variant='body2' >{data.isLocation}</Typography>
              </CardContent>
            </Card>
          )
        })}
      </div>
    </div>
  )
}
export default ViewFile
