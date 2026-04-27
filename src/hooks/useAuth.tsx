import { createContext, useContext, useEffect, useState } from "react";
import { getLocalStorage, removeLocalStorage } from "../utilities/useLocalStorage";
import type { UserType } from "../features/dashboard/dashboard.types";


interface AuthContextType {
    user: UserType | null;
    logOut: () => void;
    login: (user: UserType) => void;
    loading:boolean;
}

const AuthContext = createContext<AuthContextType>({
    user: null,
    logOut: () => { },
    login: () => { },
    loading:false,
})

const AuthProvider = ({ children }: { children: React.ReactNode }) => {
    const [user, setUser] = useState<UserType | null>(null);
    const [loading, setLoading] = useState(true);


    useEffect(() => {
        const data = getLocalStorage("authUser");

        if (data) {
            try {
                setUser(typeof data === "string" ? JSON.parse(data) : data);
            } catch (err) {
                console.error("Invalid authUser in localStorage");
                setUser(null);
            }
        }

        setLoading(false);
    }, []);



    const logOut = () => {
        removeLocalStorage("authUser")
        setUser(null)
    };

    const login = (user: UserType) => {
        localStorage.setItem("authUser", JSON.stringify(user));
        setUser(user);
    };

    return (
        <AuthContext.Provider value={{ user, logOut, login, loading }}>
            {children}
        </AuthContext.Provider>
    )
}

export const useAuth = () => useContext<AuthContextType>(AuthContext);

export default AuthProvider
