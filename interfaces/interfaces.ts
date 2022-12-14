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

export interface LoginState {
  password: string;
  showPassword: boolean;
}

export interface SurrealFileStructure {
  folder: string,
  givenDate: any,
  date: any,
  isLocation: string,
  id: string,
  name: string,
  owner: string
}

