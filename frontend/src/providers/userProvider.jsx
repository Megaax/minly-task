import { createContext, useContext, useEffect, useState } from 'react'

const addToLocalStorgae = (key, value) => {
    try {
        localStorage.setItem(key, JSON.stringify(value))

    } catch (error) {
        console.log(error)
    }
}

const getLocalStorgae = (key) => {
    try {
        return JSON.stringify(localStorage.getItem(key)) || null
    } catch (error) {
        console.log(error)
    }
}

const UserContext = createContext()

const UserProvider = ({ children }) => {
    const [user, setUser] = useState(() => getLocalStorgae('user') || null)

    const setLocalUser = (user) => {
        console.log("setting user")
        setUser(user)
        addToLocalStorgae(user)
    }

    return (
        <UserContext.Provider value={{ user, setUser: setLocalUser }}>
            {children}
        </UserContext.Provider>
    )
}

export default UserProvider

const useUser = () => {
    const context = useContext(UserContext)
    if (context === undefined) {
        throw new Error("useUser can only work inside a provider")
    }
    return context
}

export { useUser }