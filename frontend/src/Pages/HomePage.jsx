import { useState, useEffect } from 'react';
import axios from 'axios';
import RenderRecepies from '../Components/RenderRecepies';
import RecipeCard, {PlaceHolderCard} from '../Components/RecipeCard';
import { useRecipe } from '../Hooks/useRecipe';

const API_URL = import.meta.env.API_URL || 'http://localhost:8080';

function HomePage() {
  const { recipes, isLoading, error } = useRecipe();
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

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error loading recipes</div>;

  return (
    <>
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-2 sm:gap-4 p-2 sm:p-4 max-w-6xl">
        {recipes.map(recipe => <RecipeCard key={recipe._id} recipe={recipe} />)}
        {[...Array(10)].map((_, i) => <PlaceHolderCard key={i} />)}
      </div>
      <RenderRecepies recepies={recepies} from={"HomePage"} />
    </>
  )
}

export default HomePage