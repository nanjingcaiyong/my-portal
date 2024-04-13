import { BaseModel } from './BaseModal'

export type Menu = {
  id: number
  code: string
  description?: string
  menuName: string
  path: string
  type: number,
  pid: number,
  creator: string,
  createAt: string,
  updateAt: string,
  children: Menu[]
}

export type MenuData = BaseModel<Menu[]>