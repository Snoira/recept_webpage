import { createContext, useContext, useEffect } from 'react'
import { useState } from 'react'

const UserContext = createContext()

export const UserProvider = ({ children }) => {
    const [user, setUser] = useState(()=>{
        const savedUser = localStorage.getItem('user')
        return savedUser ? JSON.parse(savedUser) : null
    })

    useEffect(() => {
        if (user) {
          localStorage.setItem('user', JSON.stringify(user))
        } else {
          localStorage.removeItem('user')
        }
      }, [user])

    const signInUser = (data) => {
        const token = data.tokens.accessToken
        localStorage.setItem('token', token)

        setUser(data.user || data.newUser)
        console.log('Logged in', token)
    }

    const signOutUser = () => {
        localStorage.removeItem('token')
        setUser(null)
    }

    return (
        <UserContext.Provider value={{ signInUser, signOutUser, user }}>
            {children}
        </UserContext.Provider>
    )
}

export const useUser = () => {
    return useContext(UserContext)
}
