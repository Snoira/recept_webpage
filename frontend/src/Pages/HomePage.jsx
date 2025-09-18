import RecipeCard from '../Components/RecipeCard';
import { useRecipe } from '../Hooks/useRecipe';

function HomePage() {
  const { recipes, isLoading, error } = useRecipe();

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error loading recipes</div>;

  return (
    <>
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-2 sm:gap-4 p-2 sm:p-4 max-w-6xl place-self-center">
        {recipes.map(recipe => <RecipeCard key={recipe._id} recipe={recipe} />)}
        {/* {[...Array(10)].map((_, i) => <PlaceHolderCard key={i} />)} */}
      </div>
    </>
  )
}

export default HomePage