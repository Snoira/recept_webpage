import { createContext, useEffect, useState } from 'react'
import api from '../api'

const FavoritesContext = createContext()

export const FavoritesProvider = ({ children }) => {
    const [favorites, setFavorites] = useState([])

    useEffect(() => {
        const fetchFavorites = async () => {
            try{
                const res = await api.get('http://localhost:5000/favorites/')
                setFavorites(res.data)
            } catch (error) {
                console.log("Error fetching favorites", error)
            }
        }
        fetchFavorites()
    }, [])

    const addFavorite = async (recepieId) => {
        try {
            const res = await api.post(`http://localhost:5000/favorites/add/${recepieId}`)
            if (res.status === 200) {
                setFavorites([...favorites, res.data]);
                console.log(res.data)
            } else {
                console.log(res.status)
            }
        } catch (error) {
            console.log("Error saving as favorite", error)
        }
    }

    const removeFavorite = (id) => {
        setFavorites(favorites.filter(favorite => favorite.id !== id))
    }

    return (
        <FavoritesContext.Provider value={{ addFavorite, removeFavorite, favorites }}>
            {children}
        </FavoritesContext.Provider>
    )
}