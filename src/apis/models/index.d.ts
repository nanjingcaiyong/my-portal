import { MenuModel, Menu } from './MenuModel';

declare global {
  type IMenu = Menu
  type IMenuModel = MenuModel
}