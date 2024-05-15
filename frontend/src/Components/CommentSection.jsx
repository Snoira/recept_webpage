import { useState, useEffect } from 'react'
import { useNavigate, useLocation } from 'react-router-dom';
import { useUser } from '../Context/UserContext'
import api from '../api'
import { useToaster } from '../Context/ToasterContext'

const CommentSection = ({ recepie }) => {
    const [comments, setComments] = useState([])
    const { user } = useUser()
    const { errorToaster } = useToaster()
    const [newComment, setNewComment] = useState('')

    const token = localStorage.getItem('token');
    const isAuthenticated = !!token;

    const navigate = useNavigate()
    const location = useLocation()

    useEffect(() => {
        const fetchComments = async () => {
            try {
                const res = await api.get(`http://localhost:5000/comment/recepie/${recepie._id}`)
                if (res.status === 200) {
                    console.log("comments res.data", res.data)
                    setComments(res.data)
                } else {
                    console.log(res.status)
                    errorToaster("Something went wrong, try again later")
                }
            } catch (error) {
                console.log("Error fetching comments", error)
            }
        }
        fetchComments()
    }, [])

    const handleComment = async (content) => {
        try {
            if (!isAuthenticated) {
                navigate('/login', { state: { from: location } })
                return
            }
            const res = await api.post(`http://localhost:5000/comment/create/${recepie._id}`, { content })
            if (res.status === 201) {
                console.log("comment res.data", res.data)
                setComments([...comments, res.data])
                setNewComment('')
            } else {
                console.log(res.status)
                errorToaster("Something went wrong, try again later")
            }
        } catch (error) {
            console.log("Error creating comment", error)
        }
    }

    const deleteComment = async (commentId) => {
        try {
            const res = await api.delete(`http://localhost:5000/comment/delete/${commentId}`)
            if (res.status === 204) {
                setComments(comments.filter(comment => comment._id !== commentId))
            } else {
                console.log(res.status)
                errorToaster("Something went wrong, try again later")
            }
        } catch (error) {
            console.log("Error deleting comment", error)
        }
    }

    return (
        <div>
            <h2>Comments</h2>
            <ul>
                {comments && comments.map((comment, i) =>
                    <div key={i}>
                        <li>{comment.user.username}: {comment.content}</li>
                        {(user && comment.user._id === user._id) &&
                            <button onClick={() => {deleteComment(comment._id)}}>Delete</button>
                        }
                    </div>
                )}
            </ul>
            <form action="comment">
                <textarea name="comment" id="comment" placeholder='comment' className='form-control' value={newComment} onChange={(e) => { console.log(e.target.value); setNewComment(e.target.value) }}></textarea>
                <button onClick={(e) => { e.preventDefault(); handleComment(newComment) }}>Post comment</button>
            </form>
        </div>
    )
}

export default CommentSection