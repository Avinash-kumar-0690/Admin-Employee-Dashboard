
import { api } from "../../../../services/BaseApi";
import type { UserType } from "../../dashboard.types";


// calls the user list 
export const getUsers = async  ():Promise<UserType[]> => {
   const res = await api.get<UserType[]>("/users");
    return res.data
  
}

// calls the user by Id
