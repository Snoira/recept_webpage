import { useFavorites } from '../Hooks/useFavorites.js';



const FavoriteBtn = ({ recipeId }) => {
    
    const { isFavorite, handleFavorite } = useFavorites(recipeId);

    return (
        <div>
            <button onClick={handleFavorite}
                className={`btn ${isFavorite ? 'btn-secondary' : 'btn-primary'}`}
            >
                <span>
                    <svg className="w-6 h-6 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill={`${isFavorite ? 'black' : 'none'}`} viewBox="0 0 24 24">
                        <path stroke="black" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m17 21-5-4-5 4V3.889a.92.92 0 0 1 .244-.629.808.808 0 0 1 .59-.26h8.333a.81.81 0 0 1 .589.26.92.92 0 0 1 .244.63V21Z" />
                    </svg>

                    {isFavorite ? "Remove from favorites" : "Save as favorite"}
                </span>
            </button>
        </div>
    )
}

export default FavoriteBtn;