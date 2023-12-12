'use client'

import { api } from "@/services/api";
import { createContext, useContext, useEffect, useState } from "react";

interface AuthContextData {
    user?: User 
}
interface User {
    role: string,
    name: string,
    id: string,
    picture: string
}
export const AuthContext = createContext<AuthContextData>({} as AuthContextData)

export function AuthContextProvider({ children }: { children: React.ReactNode } ) {
    const[user, setUser] = useState<User>()
    async function recoverUserInformation() {
        try {
            let res = await api.get("/auth/me")
            setUser(res.data)
        } catch (err) {
            console.log(err)
        }
    }
    useEffect(() => {
        recoverUserInformation()
    }, [])

    return (
        <AuthContext.Provider value={{ user }}>
            {children}
        </AuthContext.Provider>
    )
}
