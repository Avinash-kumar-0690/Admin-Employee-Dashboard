import type { UserType } from "../features/dashboard/dashboard.types";

// set data into localstorage 
export const  setLocalStorage = (key:string, value:UserType) => {
    localStorage.setItem(key, JSON.stringify(value))
}

// get data from localstorage 
export const getLocalStorage = (key:string):string | null => {
   const res =  localStorage.getItem(key);
   return res
}

// remove data from localstorage 
export const removeLocalStorage = (key:string) => {
    localStorage.removeItem(key)
}