import {createContext, useContext, useEffect, useState} from "react";
import { getLocalStorage, removeLocalStorage } from "../utilities/useLocalStorage";
import type { UserType } from "../features/dashboard/dashboard.types";


interface AuthContextType {
    user: UserType | null;
    logOut : () => void;
    login: (user:UserType) => void;
}

const AuthContext = createContext<AuthContextType>({
    user: null,
    logOut: () => {},
    login:() => {},
})

const AuthProvider = ({children}:{children:React.ReactNode}) => {
    const [user, setUser] = useState<UserType | null>(null);


    useEffect(() => {
        const data = getLocalStorage("authUser");
        if(data){
            setUser(JSON.parse(data))
        }
    },[]);



    const logOut = () => {
        removeLocalStorage("authUser")
        setUser(null)
    };

    const login = (user: UserType) => {
  localStorage.setItem("authUser", JSON.stringify(user));
  setUser(user);
};

    return (
        <AuthContext.Provider value={{user, logOut, login}}>
            {children}
        </AuthContext.Provider>
    )
}

export const useAuth = () => useContext<AuthContextType>(AuthContext);

export default AuthProvider
