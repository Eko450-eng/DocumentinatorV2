import { Box, IconButton, Modal, TextField, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { folderStructure } from '../../../interfaces/interfaces'
import { german } from '../../../languages/german'
import { useUser } from '../../../context/user/UserContext'
import { readFolders } from '../../api/folders/readFolders'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlusSquare } from '@fortawesome/free-regular-svg-icons'
import CreateFolder from '../../CreateFolder'
import { faArrowDown, faArrowUp } from '@fortawesome/free-solid-svg-icons'
import FolderCard from '../../../components/Cards'
import { deleteFolder } from '../../api/folders/deleteFolder'

const ViewFolder = () => {
  const user = useUser()
  const [data, setData] = useState<Array<folderStructure>>()
  const [searchOptions, setSearchOptions] = useState<string>("")
  const [sortOrder, setSortOrder] = useState<boolean>(false)
  const [handleOpen, setOpen] = useState<boolean>(false)

  const handleClose = () => { setOpen(false) }

  const fetchFolders = async () => {
    if (!user) return
    setTimeout(() => {
      readFolders(user.userName, searchOptions, sortOrder)
        .then((res: any) => (res && res.result) && setData(res.result))
    }, 250);
  }

  const deleteFolderFunction = (folder: string) => {
    deleteFolder(folder)
    fetchFolders()
  }

  useEffect(() => {
    fetchFolders()
  }, [searchOptions, sortOrder, user ])

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
        <Box className="boxStyling">
          <CreateFolder props={{ handleClose, fetchFolders }} />
        </Box>
      </Modal>

      <div className="item-container">
        {data && data.map((folder, index) => {
          return (
            <FolderCard key={index} props={{ folder, deleteFolderFunction }} />
          )
        })}
      </div>
    </div>
  )
}
export default ViewFolder
