// import { createContext, useContext, useEffect, useState } from 'react'
// import api from '../api'
// import { useToaster } from './ToasterContext'
// import { useUser } from './UserContext'

// const FavoritesContext = createContext()

// export const FavoritesProvider = ({ children }) => {
//     const [favorites, setFavorites] = useState([])
//     const { errorToaster } = useToaster()
//     const { user } = useUser()

//     const addFavorite = async (recepieId) => {
//         try {
//             const res = await api.post(`http://localhost:5000/favorites/add/${recepieId}`)
//             if (res.status === 200) {
//                 // setFavorites([...favorites, res.data]);
//                 setFavorites(res.data)
//                 console.log(res.data)
//             } else {
//                 console.log(res.status)
//                 errorToaster("Something went wrong, try again later")
//             }
//         } catch (error) {
//             console.log("Error saving as favorite", error)
//             errorToaster("Something went wrong, try again later")
//         }
//     }

//     const removeFavorite = (recepieId) => {
//         try{
//             const res = api.put(`http://localhost:5000/favorites/delete/${recepieId}`)
//             if (res.status === 200) {
//                 setFavorites(res.data)
//             } else {
//                 console.log(res.status)
//                 errorToaster("Something went wrong, try again later")
//             }
        
//         }catch (error) {
//             console.log("Error removing favorite", error)
//             errorToaster("Something went wrong, try again later")
//         }
//     }

//     return (
//         <FavoritesContext.Provider value={{ addFavorite, removeFavorite, favorites }}>
//             {children}
//         </FavoritesContext.Provider>
//     )
// }

// export const useFavorites = () => {
//     return useContext(FavoritesContext)
// }