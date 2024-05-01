import axios from 'axios';
import { useEffect, useState } from 'react';

const RenderRecepies = () => {
    const [recepies, setRecepies] = useState([])

    useEffect(() => {
        const fetchRecepies = async () => {
            const res = await axios.get('http://localhost:5000/recepies/')
            if (res.data) {
                setRecepies(res.data)
            } else {
                console.log("Error fetching recepies")
            }
        }

        fetchRecepies()
    }, [])

    return (
        <>
            {
                recepies.length > 0 && recepies.map((recepie, i) => {
                    return (
                        <div key={i} className="card" style={{ width: "18rem" }}>
                            <img src={recepie.image.imageURL} alt={recepie.image.alt} className="card-img-top" />
                            <div className="card-body">
                                <h5 className="card-title">{recepie.title}</h5>
                                <p className="card-text">{recepie.description.descriptionText}</p>
                                {/* <a href="#" className="btn btn-primary">Go somewhere</a> */}
                            </div>
                        </div>
                    )
                })
            }
        </>
    )
}

export default RenderRecepies