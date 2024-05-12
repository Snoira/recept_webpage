import { Link } from 'react-router-dom'

const RenderRecepies = ({recepies, from}) => {
if(from === "UserPage") return 
 
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
                                <Link to={`/recepie/${recepie._id}`} >View Recepie</Link>
                            </div>
                        </div>
                    )
                })
            }
        </>
    )
}

export default RenderRecepies