import { useState, useEffect } from 'react';
// import { Link } from 'react-router-dom'
import axios from 'axios';
import RenderRecepies from '../Components/RenderRecepies';

const API_URL = import.meta.env.API_URL || 'http://localhost:8080';

function HomePage() {
  const [recepies, setRecepies] = useState([])

  useEffect(() => {
    const fetchRecepies = async () => {
      const res = await axios.get(`${API_URL}/recepies/`)
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
      <RenderRecepies recepies={recepies} from={"HomePage"} />
    </>
  )
}

export default HomePage