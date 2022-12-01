import React from 'react'
import { Card, CardContent, Typography } from '@mui/material'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { FileStructure, folderStructure } from '../interfaces/interfaces'
import { MenuItems } from './MenuItems'
import { useRouter } from 'next/router'
import { faFile, faFolder } from '@fortawesome/free-solid-svg-icons'

export default function FolderCard({ props }: { props: { folder: folderStructure, deleteFolderFunction: any } }) {
  const router = useRouter()
  const folder = props.folder
  const deleteFolderFunction = props.deleteFolderFunction
  const group = "folder"

  return (
    <Card className="item-card">
      <MenuItems props={{ group, folder, deleteFolderFunction }} />
      <CardContent onClick={() => router.push(`/Overview/ViewFile/${folder.name}`)} >
        <FontAwesomeIcon icon={faFolder} size={"xl"} color="white" />
        <Typography variant='body1' >{folder.name}</Typography>
        <Typography variant='body2' >{folder.folderLocation}</Typography>
      </CardContent>
    </Card>
  )
}

export function FileCard({ props }: { props: { file: FileStructure, deleteFileFunction: any } }) {
  const file = props.file
  const deleteFileFunction = props.deleteFileFunction
  const group = "file"

  return (
    <Card className="item-card">
      <MenuItems props={{ group, file, deleteFileFunction }} />
      <CardContent>
        <FontAwesomeIcon icon={faFile} size={"xl"} color="white" />
        <Typography variant='body1' >{file.name}</Typography>
        <Typography variant='body1' >{file.isLocation}</Typography>
      </CardContent>
    </Card>
  )
}

