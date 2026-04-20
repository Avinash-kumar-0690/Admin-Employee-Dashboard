import {createContext, useContext, useEffect, useState} from "react";
import type { User } from "../features/users/users.types";
import { getLocalStorage, removeLocalStorage } from "../utilities/useLocalStorage";


interface AuthContextType {
    user: User | null;
    logOut : () => void;
    login: (user:User) => void;
}

const AuthContext = createContext<AuthContextType>({
    user: null,
    logOut: () => {},
    login:() => {},
})

const AuthProvider = ({children}:{children:React.ReactNode}) => {
    const [user, setUser] = useState<User | null>(null);


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

    const login = (user: User) => {
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
