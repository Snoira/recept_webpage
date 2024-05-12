import React from 'react'
import axios from 'axios'
import { useParams, useNavigate } from 'react-router-dom'
import { useEffect, useState } from 'react'
import api from '../api'
import RecepieForm from '../Components/RecepieForm'
import { useToaster } from '../Context/ToasterContext'
import { useFavorites } from '../Context/FavoritesContext'

const RecepiePage = () => {
    const [editMode, setEditMode] = useState(false)
    const [subRecepies, setSubRecepies] = useState([])
    const [recepie, setRecepie] = useState(null)

    const { recepieId } = useParams()
    const { errorToaster, successToaster } = useToaster()
    const { addFavorite, removeFavorite, favorites} = useFavorites()

    const navigate = useNavigate()

    useEffect(() => {
        const fetchRecepie = async () => {
            const res = await axios.get(`http://localhost:5000/recepies/${recepieId}`)
            if (res.data) {
                setRecepie(res.data)
            } else if (res.status === 404) {
                navigate('*')
                console.log("Recepie not found")
            }
        }
        fetchRecepie()
    }, [])

    const deleteRecepie = async () => {
        try {
            const res = await api.delete(`http://localhost:5000/recepies/delete/${recepieId}`)
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
            const res = await api.put(`http://localhost:5000/recepies/edit/${recepieId}`, newRecepie)
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

    const handleFavoriteClick = async () => {
        if(favorites.includes(recepieId)){
            await removeFavorite(recepieId)
        } else {
            await addFavorite(recepieId)
        }
    }

    const isFavorite = favorites.includes(recepieId)
    // const saveAsFavorite = async () => {
    //     try {
    //         const res = await api.put(`http://localhost:5000/favorites/add/${recepieId}`)
    //         if (res.status === 200) {
    //             successToaster(recepie.title, "saved as favorite")
    //             setIsFavorite(true)
    //             console.log(res.data)
    //         } else {
    //             console.log(res.status)
    //         }
    //     } catch (error) {
    //         console.log("Error saving as favorite", error)
    //     }
    // }

    return (
        <div>RecepiePage
            {(recepie && !editMode) ? <div>
                <div>
                    <p>Made by {recepie.user.username}</p>
                </div>
                <h1>{recepie.title}</h1>
                <img src={recepie.image.imageURL} alt={recepie.image.alt} />
                <p>{recepie.description.portions}</p>
                <p>{recepie.description.time}</p>
                <p>{recepie.description.category}</p>
                <p>{recepie.description.descriptionText}</p>
                <ul>
                    {
                        recepie.ingredientList.map((li, i) => {
                            return <li key={i}>{(li.amount && li.unit) ? `${li.amount} ${li.unit} ${li.ingredient}` : `${li.ingredient}`}</li>
                        })
                    }
                </ul>
                <ol>
                    {
                        recepie.instructionList.map((li, i) => {
                            return <li key={i}>{li}</li>
                        })
                    }
                </ol>
            </div>
                :
                <>
                    <RecepieForm recepie={recepie} submitFunction={editRecepie} deleteFunction={deleteRecepie} />
                </>
            }
            <button onClick={() => setEditMode(!editMode)}>{ editMode? 'Cancle' : 'Edit Recepie' }</button>
            <button onClick={handleFavoriteClick}>{isFavorite ? 'Remove from Favorites' : 'Save as Favorite'}</button>
            {/* <button onClick={deleteRecepie}>Delete Recepie</button> */}
        </div>
    )
}

export default RecepiePage