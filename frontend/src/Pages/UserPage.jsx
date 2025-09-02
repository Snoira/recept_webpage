import { Link } from 'react-router-dom'
import { useState, useEffect } from 'react';
import { useSession } from '../Context/SessionContext'
import apiClient from '../api';
import RecepieForm from '../Components/RecepieForm';
// import RenderRecepies from '../Components/RenderRecepies';

const UserPage = () => {
    const [subRecepies, setSubRecepies] = useState([])
    const [recepiesByUser, setRecepiesByUser] = useState([])
    const [showCreateRecepie, setShowCreateRecepie] = useState(false)
    const { user } = useSession()

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
        </>
    )
}

export default UserPage