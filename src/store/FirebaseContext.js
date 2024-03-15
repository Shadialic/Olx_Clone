import { createContext, useState } from 'react'

export const FirebaseContext = createContext(null);
export const AuthContext = createContext(null);
//here there is a props and inside that props there is a children as default ,we need to deconstruct that
// so here it destructuring the children from its props
export default function Context({ children }) {
    const [user, setUser] = useState(null);

    return (
        <AuthContext.Provider value={{ user, setUser }}>
            {children}
        </AuthContext.Provider>
    )
}

