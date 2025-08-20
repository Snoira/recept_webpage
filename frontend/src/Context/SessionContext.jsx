import { createContext, useContext, useEffect, useCallback } from 'react'
import { useState } from 'react'
import axios, { AxiosError } from 'axios'
import { useNavigate, useLocation } from 'react-router-dom'
import { useUser } from './UserContext'

const SessionContext = createContext()
const AUTH_URL = `${import.meta.env.API_URL ?? 'http://localhost:8080'}/auth`;

export const SessionProvider = ({ children }) => {
    const [state, setState] = useState({
        isLoading: false,
        userDetails: null,
    })

    const { signInUser } = useUser()

    const navigate = useNavigate()
    const location = useLocation()

    const logIn = useCallback(
        async (inputs, redirectPath = "/") => {
            try {
                const res = await axios.post(`${AUTH_URL}/login`, inputs)
                setState({ isLoading: false, userDetails: res.data.user })
                signInUser(res.data)
                navigate(location.state?.from ? location.state.from : redirectPath, { replace: true })

            } catch (error) {
                let message = "Something went wrong";
                if (error instanceof AxiosError) {
                    message = error.response?.data.message ?? message;
                }
                throw new Error(message);
            }
        }, [])

    const register = async (inputs, redirectPath = "/") => {
        try {
            const res = await axios.post(`${AUTH_URL}/register`, inputs)
            setState({ isLoading: false, userDetails: res.data.newUser })
            signInUser(res.data)
            navigate(location.state?.from ? location.state.from : redirectPath, { replace: true })

        } catch (error) {
            let message = "Something went wrong";
            if (error instanceof AxiosError) {
                message = error.response?.data.message ?? message;
            }
            throw new Error(message);
        }
    }



    return (
        <SessionContext.Provider value={{ logIn, register, user: state.userDetails }}>
            {children}
        </SessionContext.Provider>
    )
}

export const useSession = () => {
    return useContext(SessionContext)
}
