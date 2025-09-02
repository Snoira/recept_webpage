import { useState, useEffect } from 'react';
// import { Link } from 'react-router-dom'
import axios from 'axios';
import RenderRecepies from '../Components/RenderRecepies';
import RecipeCard from '../Components/RecipeCard';
import { useRecipe } from '../Hooks/useRecipe';

const API_URL = import.meta.env.API_URL || 'http://localhost:8080';

function HomePage() {
  const { recipes, isLoading, error } = useRecipe();
  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error loading recipes</div>;

  
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
      <h1>HomePage</h1>
      <div>{recipes.map(recipe => <RecipeCard key={recipe._id} recipe={recipe} />)}</div>
      <RenderRecepies recepies={recepies} from={"HomePage"} />
    </>
  )
}

export default HomePage