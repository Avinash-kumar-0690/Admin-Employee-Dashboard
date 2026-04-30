import { createContext, useContext, useEffect, useState } from "react";
import { getLocalStorage, removeLocalStorage } from "../utilities/useLocalStorage";
import type { UserType } from "../features/dashboard/dashboard.types";

// Centralized auth context to share user state across the app
interface AuthContextType {
    user: UserType | null;
    logOut: () => void;
    login: (user: UserType) => void;
    loading: boolean; // used to block UI until auth state is restored
}

// Default values prevent crashes if hook is used outside provider
const AuthContext = createContext<AuthContextType>({
    user: null,
    logOut: () => { },
    login: () => { },
    loading: false,
});

const AuthProvider = ({ children }: { children: React.ReactNode }) => {
    const [user, setUser] = useState<UserType | null>(null);

    // true initially to avoid rendering before checking localStorage
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // restore user session from localStorage (if available)
        const data = getLocalStorage("authUser");

        if (data) {
            try {
                // supports both raw object and stringified JSON
                setUser(typeof data === "string" ? JSON.parse(data) : data);
            } catch {
                // fallback if stored data is corrupted
                setUser(null);
            }
        }

        // auth check complete → allow UI to render
        setLoading(false);
    }, []);

    const logOut = () => {
        // clear persisted session + reset state
        removeLocalStorage("authUser");
        setUser(null);
    };

    const login = (user: UserType) => {
        // persist session so it survives refresh
        localStorage.setItem("authUser", JSON.stringify(user));
        setUser(user);
    };

    return (
        <AuthContext.Provider value={{ user, logOut, login, loading }}>
            {children}
        </AuthContext.Provider>
    );
};

// cleaner access instead of calling useContext everywhere
export const useAuth = () => useContext<AuthContextType>(AuthContext);

export default AuthProvider;