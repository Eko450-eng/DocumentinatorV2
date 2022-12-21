import { faEllipsisV, faPen, faX } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { ActionIcon } from '@mantine/core'
import { ListItem, ListItemIcon, Modal, Box } from '@mui/material'
import React, { useState } from 'react'
import Popover from '@mui/material/Popover';
import { List, ListItemText } from '@mui/material';
import { FileStructure, folderStructure } from '../interfaces/interfaces'
import { useRouter } from 'next/router'
import CreateFolder from '../pages/CreateFolder'
import UpdateFile from '../pages/UpdateFolder/UpdateFile'

export function DocumentOptions({ props }: { props: { folder: folderStructure | undefined, deleteFolderFunction: any } }) {
  return (
    <List sx={{ pt: 0 }}>
      <ListItem className="btn">
        <ListItemIcon>
          <FontAwesomeIcon icon={faPen} color="white" /> :
        </ListItemIcon>
        <ListItemText primary=" Edit" />
      </ListItem>
      <ListItem className="btn" onClick={() => props.deleteFolderFunction(props.folder!.name)}>
        <ListItemIcon onClick={() => props.deleteFolderFunction(props.folder!.name)}>
          <FontAwesomeIcon icon={faX} color="white" /> :
        </ListItemIcon>
        <ListItemText primary="Delete" />
      </ListItem>
    </List>
  )
}

export function FileOptions({ props }: { props: { file: FileStructure | undefined, deleteFileFunction: any } }) {
  const router = useRouter()
  const { id } = router.query
  const [handleOpen, setOpen] = useState<boolean>(false)

  return (
    <>
      <List sx={{ pt: 0 }}>
        <ListItem className="btn">
          <ListItemIcon>
            <FontAwesomeIcon icon={faPen} color="white" /> :
          </ListItemIcon>
          <ListItemText primary=" Edit" onClick={() => setOpen(true)} />
          {/* <ListItemText primary=" Edit" onClick={() => setEditing(true)} /> */}
        </ListItem>
        <ListItem className="btn" onClick={() => props.deleteFileFunction(props.file!.name)}>
          <ListItemIcon>
            <FontAwesomeIcon icon={faX} color="white" /> :
          </ListItemIcon>
          <ListItemText primary="Delete" />
        </ListItem>
      </List>

      <Modal
        open={handleOpen}
        onClose={() => setOpen(false)}
      >
        <Box className="boxStyling">
          {props.file && <UpdateFile props={{ folderName: id, fileName: props.file.name }} />}
        </Box>
      </Modal>
    </>
  )
}

export function MenuItems({ props }: { props: { group: "file" | "folder", deleteFileFunction?: any, deleteFolderFunction?: any, file?: FileStructure, folder?: folderStructure } }) {
  const [anchorEl, setAnchorEl] = useState<any>(null);

  const handleClick = (event: any) => { setAnchorEl(event.currentTarget); };
  const handleClose = () => { setAnchorEl(null); };

  const open = Boolean(anchorEl);
  const id = open ? 'simple-popover' : undefined;

  const file = props.file
  const folder = props.folder

  const deleteFileFunction = props.deleteFileFunction
  const deleteFolderFunction = props.deleteFolderFunction

  return (
    <div>
      <ActionIcon
        className="item-card-menu"
        onClick={handleClick}
      >
        <FontAwesomeIcon icon={faEllipsisV} />
      </ActionIcon>
      <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}
      >
        {
          props.group == "file" ? <FileOptions props={{ file, deleteFileFunction }} /> : <DocumentOptions props={{ folder, deleteFolderFunction }} />
        }
      </Popover>
    </div>
  )
}
