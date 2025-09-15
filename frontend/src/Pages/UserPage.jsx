// import { Link } from 'react-router-dom'
import { useSession } from '../Hooks/useSession'
import { useFavoriteRecipes } from '../Hooks/useFavorites';
import RecipeCard from '../Components/RecipeCard';

const UserPage = () => {
    const { user, isLoading } = useSession()
    const { favoriteRecipes, isLoadingFavoriteRecipes } = useFavoriteRecipes()

    if (isLoading) {
        return <div>Loading...</div>
    }

    const FavoritesSection = () => {
        if (isLoadingFavoriteRecipes) {
            return <div>Loading favorite recipes...</div>
        }
        if (favoriteRecipes.length === 0) {
            return <div>You have no favorite recipes yet.</div>
        }
        // TODO: horisontell scroller komponent
        return (
            <ul className="grid grid-cols-4 gap-4">
                {
                    favoriteRecipes.map((recipe, i) => {
                        return <RecipeCard key={i} recipe={recipe} />
                    })
                }
            </ul>
        )
    }

    return (
        <>
            <h1>
                Welcome {user?.username}
            </h1>

            <section>
                <h2>Your favorite recipes</h2>
                <FavoritesSection />
            </section>
        </>
    )
}

export default UserPage