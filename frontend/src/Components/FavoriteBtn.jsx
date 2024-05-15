import { useState, useEffect } from 'react'
import { useNavigate, useLocation } from 'react-router-dom';
import { useUser } from '../Context/UserContext'
import api from '../api'
import { useToaster } from '../Context/ToasterContext'

const FavoriteBtn = ({ recepie }) => {
    //känns redundant med state om jag redan har favorites i localStorage... inte som user där man lätt vill importera ett state?
    //aja, backend verkar funka som den ska.
    const [favorites, setFavorites] = useState(() => {
        const savedFavorites = localStorage.getItem('favorites')
        return savedFavorites ? JSON.parse(savedFavorites) : []
    })
    // const [favorites, setFavorites] = useState([])
    const [isFavorite, setIsFavorite] = useState(() => {
        const savedFavorites = localStorage.getItem('favorites')
        return savedFavorites ? JSON.parse(savedFavorites).includes(recepie._id) : null
    })

    const { user } = useUser()
    const { errorToaster } = useToaster()

    const token = localStorage.getItem('token');
    const isAuthenticated = !!token;

    const navigate = useNavigate()
    const location = useLocation()

    useEffect(() => {
        if(!isAuthenticated) return
        const fetchFavorites = async () => {
            try {
                const res = await api.get(`http://localhost:5000/favorites/`)
                if (res.status === 200) {
                    console.log("favorites res.data", res.data)
                    setFavorites(res.data)
                    localStorage.setItem('favoriteRec', JSON.stringify(res.data))

                    if(res.data.includes(recepie._id)) {
                        setIsFavorite(true)
                    } else {
                        setIsFavorite(false)
                    }
                } else {
                    console.log(res.status)
                    errorToaster("Something went wrong, try again later")
                }
            } catch (error) {
                console.log("Error fetching favorites", error)
            }
        }

        fetchFavorites()

    }, [])

    const handleFavorite = async () => {
        try {
            if (!isAuthenticated) {
                navigate('/login', { state: { from: location } })
                return
            } else if (recepie.user._id === user._id) {
                errorToaster("You can't favorite your own recepie")
                return
            }

            if (isFavorite) {
                const res = await api.put(`http://localhost:5000/favorites/remove/${recepie._id}`)

                if (res.status === 200) {
                    setIsFavorite(false)
                    setFavorites(res.data)
                    if(res.data.length === 0) localStorage.removeItem('favoriteRec')
                } else {
                    console.log(res.status)
                    errorToaster("Something went wrong, try again later")
                }

            } else {
                const res = await api.post(`http://localhost:5000/favorites/add/${recepie._id}`)
                if (res.status === 200) {
                    setIsFavorite(true)
                    setFavorites(res.data)
                } 
            }

            setIsFavorite(!isFavorite)

        } catch (error) {
            console.log("Error adding favorite", error)
            errorToaster("Something went wrong, try again later")
        }
    }

    return (
        <div>
            <button onClick={handleFavorite}
            className={`btn ${isFavorite ? 'btn-secondary' : 'btn-primary'}`} 
            >
                {isFavorite ? "Remove from favorites" : "Save as favorite"}
            </button>
        </div>
    )
}

export default FavoriteBtn