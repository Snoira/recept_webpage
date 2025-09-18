// import { Link } from 'react-router-dom'
import { useSession } from '../Hooks/useSession'
import { useFavoriteRecipes } from '../Hooks/useFavorites';
import { useRecipe } from '../Hooks/useRecipe';
import RecipeCard from '../Components/RecipeCard';
import RecepieForm from '../Components/RecepieForm.jsx';
import { useState } from 'react';
import Button from '../Components/global/Button.jsx';

const RecipeSection = ({ recipeArray, isLoading }) => {
    // TODO: horisontell scroller komponent
    if (isLoading) return <div>Loading...</div>
    if (recipeArray.length === 0) return <div>No recipes found</div>

    return (
        <ul className="grid grid-cols-4 gap-4">
            {
                recipeArray.map((recipe, i) => {
                    return <RecipeCard key={i} recipe={recipe} />
                })
            }
        </ul>
    )
}

const UserPage = () => {
    const { user, isLoading } = useSession()
    const { favoriteRecipes, isLoadingFavoriteRecipes } = useFavoriteRecipes()
    const { recipes, isLoading: isLoadingUserRecipes } = useRecipe({ author: user?._id })
    const [showRecipeForm, setShowRecipeForm] = useState(false)

    const toggleRecipeForm = () => {
        setShowRecipeForm(!showRecipeForm)
    }

    if (isLoading) {
        return <div>Loading...</div>
    }

    return (
        <>
            <h1>
                Welcome {user?.username}
            </h1>
            <Button onClick={toggleRecipeForm}>{showRecipeForm ? "Cancel" : "Add Recipe"}</Button>

            {showRecipeForm && <RecepieForm />}
            <section>
                <h2>Your recipes</h2>
                <RecipeSection recipeArray={recipes} isLoading={isLoadingUserRecipes} />
            </section>
            <section>
                <h2>Your favorite recipes</h2>
                <RecipeSection recipeArray={favoriteRecipes} isLoading={isLoadingFavoriteRecipes} />
            </section>
        </>
    )
}

export default UserPage