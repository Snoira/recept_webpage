import { useEffect, useState } from 'react'
import { useUser } from '../Context/UserContext'
import { useNavigate, useLocation } from 'react-router-dom';
import { useToaster } from '../Context/ToasterContext'
import api from '../api'
import axios from 'axios'

const RECEPIE_URL = `${import.meta.env.API_URL || 'http://localhost:8080'}/recepies`;

const LikeBtn = ({ recepie }) => {
    const [isLiked, setIsLiked] = useState(false)
    const { user } = useUser()
    const { errorToaster } = useToaster()

    const token = localStorage.getItem('token');
    const isAuthenticated = !!token;

    const navigate = useNavigate()
    const location = useLocation()


    const handleLike = async () => {
        if (!isAuthenticated) {
            navigate('/login', { state: { from: location } })
            return
        }
        else if (recepie.user._id === user._id) {
            errorToaster("You can't like your own recepie")
            return
        }

        if (isLiked) {
            const res = await api.put(`${RECEPIE_URL}/unlike/${recepie._id}`)
            if (res.status === 200) {
                console.log("Unlike")
                setIsLiked(false)
            } else {
                console.log("Error removing like")
            }
        } else {
            const res = await api.put(`${RECEPIE_URL}/like/${recepie._id}`)
            if (res.status === 200) {
                console.log("Like")
                setIsLiked(true)
            } else {
                console.log("Error adding like")
            }
        }
    }


    useEffect(() => {
        if (!isAuthenticated) return
        const fetchLikes = async () => {
            const res = await axios.get(`${RECEPIE_URL}/get/likes/${recepie._id}`)
            if (res.status === 200) {
                console.log(res.data)
                if (res.data.includes(user._id)) {
                    setIsLiked(true)
                } else {
                    setIsLiked(false)
                }
            } else {
                console.log("Error fetching likes")
            }
        }
        fetchLikes()

    }, [])

    return (
        <button onClick={(e) => { e.preventDefault(); handleLike() }}
            className={`btn ${isLiked ? 'btn-secondary' : 'btn-primary'}`} >
            {isLiked ? "Unlike" : "Like"}
        </button>
    )
}
export default LikeBtn