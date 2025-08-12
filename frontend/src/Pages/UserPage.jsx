import { Link } from 'react-router-dom'
import { useState, useEffect } from 'react';
import { useUser } from '../Context/UserContext'
import api from '../api';
import RecepieForm from '../Components/RecepieForm';
// import RenderRecepies from '../Components/RenderRecepies';
import { useToaster } from '../Context/ToasterContext';

const RECEPIE_URL = `${import.meta.env.API_URL || 'http://localhost:8080'}/recepies`;

const UserPage = () => {
    const [subRecepies, setSubRecepies] = useState([])
    const [recepiesByUser, setRecepiesByUser] = useState([])
    const [showCreateRecepie, setShowCreateRecepie] = useState(false)
    const { user } = useUser()
    const { errorToaster, successToaster } = useToaster()

    const addSubRecepie = (recepie) => {
        setSubRecepies([...subRecepies, recepie])
    }

    const createRecepie = async (inputs) => {
        const recepie = { ...inputs, subRecepies: subRecepies }
        try {
            const res = await api.post(`${RECEPIE_URL}/create`, recepie)
            if (res.status === 201) {
                console.log(res.data)
                successToaster(res.data.title, "created")
            } else {
                console.log("Error creating recepie", res.message)
                errorToaster(res.message)
            }
        } catch (error) {
            console.log("Error creating recepie", error)
        }
    }

    useEffect(() => {
        const fetchRecepiesByUser = async () => {
            try {
                const res = await api.get(`${RECEPIE_URL}/user/`)
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