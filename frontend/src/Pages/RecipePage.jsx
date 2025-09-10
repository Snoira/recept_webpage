import { useParams } from 'react-router-dom'
import { useRecipeById } from '../Hooks/useRecipe'
import FavoriteBtn from '../Components/FavoriteBtn';

const RecipePage = () => {
    const { recipeId } = useParams()
    const { recipe, isLoading, error } = useRecipeById(recipeId);

    if (isLoading) return <div>Loading...</div>
    if (error) return <div>Error loading recipe</div>

    if (!recipe) return <div>Recipe not found</div>

    return (
        <div className="p-8 max-w-3xl mx-auto grid gap-4 gap-y-4 sm:gap-y-8 grid-cols-1 sm:grid-cols-2 place-self-center bg-grey-100 rounded-lg shadow-md align-items-center">
            <img src={recipe.image?.URL || "https://cdn.pixabay.com/photo/2021/07/11/03/48/shish-kebab-6402804_1280.png"} alt={recipe.image?.alt || recipe.title} />
            <div className="p-4 flex flex-col gap-4">
                <h1 className='text-2xl font-bold'>{recipe.title}</h1>
                <p className='text-gray-700'>{recipe.description}</p>
                <FavoriteBtn recipeId={recipe._id} />
            </div>
            <div className="p-4 flex flex-col gap-4">
                <h2 className="text-xl font-semibold">Ingredients:</h2>
                {recipe.ingredients.map((ingredient, index) => (
                    <div key={ingredient.title ?? index}>
                        {ingredient.title && <h3 className="text-lg font-semibold">{ingredient.title}</h3>}
                        <ul className="list-none list-inside">
                            {ingredient.items.map((item, itemIndex) => (
                                <li key={item.name}>
                                    <span>{item.amount} {item.unit} {item.name}</span>
                                </li>
                            ))}
                        </ul>
                    </div>
                ))}
            </div>
            <div className="p-4 flex flex-col gap-4">
                <h2 className="text-xl font-semibold">Instructions:</h2>
                <ol className="list-inside flex flex-col gap-2">
                    {recipe.instructions.map((step, index) => (
                        <li key={index}>
                            <p>{index + 1}. {step}</p>
                        </li>
                    ))}
                </ol>
            </div>
        </div>
    )
}

export default RecipePage