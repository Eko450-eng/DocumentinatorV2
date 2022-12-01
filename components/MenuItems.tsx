import { faEllipsisV, faPen, faX } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { ActionIcon } from '@mantine/core'
import { ListItem, ListItemIcon } from '@mui/material'
import React, { useState } from 'react'
import Popover from '@mui/material/Popover';
import { List, ListItemText } from '@mui/material';
import { FileStructure, folderStructure } from '../interfaces/interfaces'

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
  return (
    <List sx={{ pt: 0 }}>
      <ListItem className="btn">
        <ListItemIcon>
          <FontAwesomeIcon icon={faPen} color="white" /> :
        </ListItemIcon>
        <ListItemText primary=" Edit" />
      </ListItem>
      <ListItem className="btn" onClick={() => props.deleteFileFunction(props.file!.name)}>
        <ListItemIcon>
          <FontAwesomeIcon icon={faX} color="white" /> :
        </ListItemIcon>
        <ListItemText primary="Delete" />
      </ListItem>
    </List>
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
