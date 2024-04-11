import { PORTAL_TOKEN_KEY, PORTAL_USER_KEY, AUTO_LOGIN_KEY, SYSTEM_LOCALE_KEY } from './constants';

export enum AutoLogin {
  NOT_AUTO_LOGIN,
  AUTO_LOGIN,
}

export const changeAutoLogin = (status: AutoLogin) => {
  localStorage.setItem(AUTO_LOGIN_KEY, String(status))
}

export const setToken = (token: string) => {
  localStorage.setItem(PORTAL_TOKEN_KEY, token);
}

export const getToken = () => {
  return localStorage.getItem(PORTAL_TOKEN_KEY);
}

export const setAccount = (account: Record<string, any>) => {
  localStorage.setItem(PORTAL_USER_KEY, JSON.stringify(account));
}

export const getAccount = () => {
  return JSON.parse(localStorage.getItem(PORTAL_USER_KEY) || '{}')
}