import { createContext } from "react";
import { auth } from "../lib/firebase";

export const AuthContext = createContext({})

export function AuthProvider({children}) {

    const singInEmailPassword = async (email, senha) => {
        const response = auth.signInWithEmailAndPassword(email, senha)
        console.log(response)
    }

    const createAcount = async (user, email, senha) => {
        console.log(user, email, senha)
        const response = await auth.createUserWithEmailAndPassword(email, senha)
        console.log(response)
    }

    return (<AuthContext.Provider value={{singInEmailPassword, createAcount}}>
        {children}
    </AuthContext.Provider>)
}