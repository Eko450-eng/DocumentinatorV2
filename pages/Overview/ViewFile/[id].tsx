import { readFiles } from '../../api/documents/readDocuments'
import { IconButton, Modal, TextField, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { german } from '../../../languages/german'
import { useUser } from '../../../context/user/UserContext'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlusSquare } from '@fortawesome/free-regular-svg-icons'
import { faArrowDown, faArrowUp } from '@fortawesome/free-solid-svg-icons'
import { useRouter } from 'next/router'
import { FileStructure } from '../../../interfaces/interfaces'
import { FileCard } from '../../../components/Cards'
import { deleteDocument } from '../../api/documents/deleteDocument'
import { Box } from '@mui/system'
import CreateFile from '../../../components/CreateFile'

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
    if (!user) return
    setTimeout(() => {
      readFiles(id!, searchOptions)
        .then((res: any) => (res && res.result) && setData(res.result))
    }, 250);
  }

  const deleteFileFunction = (file: string) => {
    deleteDocument(file)
    fetchFiles()
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

      <Modal open={handleOpen} onClose={() => setOpen(false)}>
        <Box className="boxStyling">
          {id ? <CreateFile props={{ id, handleClose, fetchFiles }} /> :
            <></>
          }
        </Box>
      </Modal>

      <div className="item-container">
        {data && data.map((file, index) => {
          return (
            <FileCard key={index} props={{ file, deleteFileFunction }} />
          )
        })}
      </div>
    </div >
  )
}
export default ViewFile
