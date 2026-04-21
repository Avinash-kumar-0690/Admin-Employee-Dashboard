import type { UserType } from "../features/dashboard/dashboard.types";


export const  setLocalStorage = (key:string, value:UserType) => {
    localStorage.setItem(key, JSON.stringify(value))
}

export const getLocalStorage = (key:string):string | null => {
   const res =  localStorage.getItem(key);
   return res
}
export const removeLocalStorage = (key:string) => {
    localStorage.removeItem(key)
}