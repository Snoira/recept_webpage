import { useState, useEffect } from 'react';
// import { Link } from 'react-router-dom'
import axios from 'axios';
import RenderRecepies from '../Components/RenderRecepies';

function HomePage() {
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
    <button onClick={()=> localStorage.clear()}>X</button>
      <RenderRecepies recepies={recepies} from={"HomePage"} />
    </>
  )
}

export default HomePage