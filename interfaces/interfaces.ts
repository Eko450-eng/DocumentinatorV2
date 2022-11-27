export interface folderStructure {
  id?: string,
  name: string,
  folderLocation: string,
  givenDate: Date,
  owner: string,
}

export interface IUser {
  name: string,
  email: string,
  password: string,
  icon?: any,
}

export interface FileStructure {
  name: string,
  folders: string,
  date: Date,
  isLocation: string,
  givenDate: Date,
  owner: string
}
