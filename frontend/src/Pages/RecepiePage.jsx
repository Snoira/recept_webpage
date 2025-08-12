import React from 'react'
import axios from 'axios'
import { useParams, useNavigate } from 'react-router-dom'
import { useEffect, useState } from 'react'
import api from '../api'
import FavoriteBtn from '../Components/FavoriteBtn'
import LikeBtn from '../Components/LikeBtn'
import CommentSection from '../Components/CommentSection'
import RecepieForm from '../Components/RecepieForm'
import { useToaster } from '../Context/ToasterContext'
import { useUser } from '../Context/UserContext'
// import { useFavorites } from '../Context/FavoritesContext'

const RECEPIE_URL = `${import.meta.env.API_URL || 'http://localhost:8080'}/recepies`;

const RecepiePage = () => {
    const [editMode, setEditMode] = useState(false)
    const [subRecepies, setSubRecepies] = useState([])
    const [recepie, setRecepie] = useState(null)

    const { recepieId } = useParams()
    const { errorToaster, successToaster } = useToaster()
    const { user } = useUser()
    // const { addFavorite, removeFavorite, favorites } = useFavorites()

    const navigate = useNavigate()

    useEffect(() => {
        const fetchRecepie = async () => {
            const res = await axios.get(`${RECEPIE_URL}/${recepieId}`)
            if (res.data) {
                setRecepie(res.data)
                console.log(res.data)
            } else if (res.status === 404) {
                navigate('*')
                console.log("Recepie not found")
            }
        }
        fetchRecepie()
    }, [])

    const deleteRecepie = async () => {
        try {
            const res = await api.delete(`${RECEPIE_URL}/delete/${recepieId}`)
            if (res.status === 204) {
                navigate('/')
                successToaster(recepie.title, "deleted")
            } else if (res.status === 404) {
                navigate('*')
            } else if (res.status === 401) {
                console.log("Not authorized to delete this recepie")
                errorToaster("You're not authorized to delete this recepie")
            }
            else {
                console.log(res.status)

            }
        } catch (error) {
            console.log("Error deleting recepie", error)
        }
    }

    const editRecepie = async (values) => {
        const newRecepie = { ...values, subRecepies: subRecepies, _id: recepie._id }

        try {
            const res = await api.put(`${RECEPIE_URL}/edit/${recepieId}`, newRecepie)
            if (res.status === 200) {
                successToaster(recepie.title, "edited")
                setRecepie(res.data)
                setEditMode(false)

            } else if (res.status === 401) {
                console.log("Not authorized to edit this recepie")
                errorToaster("You're not authorized to edit this recepie")
            } else {
                console.log(res.status)
            }
        } catch (error) {
            console.log("Error editing recepie", error)
        }
    }

    const handleEditMode = () => {
        setEditMode(!editMode)
    }

    return (
        <>
            {recepie ? editMode ?
                <RecepieForm submitFunction={editRecepie} recepie={recepie} handleEditMode={handleEditMode} deleteFunction={deleteRecepie} />
                : <>
                    <div className="container col-xxl-8 px-4 py-5">
                        <div className="row flex-lg-row-reverse align-items-center g-5 py-5">
                            <div className="col-10 col-sm-8 col-lg-6">
                                <img src={recepie.image.imageURL} alt={recepie.image.alt} className="d-block mx-lg-auto img-fluid" width="700" height="500" loading="lazy" />
                            </div>
                            <div className="col-lg-6">
                                <h1 className="display-5 fw-bold text-body-emphasis lh-1 mb-3">{recepie.title}</h1>
                                <p className="lead">{recepie.description.descriptionText}</p>
                                <div className="d-grid gap-2 d-md-flex justify-content-between">
                                    <p>Servings: {recepie.description.portions}</p>
                                    <p>Cookingtime: {recepie.description.time}</p>
                                    <p>Category: {recepie.description.category}</p>
                                </div>
                                <div className="d-grid gap-2 d-md-flex justify-content-around">
                                    {(recepie.user._id !== user?._id) ?
                                        <>
                                            <FavoriteBtn recepie={recepie} />
                                            <LikeBtn recepie={recepie} />
                                        </>
                                        : <button onClick={handleEditMode}>Edit recepie</button>}
                                </div>
                            </div>
                        </div>
                        <div className='row'>
                            <h6 className='col'>
                                <small className='col text-body-secondary'>
                                    Created by:  
                                </small>
                                 {recepie.user.username}
                            </h6>
                            <p>
                               total likes: {recepie.user.rating}
                            </p>
                        </div>
                    </div>
                    <div className='row'>
                        <div className='col-6 col-md-4'>
                            <h2>Ingredients</h2>
                            <ul className="list-group">
                                {
                                    recepie.ingredientList.map((li, i) => {
                                        return <li key={i} className="list-group-item">{(li.amount && li.unit) ? `${li.amount} ${li.unit} ${li.ingredient}` : `${li.ingredient}`}</li>
                                    })
                                }
                            </ul>
                        </div>
                        <div className='col-md-8' >
                            <div>
                                <h2>Instructions</h2>
                                <ol className="list-group list-group-flush">
                                    {
                                        recepie.instructionList.map((li, i) => {
                                            return <li key={i} className="list-group-item">{li}</li>
                                        })
                                    }
                                </ol>
                            </div>
                            <div>
                                <CommentSection recepie={recepie} />
                            </div>
                        </div>
                    </div>


                </>
                : <div>Loading...</div>
            }

        </>
    )
}

export default RecepiePage