import { useEffect, useState } from 'react'
import { useSession } from '../Context/SessionContext'
import { useNavigate, useLocation } from 'react-router-dom';
import apiClient from '../api'
import { AxiosError } from 'axios';


const LikeBtn = ({ recepie }) => {
    const [isLiked, setIsLiked] = useState(false)
    const { user, refreshToken } = useSession()
    const isAuthenticated = !!user
    const isDisabled = recepie.user._id === user?._id

    const navigate = useNavigate()
    const location = useLocation()

    const like = async () => {
        try {
            await apiClient.put(`/recepies/like/${recepie._id}`)
            setIsLiked(true)
        } catch (error) {
            if (error instanceof AxiosError) {
                if (error.response?.status === 401) {
                    const isRefreshed = await refreshToken()
                    if (isRefreshed) return like()
                }
            }
            return navigate('/login', { state: { from: location } })
        }
    }

    const unlike = async () => {
        try {
            await apiClient.put(`/recepies/unlike/${recepie._id}`)
            setIsLiked(false)
        } catch (error) {
            if (error instanceof AxiosError) {
                if (error.response?.status === 401) {
                    const isRefreshed = await refreshToken()
                    if (isRefreshed) return unlike()
                }
            }
            return navigate('/login', { state: { from: location } })
        }
    }

    const handleLike = async () => {
        if (!isAuthenticated) return navigate('/login', { state: { from: location } })
        if (isLiked) await unlike()
        else await like()
    }

    useEffect(() => {
        if (!isAuthenticated) return
        const fetchLikes = async () => {
            const res = await apiClient.get(`/recepies/get/likes/${recepie._id}`)
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