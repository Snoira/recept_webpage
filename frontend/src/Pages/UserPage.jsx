import { Link } from 'react-router-dom'
import { useState, useEffect } from 'react';
import { useSession } from '../Context/SessionContext'
import apiClient from '../api';
import RecepieForm from '../Components/RecepieForm';
import { useFavoriteRecipes } from '../Hooks/useFavorites';
import RecipeCard from '../Components/RecipeCard';
import Recipe from '../../../backend/app/models/recipe.model';
// import RenderRecepies from '../Components/RenderRecepies';

const UserPage = () => {
    const [subRecepies, setSubRecepies] = useState([])
    const [recepiesByUser, setRecepiesByUser] = useState([])
    const [showCreateRecepie, setShowCreateRecepie] = useState(false)
    const { user } = useSession()
    const { favoriteRecipes, isLoading } = useFavoriteRecipes()

    const addSubRecepie = (recepie) => {
        setSubRecepies([...subRecepies, recepie])
    }

    const createRecepie = async (inputs) => {
        const recepie = { ...inputs, subRecepies: subRecepies }
        try {
            const res = await apiClient.post(`/recepies/create`, recepie)
            if (res.status === 201) {
                console.log(res.data)
            } else {
                console.log("Error creating recepie", res.message)
            }
        } catch (error) {
            console.log("Error creating recepie", error)
        }
    }

    useEffect(() => {
        const fetchRecepiesByUser = async () => {
            try {
                const res = await apiClient.get(`/recepies/user/`)
                if (res.data) {
                    setRecepiesByUser(res.data)
                } else {
                    console.log("Error fetching recepies")
                }
            } catch (error) {
                console.log("Error fetching recepies", error)
            }
        }
        fetchRecepiesByUser()

    }, [])

    if(isLoading) return <p>Loading...</p>
    

    return (
        <>
            <h1>
                Welcome {user.username}
            </h1>
            <button onClick={() => setShowCreateRecepie(!showCreateRecepie)}>{ showCreateRecepie ? "Cancel" : "Create Recepie"}</button>
            {showCreateRecepie && <RecepieForm submitFunction={createRecepie} addSubRecepie={addSubRecepie} setShowCreateRecepie={setShowCreateRecepie} />}
            {recepiesByUser.length > 0 ?
                <ul>
                    {
                        recepiesByUser.map((recepie, i) => {
                            return <li key={i}><Link to={`/recepie/${recepie._id}`}>{recepie.title}</Link></li>
                        })
                    }
                </ul>
                : <p>You haven't created any recepies of your own yet.</p>
            }
            <section>
                <h2>Your favorite recepies</h2>
                {favoriteRecipes.length > 0 ?
                // TODO: horisontell scroller komponent
                    <ul className="grid grid-cols-4 gap-4">
                        {
                            favoriteRecipes.map((recepie, i) => {
                                return <RecipeCard key={i} recipe={recepie} />
                            })
                        }
                    </ul>
                    : <p>You haven't added any recepies to your favorites yet.</p>
                }
            </section>
        </>
    )
}

export default UserPage